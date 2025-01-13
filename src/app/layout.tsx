import './globals.css';
import { cookies, headers } from 'next/headers';
import Header from '@/components/Header';
import { IMetadata } from '@/interface/commentInterface';
import MetadataContent from '@/components/Metadata';
import Loadindicator from '@/components/LoadIndicator';
import ToastContainer from '@/components/ToastContainer';

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<IMetadata> => {
	return MetadataContent({
		title: 'KIRSI BLOG',
		description: '키르시 블로그입니다.',
		asPath: '',
		ogImage: `/blog_og.png`,
	});
};

export const getUserFromSession = async (sessionId: string = '') => {
	const res = await fetch(`${process.env.baseUrl}/auth/info-check`, {
		next: { revalidate: 3600 },
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `connect.sid=${sessionId}`,
		},
	});
	const respon = await res.json();
	if (respon.code === 200) {
		return { login: true, user: respon.user };
	} else {
		return { login: false, user: null };
	}
};

const RootLayout = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const cookieStore = cookies();
	const theme = cookieStore.get('theme');
	const session = cookieStore.get('connect.sid');
	const logind = await getUserFromSession(session?.value);

	const path = headers().get('x-next-pathname') || '/';
	const isExcludePath =
		path === '/' ||
		path.startsWith('/mdview') ||
		path.startsWith('/mdwrite') ||
		path.startsWith('/user') ||
		path.startsWith('/login');

	return (
		<html
			data-color-mode={`${
				theme?.value === 'light' ? 'light' : 'dark'
			}`}
			lang="ko"
			className={`h-full ${
				theme?.value === 'light' ? '' : 'dark'
			}`}
		>
			<body
				className={`text-black bg-[rgb(245,245,245)] dark:text-white dark:bg-black ${
					isExcludePath &&
					'pt-[68px] transition-all duration-500'
				}`}
			>
				{isExcludePath && (
					<Header
						theme={theme?.value}
						session={logind}
					/>
				)}
				{children}
				<Loadindicator />
				<ToastContainer />
			</body>
		</html>
	);
};

export default RootLayout;
