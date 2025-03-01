import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublic = path === '/' || path === '/getting-started';

    const token = request.cookies.get('token')?.value || "";

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/getting-started', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/admin',
        '/admin/addProduct',
        '/admin/blogList',
        '/admin/subscriptions'
    ]
};
