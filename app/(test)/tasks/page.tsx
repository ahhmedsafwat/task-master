// 'use client'
// import { createClient } from '@/utils/supabase/client'
// import { useEffect, useState } from 'react'
// import { User } from '@supabase/supabase-js'
// import { Tables } from '@/lib/types/database.typs'

// import {
//   assignTask,
//   createTask,
//   deleteTask,
//   getAssignees,
//   getTasks,
//   removeAssignee,
//   updateTask,
// } from '@/lib/server/quieries'

// export default function TestPage() {
//   const supabase = createClient()
//   const [user, setUser] = useState<User | undefined>(undefined)
//   const [tasks, setTasks] = useState<Tables<'tasks'>[] | undefined>(undefined)

//   const user_id = user?.id

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
//               provider: 'github',
//             })
//             console.log(data, error)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           signIn
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
//       <div className="space-x-3">
//         <button
//           onClick={async () => {
//             const { data, error } = await createTask({
//               user: user,
//               title: 'TEST TASK1',
//               description: 'TEST DESCRIPTION',
//               creator_id: user.id,
//             })

//             if (error) throw error.message
//             console.log(data)
//           }}
//           className="bg-main rounded px-4 py-2 text-white"
//         >
//           createTask
//         </button>{' '}
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
//       </div>
//       <div className="space-y-4 p-8">
//         {tasks?.map((task, index) => (
//           <div key={index}>
//             <div className="space-x-3">
//               {' '}
//               <button
//                 onClick={async () => {
//                   const { data, error } = await assignTask({
//                     task_id: task.id,
//                     user,
//                     assignee_id: user_id ?? '',
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
//                     task_id: task.id,
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
//               <span> createor :{task.creator_id}</span>

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
//                     task_id: task.id,
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
//                     task_id: task.id,
//                     assignee_id: user_id ?? '',
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
  return <div>Please go to the Tasks page and uncomment the code there</div>
}
