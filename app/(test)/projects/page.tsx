// 'use client'
// import { createClient } from '@/utils/supabase/client'

// import { useEffect, useState } from 'react'
// import { User } from '@supabase/supabase-js'
// import { Tables } from '@/lib/types/database.typs'
// import {
//   assignTask,
//   createProject,
//   createProjectMember,
//   createTask,
//   deleteProject,
//   deleteProjectMembers,
//   deleteTask,
//   getAssignees,
//   getProjectMembers,
//   getTasks,
//   removeAssignee,
//   removeSelfFromProject,
//   updateProject,
//   // updateProjectMember,
//   updateProjectMemberRole,
//   updateTask,
// } from '@/lib/server/quieries'
// import { getProjects } from '@/lib/server/server-fetching'
// import ContentDisplay from '@/components/ContentDisplay'
// import { TablesInsert } from '@/lib/types/database.typs'

// export default function TestPage() {
//   const supabase = createClient()
//   const [user, setUser] = useState<User | undefined>(undefined)
//   const [tasks, setTasks] = useState<Tables<'tasks'>[] | undefined>(undefined)
//   const [projects, setProjects] = useState<Tables<'projects'>[] | undefined>(
//     undefined,
//   )
//   const user_id = '1111-1111-1111-1111-1111-1111-1111-1111'
//   const project_id = '1111-1111-1111-1111-1111-1111-1111-1111'
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser()

//       if (error) {
//         console.error(error)
//         return
//       }

//       if (data.user) {
//         setUser(data.user)
//       }
//     }

//     fetchUser()
//   }, [])

//   if (!user)
//     return (
//       <>
//         <button
//           onClick={async () => {
//             const { data, error } = await supabase.auth.signInWithOAuth({
//               provider: 'google',
//             })
//             console.log(data, error)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           signInWithGoogle
//         </button>
//       </>
//     )

//   return (
//     <div className="mx-auto max-w-4xl p-8">
//       <h1 className="mb-6 text-2xl font-bold">Supabase Functionality Tests</h1>
//       <button
//         onClick={async () => {
//           const result = await supabase.auth.signOut()
//           console.log(result)
//         }}
//         className="rounded bg-blue-500 px-4 py-2 text-white"
//       >
//         signOut
//       </button>
//       <div className="mt-4">
//         <pre>{JSON.stringify(user.user_metadata, null, 2)}</pre>
//       </div>
//       <div className="flex space-x-3">
//         <button
//           onClick={async () => {
//             const { data, error } = await createProject({
//               user: user,
//               name: 'nigga 1',
//               description: 'nigga projects one',
//             })

//             if (error) throw error.message
//             console.log(data)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           create project
//         </button>
//         <button
//           onClick={async () => {
//             const { data, error } = await createTask({
//               user: user,
//               creator_id: user.id,
//               title: 'task project',
//               project_id: project_id,
//             })

//             if (error) throw error.message
//             console.log(data)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           create task project
//         </button>

//         <button
//           onClick={async () => {
//             const { data, error } = await getTasks({ user: user })

//             if (error) throw error.message
//             console.log(data)
//             setTasks(data)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           getTasks
//         </button>

//         <button
//           onClick={async () => {
//             const { data, error } = await getProjects()
//             if (error) throw error.message
//             console.log(data)
//             if (data) {
//               setProjects(data as Tables<'projects'>[])
//             }
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           get Projects
//         </button>
//       </div>
//       <div className="space-y-4 p-8">
//         {projects?.map((project: Tables<'projects'>, index: number) => (
//           <div key={index}>
//             <button
//               onClick={async () => {
//                 const { data, error } = await createProjectMember({
//                   user: user,
//                   project_id: project.id,
//                   user_id: user_id,
//                 })
//                 if (error) throw error.message
//                 console.log(data)
//               }}
//               className="bg-main rounded px-4 py-2 text-white"
//             >
//               create project member
//             </button>
//             <button
//               onClick={async () => {
//                 const { data, error } = await updateProjectMemberRole({
//                   user: user,
//                   project_id: project.id,
//                   user_id: user_id,
//                   new_role: 'MEMBER',
//                 })
//                 if (error) throw error.message
//                 console.log(data)
//               }}
//               className="bg-main rounded px-4 py-2 text-white"
//             >
//               update member
//             </button>
//             <button
//               onClick={async () => {
//                 const { data, error } = await getProjectMembers({
//                   user: user,
//                   project_id: project.id,
//                 })
//                 if (error) throw error.message
//                 console.log(data)
//               }}
//               className="bg-main rounded px-4 py-2 text-white"
//             >
//               get members
//             </button>
//             <button
//               onClick={async () => {
//                 const { error } = await deleteProjectMembers({
//                   user: user,
//                   project_id: project.id,
//                   user_id: user_id,
//                 })
//                 if (error) throw error.message
//               }}
//               className="bg-main rounded px-4 py-2 text-white"
//             >
//               delete member
//             </button>
//             <button
//               onClick={async () => {
//                 const { error } = await removeSelfFromProject({
//                   user: user,
//                   project_id: project.id,
//                 })
//                 if (error) throw error.message
//               }}
//               className="bg-main rounded px-4 py-2 text-white"
//             >
//               delete self
//             </button>
//             <br />
//             <span>project id: {project.id}</span>
//             <br />
//             <span>creator id: {project.creator_id}</span>
//             <h2>project name: {project.name}</h2>
//             {<ContentDisplay content={project.description ?? ''} />}

//             <button
//               onClick={async () => {
//                 const { error } = await updateProject({
//                   user: user,

//                   project_id: project.id,
//                 })
//                 if (error) throw error.message
//               }}
//               className="rounded bg-red-500 px-4 py-2 text-white"
//             >
//               update Projects
//             </button>
//             <button
//               onClick={async () => {
//                 const { error } = await deleteProject({
//                   user: user,
//                   project_id: project.id,
//                 })
//                 if (error) throw error.message
//               }}
//               className="rounded bg-red-500 px-4 py-2 text-white"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//         {tasks?.map((task: TablesInsert<'tasks'>, index: number) => (
//           <div key={index}>
//             <div className="space-x-3">
//               <button
//                 onClick={async () => {
//                   const { data, error } = await assignTask({
//                     task_id: task.id ?? '',

//                     user,
//                     assignee_id: user_id,
//                   })
//                   if (error) throw error.message
//                   console.log(data)
//                 }}
//                 className="rounded bg-purple-700 px-4 py-2 text-white"
//               >
//                 Asssign task
//               </button>
//               <button
//                 onClick={async () => {
//                   const { data, error } = await getAssignees({
//                     task_id: task.id ?? '',
//                     user,
//                   })
//                   if (error) throw error.message
//                   console.log(data)
//                 }}
//                 className="rounded bg-purple-700 px-4 py-2 text-white"
//               >
//                 get assignees
//               </button>
//             </div>
//             <div>
//               <span>{task.id}</span>
//               <br />
//               <span>
//                 {' '}
//                 createor :{task.creator_id == user.id ? 'Ture' : 'not you'}{' '}
//               </span>
//               <br />
//               <span>project id: {task.project_id}</span>
//               <h2>{task.title}</h2>
//               <p>{task.description}</p>
//             </div>
//             <div className="space-x-3">
//               <button
//                 onClick={async () => {
//                   const { data, error } = await updateTask({
//                     id: task.id,
//                     user: user,
//                     title: 'Update Tasks test',
//                     description: 'UPDATE DESCRIPTION',
//                     is_private: false,
//                   })

//                   if (error) throw error.message
//                   console.log(data)
//                 }}
//                 className="bg-secondary rounded px-4 py-2 text-white"
//               >
//                 update task
//               </button>
//               <button
//                 onClick={async () => {
//                   const { data, error } = await deleteTask({
//                     user: user,
//                     task_id: task.id ?? '',
//                   })

//                   if (error) throw error.message
//                   console.log(data)
//                 }}
//                 className="bg-destructive rounded px-4 py-2 text-white"
//               >
//                 Delete task
//               </button>
//               <button
//                 onClick={async () => {
//                   const { data, error } = await removeAssignee({
//                     user: user,
//                     task_id: task.id ?? '',
//                     assignee_id: user_id,
//                   })

//                   if (error) throw error.message
//                   console.log(data)
//                 }}
//                 className="bg-destructive rounded px-4 py-2 text-white"
//               >
//                 Delete assignee
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

export default function Page() {
  return <div>Please go to the projects page and uncomment the code there</div>
}
