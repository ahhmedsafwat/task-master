// // profile-form.jsx
// 'use client'

// import { useState } from 'react'
// import { useActionStats } from 'react'
// import { updateUsername } from '@/lib/server/profile-actions'

// export default function ProfileForm({ userId }) {
//   const [username, setUsername] = useState('')

//   const { execute, status, data, error } = useActionStats(updateUsername)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     execute({ username, userId })

//   return (
//     <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
//       <h2 className="mb-4 text-xl font-semibold">Update Your Profile</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="username"
//             className="mb-1 block text-sm font-medium text-gray-700"
//           >
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter new username"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={status === 'executing'}
//           className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
//             status === 'executing'
//               ? 'cursor-not-allowed bg-blue-400'
//               : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
//           }`}
//         >
//           {status === 'executing' ? 'Updating...' : 'Update Username'}
//         </button>
//       </form>

//       {/* Status messages */}
//       {status === 'hasSucceeded' && data?.status === 'success' && (
//         <div className="mt-4 rounded border border-green-400 bg-green-100 p-2 text-green-700">
//           {data.message}
//         </div>
//       )}

//       {(status === 'hasErrored' || data?.status === 'error') && (
//         <div className="mt-4 rounded border border-red-400 bg-red-100 p-2 text-red-700">
//           {data?.message || error?.message || 'An error occurred'}
//         </div>
//       )}
//     </div>
//   )
// }
