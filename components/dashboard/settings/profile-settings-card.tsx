import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProfileAvatar } from './profile-avatar'
import { ProfileForm } from './profile-form'
import { getProfile } from '@/lib/server/quieries'
import { Separator } from '@/components/ui/separator'
import { ProfileDelete } from './profile-delete'

export const ProfileSettingsCard = async () => {
  const { data: initialData } = await getProfile()

  if (!initialData) {
    return null
  }
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="font-geist-mono text-2xl font-bold">
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your profile information and settings.
          </CardDescription>
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

      <Card className="bg-secondary my-8">
        <CardHeader>
          <CardTitle className="font-geist-mono text-2xl font-bold">
            Delete your account
          </CardTitle>
          <CardDescription>
            This action is irreversible and will delete all your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2 max-sm:px-2">
          <ProfileDelete userId={initialData.id} />
        </CardContent>
      </Card>
    </div>
  )
}
