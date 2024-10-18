import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.rewrite(new URL('/skripsi/home', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/backoffice/(.*)')) {
    return NextResponse.rewrite(new URL('/skripsi/backoffice', request.url))
  }
}