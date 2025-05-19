import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
// Private checkbox component
export const PrivateTaskCheckbox = ({
  isPrivate,
  onCheckedChange,
}: {
  isPrivate: boolean
  onCheckedChange: (checked: boolean) => void
}) => (
  <div className="mr-2 flex items-center gap-2 md:col-span-2">
    <Switch
      id="is_private"
      checked={isPrivate}
      onCheckedChange={onCheckedChange}
      aria-label="Mark task as private"
      className="data-[state=checked]:bg-main data-[state=checked]:text-white"
    />
    <Label
      htmlFor="is_private"
      className="text-muted-foreground cursor-pointer text-xs font-medium"
    >
      Private task
    </Label>
  </div>
)
