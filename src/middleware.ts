import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // const { pathname } = req.nextUrl;
  // const url = req.nextUrl.clone();
  // if (pathname == '/') {
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}
