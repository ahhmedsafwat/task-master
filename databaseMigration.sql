-- =============================================================
-- COPY AND PAST IN THE SUPABASE SQL EDITOR TO CREATE THE DATABASE
-- =============================================================

-- *************************************************************
-- ENUM TYPES
-- *************************************************************
-- Create an enum type "roles" to define user roles within a project.
create type roles as enum('VIEWER', 'MEMBER', 'ADMIN');

-- Create an enum type "task_priority" to specify task priority levels.
create type task_priority as enum('LOW', 'MEDIUM', 'HIGH');

-- Create an enum type "task_status" to represent the status of a task.
create type task_status as enum('BACKLOG', 'IN_PROGRESS', 'COMPLETED');

-- Create an enum type "notification_type" for different notification events.
create type notification_type as enum(
  'PROJECT_INVITATION',
  'TASK_ASSIGNED',
  'TASK_DUE_SOON',
  'TASK_OVERDUE'
);

-- Create an enum type "notification_status" to indicate if a notification is read.
create type notification_status as enum('UNREAD', 'READ');

-- *************************************************************
-- TABLES & INDEXES
-- *************************************************************

-- Create the "public.profiles" table to store user profile data.
-- This table is linked to auth.users so that deleting a user cascades and removes the profile.
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key, -- Unique profile identifier (matches auth.users id)
  email text unique not null, -- User email address; must be unique
  username text, -- Optional username; must be unique if provided
  full_name text, -- Optional full name
  created_at timestamp with time zone default current_timestamp not null, -- Automatically records when the profile is created
  updated_at timestamp with time zone default current_timestamp not null -- Automatically records when the profile is last updated
)
;  -- NOTE: Ensure every statement is terminated with a semicolon.

-- Create the "public.tasks" table to store task details.
create table public.tasks (
  id uuid default gen_random_uuid () primary key, -- Unique task ID generated automatically
  title text not null, -- Title of the task (required)
  description text, -- Optional description of the task
  is_private boolean default true, -- Whether the task is private (default is public)
  creator_id uuid references public.profiles (id) not null, -- References the profile that created the task
  project_id uuid references public.projects (id) on delete cascade, -- Optional association with a project; deletion cascades
  priority task_priority default 'LOW', -- Task priority using our custom enum
  status task_status default 'BACKLOG', -- Task status using our custom enum
  start_date timestamp, -- Optional start date
  due_date timestamp, -- Optional due date for task completion
  created_at timestamp with time zone default current_timestamp not null, -- Timestamp when the task was created
  updated_at timestamp with time zone default current_timestamp not null -- Timestamp when the task was last updated
);

-- Create indexes on "public.tasks" to improve query performance on project and creator columns.
create index idx_tasks_project on public.tasks (project_id);
create index idx_tasks_creator on public.tasks (creator_id);

-- Create the "public.task_assignees" table to record assignments of users to tasks.
create table public.task_assignees (
  task_id uuid references public.tasks (id) on delete CASCADE, -- References a task; deletion cascades
  user_id uuid references public.profiles (id) on delete CASCADE, -- References a profile; deletion cascades
  assigned_at timestamp with time zone default CURRENT_TIMESTAMP, -- Automatically records the assignment time
  primary key (task_id, user_id) -- Composite primary key to avoid duplicate assignments for a task/user pair
);

-- Create an index on "public.task_assignees" for faster queries by user.
create index idx_task_assignees_user on public.task_assignees (user_id);

-- Create the "public.projects" table to hold project details.
create table public.projects (
  id UUID primary key default gen_random_uuid (), -- Unique project ID generated automatically
  name TEXT not null, -- Name of the project (required)
  description TEXT, -- Optional project description
  creator_id UUID references public.profiles (id) on delete CASCADE not null, -- References the profile that created the project
  created_at TIMESTAMPTZ default NOW() not null, -- Time of project creation
  updated_at TIMESTAMPTZ default NOW() not null -- Time of last update
);

-- Create an index on the "creator_id" column in projects for performance.
create index idx_projects_creator on public.projects (creator_id);

-- Create the "public.project_members" table to track user membership in projects.
create table public.project_members (
  project_id UUID references public.projects (id) on delete CASCADE, -- References the associated project
  user_id UUID references public.profiles (id) on delete CASCADE, -- References the user profile
  role roles default 'VIEWER' not null, -- Role within the project (VIEWER, MEMBER, ADMIN)
  joined_at TIMESTAMPTZ default NOW() not null, -- Timestamp when the user joined the project
  primary key (project_id, user_id) -- Composite primary key ensures a user is added only once per project
);

-- Create the "public.notifications" table to store user notifications.
create table public.notifications (
  id UUID primary key default gen_random_uuid (), -- Unique notification identifier
  recipient_id UUID references public.profiles (id) on delete CASCADE not null, -- The user who will receive the notification
  type notification_type not null, -- Notification type (uses our custom enum)
  status notification_status default 'UNREAD' not null, -- Read/unread status (using our custom enum)
  related_project_id UUID references public.projects (id) on delete CASCADE, -- Optional project associated with the notification
  related_task_id UUID references public.tasks (id) on delete CASCADE, -- Optional task associated with the notification
  sender_id UUID references public.profiles (id) on delete set null, -- User who sent the notification (set to null if deleted)
  message TEXT not null, -- Notification message content
  created_at TIMESTAMPTZ default NOW() not null, -- When the notification was created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread
);

-- Create indexes on notifications for frequent access patterns.
create index idx_notifications_recipient on public.notifications (recipient_id);
create index idx_notifications_created on public.notifications (created_at desc);

-- Create an index on project_members for the role column.
create index idx_project_members_role on public.project_members (role);

-- *************************************************************
-- ENABLE ROW LEVEL SECURITY (RLS)
-- *************************************************************
-- Enforce row-level security on core tables.
alter table public.profiles enable row level security;
alter table public.task_assignees enable row level security;
alter table public.tasks enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.notifications enable row level security;

-- *************************************************************
-- RLS POLICIES
-- *************************************************************

/* ----------------- PROFILES POLICIES --------------------- */
-- Allow any user to read profile data.
create policy "Enable read access for all users" on "public"."profiles" for
select using (true);


-- allow insert operation with the same check.
create policy "users can create profiles" on "public"."profiles" for insert
with check (
  ((select auth.uid ()) = id)
);

-- Allow profile updates only if the user is updating their own profile.
create policy "users can update their own profiles" on "public"."profiles"
for update to authenticated using (
  ((select auth.uid ()) = id)
)
with check (
  ((select auth.uid ()) = id)
);

-- Allow users to delete their own profile.
create policy "users can delete their profiles" on "public"."profiles" as PERMISSIVE for DELETE to public using (
  ((select auth.uid () as uid) = id)
);

/* ----------------- TASKS POLICIES --------------------- */
-- First, drop any existing policy for viewing tasks.


-- Allow viewing tasks that are public, that a user created, or that belong to projects the user has access to.
create policy "creator and project members can view public tasks" on public.tasks for
select to authenticated using (
  (is_private = false)
  or creator_id = auth.uid ()
  or is_project_member (project_id)
);

-- Only allow task creation when the creator_id equals the current user's id.
drop policy "Users can create their own tasks" on public.tasks;
create policy "Users can create their own tasks" on public.tasks for INSERT to authenticated with check (
  -- Allow private tasks (no project_id)
  project_id IS NULL
  OR
  -- For project tasks, require creator to be admin or member of the project
  (
    creator_id = auth.uid()
    AND
    exists (
      select 1
      from public.project_members
      where project_id = tasks.project_id
        and user_id = auth.uid()
        and role in ('ADMIN', 'MEMBER')
    )
  )
);

-- Drop any previous policy for task updates.


-- Allow task updates if the user is the creator or if they are a project member with ADMIN or MEMBER role.
create policy "Users and project_members can update their own tasks" on public.tasks
for update to authenticated using (
  creator_id = (select auth.uid ())
  or exists (
    select 1
    from public.project_members
    where project_id = tasks.project_id
      and user_id = (select auth.uid () as uid)
      and role in ('ADMIN', 'MEMBER')
  )
)
with check (
  creator_id = (select auth.uid ())
  or exists (
    select 1
    from public.project_members
    where project_id = tasks.project_id
      and user_id = (select auth.uid () as uid)
      and role in ('ADMIN', 'MEMBER')
  )
);



-- Allow task deletion if the current user is the creator or if they're a project admin.
create policy "Users can delete their own tasks" on public.tasks for DELETE to authenticated using (
  creator_id = (select auth.uid ())
  or is_project_admin (project_id)
);

/* ----------------- TASK ASSIGNMENTS POLICIES --------------------- */
-- Allow any authenticated user to view task assignments.
create policy "Open assignment visibility" on public.task_assignees for
select to authenticated using (true);



-- Allow assignment insertion if the current user is the task creator or already assigned.
drop policy "task creators and assigned users can assign others" on public.task_assignees;
create policy "task creators and assigned users can assign others" on public.task_assignees for INSERT to authenticated
with check (
  is_task_creator (task_id)
  or exists (
    select 1
    from public.task_assignees
    where task_id = task_assignees.task_id
      and user_id = auth.uid ()
  )
);

-- Allow deletion of task assignments by the task creator or admins.
create policy "creator or admins can delete task assignees" on public.task_assignees for DELETE to authenticated using (
  is_task_creator (task_id)
);

-- Permit users to remove their own assignment.
create policy "Remove self-assignment" on public.task_assignees for DELETE to authenticated using (
  user_id = auth.uid ()
);

/* ----------------- PROJECTS POLICIES --------------------- */
-- Permit authenticated users to create projects where they are the creator.
create policy "Projects can be created" on public.projects for insert to authenticated
with check (creator_id = auth.uid ());

-- Allow updates to a project by its creator or by project admins.
create policy "Projects can be updated by creator or admins" on public.projects
for update using (
  creator_id = (select auth.uid () as uid)
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = projects.id
      and pm.user_id = (select auth.uid () as uid)
      and pm.role = 'ADMIN'
  )
)
with check (
  -- Ensure the creator_id is not changed during update.
  creator_id = projects.creator_id
);


-- Allow users to view projects if they are the creator or a member.
create policy "Projects are visible for members and creators" on public.projects for
select to authenticated using (
  creator_id = auth.uid ()
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = projects.id
      and pm.user_id = auth.uid ()
  )
);

-- Allow deletion of projects only by the project creator.
create policy "Only creators can delete projects" on public.projects for DELETE to authenticated using (
  creator_id = auth.uid ()
);

/* ----------------- PROJECT MEMBERS POLICIES --------------------- */
-- Allow members with project access to view project memberships.
create policy "Project members can view other members" on public.project_members for
select to authenticated using (
  is_project_member (project_id)
);

-- Allow project creators and admins to add members.
create policy "Creators and admins can add members" on public.project_members for insert to authenticated
with check (
  is_project_admin (project_id)
  or ((select creator_id from public.projects where id = project_members.project_id) = auth.uid ())
);

-- Allow only project admins or creators to update memberships.
create policy "Creators and admins can update members" on public.project_members
for update to authenticated using (
  is_project_admin (project_id)
  or ((select creator_id from public.projects where id = project_members.project_id) = auth.uid ())
)
with check (
  is_project_admin (project_id)
  or ((select creator_id from public.projects where id = project_members.project_id) = auth.uid ())
);

-- Allow removal of members by project creators, admins, or self-removal.
create policy "Project creators/admins can remove members" on public.project_members for delete to authenticated using (
  ((select creator_id from public.projects where id = project_members.project_id) = auth.uid ())
  or (is_project_admin (project_id))
  or (user_id = auth.uid ())
);

/* ----------------- NOTIFICATIONS POLICIES --------------------- */
-- Allow users to see notifications sent to them.
create policy "User sees own notifications" on public.notifications for
select using (recipient_id = auth.uid ());

-- Permit users to mark notifications as read (update) only for their own notifications.
create policy "Mark notifications as read" on public.notifications
for update using (recipient_id = auth.uid ())
with check (recipient_id = auth.uid ());

-- Allow users to delete notifications they own.
create policy "Delete own notifications" on public.notifications for DELETE using (
  recipient_id = auth.uid ()
);

-- Prevent direct insertion of notifications from users.
create policy "System creates notifications" on public.notifications for INSERT
with check (false);

-- *************************************************************
-- TRIGGER FUNCTIONS & TRIGGERS
-- *************************************************************

/* ---------- Synchronize auth.users and public.profiles ---------- */
-- Function to create a new profile automatically when a new user is added to auth.users.
create or replace function handle_new_user () returns trigger
set search_path = '' as $$
begin
  insert into public.profiles(id, email, username, avatar_url)
  values(new.id, new.email, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users to invoke the above function after a new user is inserted.

create trigger on_auth_user_created
after insert on auth.users for each row
execute function handle_new_user ();


-- Function to delete the corresponding auth.users record when a profile is deleted.
create or replace function delete_auth_user_on_profile_delete () RETURNS TRIGGER
set search_path = '' as $$
BEGIN
    DELETE FROM auth.users WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on public.profiles to call the deletion function after a profile is deleted.
create trigger trigger_delete_auth_user
after DELETE on public.profiles for EACH row
execute FUNCTION delete_auth_user_on_profile_delete ();

/* ---------- Notifications for Project Invitations ---------- */

-- Function to generate a notification when a user is invited to a project.
create or replace function notify_project_invitation () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER 
set search_path = ''
as $$
BEGIN
  INSERT INTO public.notifications (
    recipient_id,
    type,
    related_project_id,
    sender_id,
    message
  ) VALUES (
    NEW.user_id,
    'PROJECT_INVITATION',
    NEW.project_id,
    auth.uid(), -- The user who performed the invitation
    'You were invited to ' || (SELECT name FROM public.projects WHERE id = NEW.project_id)
  );
  RETURN NEW;
END;
$$;

-- Trigger to send project invitation notifications after a member is added.
create trigger project_invitation_trigger
after INSERT on public.project_members for EACH row
execute FUNCTION notify_project_invitation ();




-- Function to send a notification when a user is assigned to a task.
create or replace function notify_task_assignment () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
set search_path = ''
 as $$
BEGIN
  INSERT INTO public.notifications (
    recipient_id,
    type,
    related_task_id,
    sender_id,
    message
  ) VALUES (
    NEW.user_id,
    'TASK_ASSIGNED',
    NEW.task_id,
    (select auth.uid() as uid), -- The user assigning the task
    'You were assigned to "' || (SELECT title FROM public.tasks WHERE id = NEW.task_id)
  );
  RETURN NEW;
END;
$$;

-- Trigger to automatically notify a user upon task assignment.
create trigger task_assignment_trigger
after INSERT on public.task_assignees for EACH row
execute FUNCTION notify_task_assignment ();

/* ---------- Due Soon & Overdue Task Notifications ---------- */
-- Function to check for tasks that are due soon and create notifications accordingly.
CREATE OR REPLACE FUNCTION check_due_soon_tasks(reminder_hours INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
set search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (
    recipient_id,
    type,
    related_task_id,
    message
  )
  SELECT 
    creator_id,
    'TASK_DUE_SOON',
    id,
    'Task due soon: ' || title || ' - Due: ' || due_date
  FROM public.tasks
  WHERE due_date BETWEEN NOW() AND NOW() + (reminder_hours || ' hours')::INTERVAL
    AND status <> 'COMPLETED';
END;
$$;
-- Function to check for overdue tasks and generate notifications.
CREATE OR REPLACE FUNCTION check_overdue_tasks()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
set search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (
    recipient_id,
    type,
    related_task_id,
    message
  )
  SELECT 
    creator_id,
    'TASK_OVERDUE',
    id,
    'Overdue task: ' || title || ' - Was due: ' || due_date
  FROM public.tasks
  WHERE due_date < NOW()
    AND status <> 'COMPLETED';
END;
$$;


-- Schedule a cron job (using pg_cron) to run the due soon check daily at 8 AM.
SELECT cron.schedule('due-soon-check', '0 8 * * *', 
  $$SELECT check_due_soon_tasks(2)$$);

-- Schedule a cron job to run the overdue check daily at 8 AM.
SELECT cron.schedule('overdue-check', '0 8 * * *', 
  $$SELECT check_overdue_tasks()$$);

-- Create the pg_cron extension if it doesn't already exist.
create extension IF not exists pg_cron;

-- *************************************************************
-- Clean-up Old Notifications
-- *************************************************************

-- Function to delete notifications older than 10 days.
create or replace function delete_old_notifications () RETURNS VOID
set search_path = '' as $$
DELETE FROM public.notifications WHERE created_at < NOW() - INTERVAL '10 days';
$$ LANGUAGE SQL security invoker;

-- Schedule a cron job to run daily at midnight and delete old notifications.
select cron.schedule (
  'delete_old_notifications',
  '0 0 * * *', -- Runs daily at midnight
  $$ DELETE FROM public.notifications WHERE created_at < NOW() - INTERVAL '10 days' $$
);

-- *************************************************************
-- TIMESTAMP UPDATE TRIGGER
-- *************************************************************

-- Function to update the "updated_at" column to the current timestamp upon an update.
create or replace function public.update_timestamp () returns trigger 
set search_path = ''
as $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$ language plpgsql;


-- Create triggers to update the timestamp automatically before updates on profiles.
create trigger profiles_updated before
update on public.profiles for each row
execute procedure update_timestamp ();

-- Create trigger for projects.
create trigger projects_updated before
update on public.projects for each row
execute procedure update_timestamp ();



-- Create trigger for tasks.
create trigger tasks_updated before
update on public.tasks for each row
execute procedure update_timestamp ();

-- *************************************************************
-- HELPER FUNCTIONS
-- *************************************************************
-- Helper function to check if the current user (via auth.uid()) is the creator of a task.
create or replace function is_task_creator (_task_id UUID) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER
set search_path = ''
 as $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.tasks
    WHERE id = _task_id
      AND creator_id = (select auth.uid() as uid)
  );
END;
$$;

-- Helper function to verify if the current user has access to a project (is a member).
create or replace function is_project_member (_project_id UUID) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER set search_path = '' as $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.project_members
    WHERE project_id = _project_id
      AND user_id = auth.uid()
  );
END;
$$;

-- Helper function to check if the current user is an admin in a specified project.
create or replace function is_project_admin (_project_id uuid) returns boolean language plpgsql security definer set search_path = '' as $$
begin
  return exists (
    select 1
    from public.project_members
    where project_id = _project_id
      and user_id = auth.uid()
      and role = 'ADMIN'
  );
end;
$$;
-- =============================================================
-- COPY AND PAST IN THE SUPABASE SQL EDITOR TO CREATE THE DATABASE
-- =============================================================