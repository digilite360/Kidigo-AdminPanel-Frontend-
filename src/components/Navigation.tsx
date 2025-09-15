"use client"

import { useAuth } from "@/contexts/AuthContext"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu"

export const Navigation = () => {
  const { user, isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href={ROUTES.DASHBOARD} className="text-xl font-bold">
              Kidigo Admin
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={ROUTES.DASHBOARD} legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Users</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <Link href={ROUTES.USERS} className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">
                        All Users
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <Link href={ROUTES.PRODUCTS} className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">
                        All Products
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.ORDERS} legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                      Orders
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {isAdmin && (
                  <NavigationMenuItem>
                    <Link href={ROUTES.ADMIN} legacyBehavior passHref>
                      <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                        Admin Panel
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={ROUTES.PROFILE}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={ROUTES.SETTINGS}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: ROUTES.AUTH.SIGNIN })}
                  className="text-red-600"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
