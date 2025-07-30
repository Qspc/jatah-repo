import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

const protectedRoutes = [
    "/amlo",
    "/landing",
    "/ira-cabang",
    "/law-agency",
    "/assessment",
];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token);

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );
    console.log({ isProtectedRoute });

    if (req.nextUrl.pathname === "/otp" && token.otpVerified) {
        return NextResponse.redirect(new URL("/landing", req.url));
    }

    // Continue to the next middleware or the requested page
    return NextResponse.next();
}

export const config = {
    matcher: ["/landing", "/landing/:path*"],
};
