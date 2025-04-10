import { ProfileSettingsCard } from '@/components/dashboard/settings/profile-settings-card'

export const metadata = {
  title: {
    absolute: 'Profile Settings | Task Master',
  },
  description: 'Manage your profile settings',
}

export default async function ProfileSettingsPage() {
  return <ProfileSettingsCard />
}
