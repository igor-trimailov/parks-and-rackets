import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET),
    );

    return payload;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl;

    // if (
    //     pathname.startsWith("/_next") ||
    //     pathname.startsWith("/api") ||
    //     pathname.startsWith("/static") ||
    //     pathname.startsWith("/signin") ||
    //     pathname.startsWith("/register") ||
    //     PUBLIC_FILE.test(pathname)
    // ) {
    //     return NextResponse.next();
    // }

    if (!process.env.COOKIE_NAME) {
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME);

    if (!jwt) {
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        // remember to use value
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (images)
         * - static (not sure)
         * - signin (signin route)
         * - register (register route)
         * - favicon
         */
        "/((?!api|_next/static|_next/image|static|signin|register|favicon.ico).*)",
    ],
};
