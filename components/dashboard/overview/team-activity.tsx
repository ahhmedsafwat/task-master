import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TeamMember {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastAction: string
  timestamp: string
}

interface TeamActivityProps {
  members: TeamMember[]
}

export function TeamActivity({ members }: TeamActivityProps) {
  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-gray-500'
      case 'away':
        return 'bg-yellow-500'
    }
  }

  return (
    <Card className="transition-colors hover:border-pink-200">
      <CardHeader>
        <CardTitle className="text-pink-700">Team Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {member.lastAction}
                  </p>
                  <p className="text-xs text-pink-500">{member.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
