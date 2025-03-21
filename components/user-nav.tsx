"use client"

import Link from "next/link"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"

export function UserNav() {
  // This would be replaced with actual auth state
  const { isLoggedIn,email, setIsLoggedIn, setEmail } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setEmail('');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/signin">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{email? email: 'Guest'}</p>
                <p className="text-xs leading-none text-muted-foreground">{isLoggedIn ? 'Signed in' : 'Not signed in'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signin">Sign in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Create account</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{email}</p>
            <p className="text-xs leading-none text-muted-foreground">{isLoggedIn ? 'Signed in' : 'Not signed in'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/billing">Billing</Link>
        </DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

