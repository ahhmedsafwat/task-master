"use client";
import { createClient } from "@/utils/supabase/client";
import { login1, login2 } from "@/lib/actions";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/lib/database.typs";
import {
  assignTask,
  createTask,
  deleteTask,
  getAssignees,
  getTasks,
  removeAssignee,
  updateTask,
} from "@/lib/quieries";

export default function TestPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tasks, setTasks] = useState<Tables<"tasks">[] | undefined>(undefined);
  // "6db12367-0b7c-4387-954b-a62e556695ef"
  // "34ce8b9d-34be-448b-8ebc-50b644de6dbc"
  const user_id = "6db12367-0b7c-4387-954b-a62e556695ef";
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      if (data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  if (!user)
    return (
      <>
        <button
          onClick={async () => {
            const result = await login1();
            console.log(result);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          login1
        </button>
        <button
          onClick={async () => {
            const result = await login2();
            console.log(result);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          login2
        </button>
      </>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Functionality Tests</h1>
      <button
        onClick={async () => {
          const result = await supabase.auth.signOut();
          console.log(result);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        signOut
      </button>
      <div className="mt-4">
        <pre>{JSON.stringify(user.user_metadata, null, 2)}</pre>
      </div>
      <div className="space-x-3">
        <button
          onClick={async () => {
            const { data, error } = await createTask({
              user: user,
              title: "TEST TASK1",
              description: "TEST DESCRIPTION",
              creator_id: user.id,
            });

            if (error) throw error.message;
            console.log(data);
          }}
          className="bg-main text-white px-4 py-2 rounded"
        >
          createTask
        </button>{" "}
        <button
          onClick={async () => {
            const { data, error } = await getTasks({ user: user });

            if (error) throw error.message;
            console.log(data);
            setTasks(data);
          }}
          className="bg-main text-white px-4 py-2 rounded"
        >
          getTasks
        </button>
      </div>
      <div className="space-y-4 p-8">
        {tasks?.map((task, index) => (
          <div key={index}>
            <div className="space-x-3">
              {" "}
              <button
                onClick={async () => {
                  const { data, error } = await assignTask({
                    task_id: task.id,
                    user,
                    assignee_id: user_id,
                  });
                  if (error) throw error.message;
                  console.log(data);
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                Asssign task
              </button>
              <button
                onClick={async () => {
                  const { data, error } = await getAssignees({
                    task_id: task.id,
                    user,
                  });
                  if (error) throw error.message;
                  console.log(data);
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                get assignees
              </button>
            </div>
            <div>
              <span>{task.id}</span>
              <br />
              <span> createor :{task.creator_id}</span>

              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={async () => {
                  const { data, error } = await updateTask({
                    id: task.id,
                    user: user,
                    title: "Update Tasks test",
                    description: "UPDATE DESCRIPTION",
                    is_private: false,
                  });

                  if (error) throw error.message;
                  console.log(data);
                }}
                className="bg-secondary text-white px-4 py-2 rounded"
              >
                update task
              </button>
              <button
                onClick={async () => {
                  const { data, error } = await deleteTask({
                    user: user,
                    task_id: task.id,
                  });

                  if (error) throw error.message;
                  console.log(data);
                }}
                className="bg-destructive text-white px-4 py-2 rounded"
              >
                Delete task
              </button>
              <button
                onClick={async () => {
                  const { data, error } = await removeAssignee({
                    user: user,
                    task_id: task.id,
                    assignee_id: user_id,
                  });

                  if (error) throw error.message;
                  console.log(data);
                }}
                className="bg-destructive text-white px-4 py-2 rounded"
              >
                Delete assignee
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
