import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Old `/java/...` URLs for the Spring Boot + AI series → `/spring-boot-postgres-ai/...` */
export function middleware(request: NextRequest) {
  const p = request.nextUrl.pathname;
  if (p.startsWith("/java/spring-boot-ai-")) {
    return NextResponse.redirect(
      new URL(
        p.replace("/java/", "/spring-boot-postgres-ai/"),
        request.url
      ),
      308
    );
  }
  return NextResponse.next();
}

export const config = {
  // Only run on article URLs under /java/ (avoids /java list page, etc.)
  matcher: ["/java/:javaSlug+"],
};
