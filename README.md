task-master Data Model Overview

Profiles

Each user has a profile (id, email, username, etc.) created automatically via Supabase Auth.

Tasks

Tasks are created by a user (creator_id) and may optionally belong to a project (project_id).
Tasks can be private or public.

Task_Assignees

A join table linking tasks and profiles.
It records which users are assigned to each task.

Projects

Projects serve as containers for tasks and collaborative work.
Each project is created by a user (creator_id).

Project_Members

A join table linking projects and profiles with an assigned role (VIEWER, MEMBER, or ADMIN).

It controls who is part of a project and their permissions.

Interactions:

Users create profiles, tasks, and projects.
Tasks can be personal (private) or tied to a project.
Tasks can have multiple assignees, and project membership (with roles) governs visibility and collaborative access.
