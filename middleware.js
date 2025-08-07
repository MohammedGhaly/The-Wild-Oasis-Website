// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // This middleware can be used to protect routes or perform other tasks
//   // For example, you can check if the user is authenticated
//   // and redirect them to the login page if they are not.
//   console.log(request.url);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
