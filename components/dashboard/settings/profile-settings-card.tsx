import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileAvatar } from './profile-avatar'
// import { ProfileForm } from './profile-form'
import { getProfile } from '@/lib/server/quieries'

export const ProfileSettingsCard = async () => {
  const { data: initialData } = await getProfile()

  if (!initialData) {
    return null
  }
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileAvatar
          avatarUrl={initialData.avatar_url}
          username={initialData.username}
          id={initialData.id}
        />
        {/* <ProfileForm
            userId={initialData.id}
            username={initialData.username}
            email={initialData.email}
          /> */}
      </CardContent>
    </Card>
  )
}
