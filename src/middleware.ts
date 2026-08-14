import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export const runtime = 'nodejs';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  if (isProtectedRoute(req) && !session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|utff|woff2?|ico|csv|docx?|xlsx?|git)).*)',
    '/(api|trpc)(.*)',
  ],
};