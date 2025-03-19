import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
