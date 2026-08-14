import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const sessionAuth = await auth();
  if (isProtectedRoute(req) && !sessionAuth.userId) {
    return sessionAuth.redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|utff|woff2?|ico|csv|docx?|xlsx?|git)).*)',
    '/(api|trpc)(.*)',
  ],
};