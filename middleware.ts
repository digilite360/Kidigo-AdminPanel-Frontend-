   import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { ROUTES, USER_ROLES } from "@/lib/constants"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")

    // Allow API routes to pass through
    if (isApiRoute) {
      return NextResponse.next()
    }

    // Redirect authenticated users away from auth pages
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url))
    }

    // Redirect unauthenticated users to sign in
    if (!isAuth && !isAuthPage) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.SIGNIN, req.url))
    }

    // Check admin access for admin routes
    if (isAdminPage && token?.role !== USER_ROLES.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.UNAUTHORIZED, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/auth/signin",
    "/auth/signup",
    "/auth/vendor-register",
    "/auth/error"
  ]
}
