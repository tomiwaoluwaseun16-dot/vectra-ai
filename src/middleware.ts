import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const session = await auth();
    if (isProtectedRoute(req) && !session.userId) {
      return session.redirectToSignIn();
    }
  } catch (error) {
    // Failsafe fallback to prevent complete middleware crash
    console.error('Middleware authentication error:', error);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|utff|woff2?|ico|csv|docx?|xlsx?|git)).*)',
    '/(api|trpc)(.*)',
  ],
};