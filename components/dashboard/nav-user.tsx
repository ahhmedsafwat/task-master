import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { signOut } from "@/app/auth/actions";

interface UserNavProps {
  name: string;
  email: string;
  image?: string;
}

export const NavUser = ({ email, name, image }: UserNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="py-2  relative  pl-2 pr-2 flex items-center justify-between border hover:bg-accent transition-all cursor-pointer bg-background shadow-lg rounded-lg">
          <div className="flex justify-start items-center gap-1">
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
              <span className="text-primary-foreground font-cabinet font-sm font-medium">
                {name}
              </span>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
          </div>
          <ChevronsUpDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg "
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div className="flex justify-start items-center gap-1">
            <Avatar>
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
              <span className="text-primary-foreground font-cabinet font-sm font-medium">
                {name}
              </span>
              <span className="text-muted-foreground text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem>
          <ThemeToggle />
          <span>theme</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
          }}
        >
          <LogOut className="text-destructive focus:text-destructive" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
