import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from './app/layout';

export const middleware = async (request: NextRequest) => {
	const cookieStore = cookies();
	const session = cookieStore.get('connect.sid');
	const requestHeaders = new Headers(request.headers);
	const isExcludePath =
		request.nextUrl.pathname === '/' ||
		request.nextUrl.pathname.startsWith('/mdview') ||
		request.nextUrl.pathname.startsWith('/mdwrite') ||
		request.nextUrl.pathname.startsWith('/user') ||
		request.nextUrl.pathname.startsWith('/login');
	const checkPath = request.nextUrl.pathname.startsWith('/mdview');
	let findedPage = isExcludePath;

	if(checkPath){
		const id = request.nextUrl.pathname.split('/mdview/')[1];
		const result = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`);
		if(result.ok){
			findedPage = true;
		}else{
			findedPage = false;
		}
	}

	requestHeaders.set('x-next-available', findedPage ? "header" : "no-header");

	const protectedRoutes = ['/mdwrite', '/write'];

	if (
		protectedRoutes.some((path) =>
			request.nextUrl.pathname.startsWith(path)
		)
	) {
		const logind = await getUserFromSession(session?.value);
		if (logind.login && logind.user.email) {
			return NextResponse.next();
		} else {
			const loginUrl = new URL('/login', request.url);
			loginUrl.searchParams.set('error', 'unauthorized');
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
};
