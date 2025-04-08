import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserProfileCardProps {
  name: string | null
  email: string
  image: string | null
  className?: string
}

export function UserProfileCard({
  name,
  email,
  image,
  className,
}: UserProfileCardProps) {
  return (
    <div className={`flex items-center justify-start gap-1 ${className}`}>
      <Avatar>
        <AvatarImage
          src={image || ''}
          alt={name ?? ''}
          className="object-cover"
        />
        <AvatarFallback>
          {name ? name.substring(0, 2).toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-1 flex-col">
        <span className="text-primary-foreground font-cabinet font-sm font-medium">
          {name}
        </span>
        <span className="text-muted-foreground text-xs">{email}</span>
      </div>
    </div>
  )
}
