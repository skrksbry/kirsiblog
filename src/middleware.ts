import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from './app/layout';

export const middleware = async (request: NextRequest) => {
	const cookieStore = cookies();
	const session = cookieStore.get('connect.sid');
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-next-pathname', request.nextUrl.pathname);

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
