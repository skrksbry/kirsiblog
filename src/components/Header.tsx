'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
	ChevronLeftIcon,
	ChevronUpIcon,
	LockClosedIcon,
	MoonIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import useUserStore from '@/store/user.store';
import Logo from './common/Logo';

const Header = ({
	theme,
	session,
}: {
	theme: string | undefined;
	session: { login: boolean; user: any };
}) => {
	const [scroll, setScroll] = useState(0);
	const [currentTheme, setCurrentTheme] = useState(theme || 'dark');
	const pathname = usePathname();

	const [documentTitle, setDocumentTitle] = useState<string>('');
	const regex = /^\/mdview\/.*/;
	const isViewer = regex.test(pathname);
	const disableRegex = /(regist)/i;
	const isDisableMenu = disableRegex.test(pathname);
	const router = useRouter();
	const { user, login, loginUser, logoutUser } = useUserStore();

	const updateScroll = () => {
		setScroll(window.scrollY);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	const goToBack = () => {
		router.back();
	};

	const logout = async () => {
		const res = await fetch('/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});
		if (res.status === 200) {
			logoutUser();
			router.refresh();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', updateScroll);
		setScroll(window.scrollY);
		const currentTheme = localStorage.getItem('theme') ?? null;
		if (currentTheme) {
			document.documentElement.classList.add(currentTheme);
			document.documentElement.setAttribute(
				'data-color-mode',
				currentTheme
			);
			setCurrentTheme(currentTheme);
		} else {
			localStorage.setItem('theme', 'dark');
		}
		if (session.login) {
			loginUser({ login: true, user: session.user });
		}
		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	}, []);

	useEffect(() => {
		setDocumentTitle(document.title.split('| ')[1]);
	}, [pathname]);

	const toggleTheme = () => {
		if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark');
			document.documentElement.setAttribute(
				'data-color-mode',
				'light'
			);
			localStorage.setItem('theme', 'light');
			setCurrentTheme('light');

			document.cookie =
				'theme=light; path=/; expires=' +
				60 * 60 * 24 * 365 * 10;
		} else {
			document.documentElement.classList.add('dark');
			document.documentElement.setAttribute(
				'data-color-mode',
				'dark'
			);
			localStorage.setItem('theme', 'dark');
			setCurrentTheme('dark');
			document.cookie =
				'theme=dark; path=/; expires=' +
				60 * 60 * 24 * 365 * 10;
		}
	};
	return (
		<div
			className={`z-20 py-4 px-3 lg:px-4 w-full fixed items-center gap-3 border-b-[1px] bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)] backdrop-blur-sm left-0 top-0 flex-wrap ${
				scroll > 8 ? 'drop-shadow-sm' : ''
			}`}
			style={
				scroll > 8
					? {
							height: '68px',
							borderColor:
								'rgba(255,255,255,0.1)',
							display: isDisableMenu
								? 'none'
								: 'flex',
					  }
					: {
							background: 'transparent',
							height: '68px',
							borderColor:
								'transparent',
							display: isDisableMenu
								? 'none'
								: 'flex',
					  }
			}
		>
			<div
				className="flex gap-1 w-full lg:w-[1024px] items-center transition-transform m-auto flex-wrap"
				style={
					scroll > 8
						? {
								marginTop: '0px',
								transition: 'margin 0.25s',
						  }
						: {
								marginTop: '50px',
								transition: 'margin 0.25s',
						  }
				}
			>
				<div className="flex w-full gap-3 pr-4 lg:pr-0 items-center">
					<Link
						href="/"
						className="flex items-center"
					>
						<Logo />
						<span
							className="font-bold text-2xl lg:hidden transition-none duration-0 text-[#bb004a]"
							style={
								scroll > 8
									? {
											display: 'none',
											fontFamily: 'TTHakgyoansimMonggeulmonggeulR',
									  }
									: {
											fontFamily: 'TTHakgyoansimMonggeulmonggeulR',
									  }
							}
						>
							KIRSI
						</span>
						<span
							className="font-bold text-2xl hidden lg:block transition-none duration-0 text-[#bb004a]"
							style={{
								fontFamily: 'TTHakgyoansimMonggeulmonggeulR',
							}}
						>
							KIRSI
						</span>
					</Link>
					<div
						className="block flex-1 overflow-hidden whitespace-nowrap text-ellipsis items-center font-bold mx-6"
						style={{
							opacity:
								scroll > 120 &&
								isViewer
									? 1
									: 0,
							transition:
								scroll > 120 &&
								isViewer
									? 'opacity 0.3s'
									: 'opacity 0.1s',
						}}
					>
						{documentTitle}
					</div>
					{isViewer ? (
						<div
							onClick={goToBack}
							className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline transition-transform"
							style={{
								transition: 'opacity 0.25s',
							}}
						>
							<ChevronLeftIcon className="w-4 h-4" />
							BACK
						</div>
					) : (
						''
					)}
					{scroll > 8 ? (
						<div
							onClick={scrollToTop}
							className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline transition-transform"
							style={{
								transition: 'opacity 0.25s',
							}}
						>
							<ChevronUpIcon className="w-4 h-4" />
							TOP
						</div>
					) : (
						''
					)}
					<div
						onClick={toggleTheme}
						className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline  transition-transform"
						style={{
							transition: 'opacity 0.25s',
						}}
					>
						{currentTheme === 'light' ? (
							<SunIcon className="w-3 h-3" />
						) : (
							<MoonIcon className="w-3 h-3" />
						)}
						{currentTheme.toUpperCase()}
					</div>
					<Link
						href={
							login
								? `/user/${user.nickname}`
								: `/login`
						}
						className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline  transition-transform"
						style={{
							transition: 'opacity 0.25s',
						}}
					>
						{session.login ? (
							<UserIcon className="w-4 h-4" />
						) : (
							<LockClosedIcon className="w-3 h-3" />
						)}
						{session.login &&
						session.user.email
							? session.user.nickname?.toUpperCase()
							: session.login
							? '로드중..'
							: 'LOGIN'}
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Header;
