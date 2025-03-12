import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface UserProfileCardProps {
  name: string
  email: string
  image?: string
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
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <span className="text-primary-foreground font-cabinet font-sm font-medium">
          {name}
        </span>
        <span className="text-muted-foreground text-xs">{email}</span>
      </div>
    </div>
  )
}
