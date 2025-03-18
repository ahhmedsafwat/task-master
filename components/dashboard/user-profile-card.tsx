import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface UserProfileCardProps {
  name: string
  email: string
  image?: string
  className?: string
  isLoading: boolean
}

export function UserProfileCard({
  name,
  email,
  image,
  className,
  isLoading,
}: UserProfileCardProps) {
  return (
    <div className={`flex items-center justify-start gap-1 ${className}`}>
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-1 flex-col">
        {isLoading ? (
          <>
            <div className="bg-muted mb-2 block h-2.5 w-36" />
            <div className="bg-muted block h-2.5 w-36" />
          </>
        ) : (
          <>
            <span className="text-primary-foreground font-cabinet font-sm font-medium">
              {name}
            </span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </>
        )}
      </div>
    </div>
  )
}
