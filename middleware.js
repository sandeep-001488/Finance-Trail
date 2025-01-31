import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/transaction(.*)",
  "/previous",
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoute(req)) {
    const user = auth();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
