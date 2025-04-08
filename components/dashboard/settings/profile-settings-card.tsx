import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileAvatar } from './profile-avatar'
import ProfileForm from './profile-form'
import { getProfile } from '@/lib/server/quieries'
import { Separator } from '@/components/ui/separator'

export const ProfileSettingsCard = async () => {
  const { data: initialData } = await getProfile()

  if (!initialData) {
    return null
  }
  return (
    <Card className="bg-secondary mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="py-2 max-sm:px-2">
        <ProfileAvatar
          avatarUrl={initialData.avatar_url}
          username={initialData.username}
          id={initialData.id}
        />
        <Separator className="my-3" />
      </CardContent>
      <CardContent>
        <ProfileForm
          userId={initialData.id}
          email={initialData.email}
          username={initialData.username}
        />
      </CardContent>
    </Card>
  )
}
