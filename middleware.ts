import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin/login' // Publicly accessible admin login page
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)' // Match all admin-related routes
]);

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  // Handle admin routes first
  if (isAdminRoute(request)) {
    // If the user is already authenticated, redirect them to the admin dashboard
    if (auth.userId && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // Allow access to the admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for a valid admin token in cookies
    const adminToken = request.cookies.get('adminToken')?.value;

    try {
      // Verify JWT token
      jwt.verify(adminToken || '', process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      // Redirect to admin login if token is missing/invalid
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Handle regular user routes with Clerk
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
