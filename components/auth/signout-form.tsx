import { signOut } from '@/lib/server/actions'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

export default function SignoutForm() {
  return (
    <form action={signOut} className="mt-auto">
      <Button className="group min-h-11 w-full" type="submit">
        <LogOut />
        <span>Sign out</span>
        <span className="sr-only">sign out</span>
      </Button>
    </form>
  )
}
