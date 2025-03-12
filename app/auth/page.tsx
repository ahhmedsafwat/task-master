import { AuthCard } from '@/components/auth/auth-card'

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-secondary-foreground mt-2 text-sm">
          Sign in to your account to continue
        </p>
      </div>
      <AuthCard />
    </>
  )
}
