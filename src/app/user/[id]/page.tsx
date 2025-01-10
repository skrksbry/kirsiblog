import { getUserFromSession } from '@/app/layout';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import ErrorHandlerRedirect from '@/components/Shadow/ErrorHandlerRedirect';
import BannerCharView from '@/components/common/BannerCharView';
import Logo from '@/components/common/Logo';
import { cookies } from 'next/headers';
import Image from 'next/image';

const getUser = async (userNickname: string = '') => {
	const res = await fetch(`${process.env.baseUrl}/user/${userNickname}`, {
		next: { revalidate: 3600 },
	});
	const respon = await res.json();
	if (res.status === 200) {
		return { user: true, userInformation: respon, message: '' };
	} else {
		//not found user
		//redirect('/');
		return {
			user: false,
			userInformation: null,
			message: '유저를 찾을 수 없습니다.',
		};
	}
};

const UserInformation = async ({ params }: { params: { id: string } }) => {
	const cookieStore = cookies();
	const session = cookieStore.get('connect.sid');
	const logind = await getUserFromSession(session?.value);
	const { user, userInformation, message } = await getUser(params.id);

	return (
		<div className="blg-page">
			<div className="blg-page-content-area">
				{user ? (
					<>
						<div
							className="w-full mx-4 mb-6 lg:mx-0 lg:w-auto h-[340px] rounded-[8px] flex items-center flex-wrap flex-col"
							style={{
								background: '#bb004a',
								position: 'relative',
							}}
						>
							<div className="flex w-full px-3 py-3 gap-2 items-center">
								<Image
									width={
										18
									}
									height={
										18
									}
									src="https://r2.silvercherry.io/samlogo_only.png"
									alt={
										'blog-logo-simple'
									}
								/>
								{/* <Logo fill="#fff" /> */}
								<span
									className="font-light"
									style={{
										fontFamily: 'TTHakgyoansimMonggeulmonggeulR',
									}}
								>
									Writter
								</span>
							</div>
							<div className="w-40 h-[200px] overflow-hidden box-content pl-2 border-b-2 border-opacity-30 mx-6 my-1 z-[4]">
								<BannerCharView
									width={
										400
									}
									height={
										400
									}
									y={0}
									x={-100}
								/>
							</div>
							<span className="font-semibold text-white text-2xl z-[4]">
								{userInformation?.nickname.toUpperCase()}
							</span>
							<span className="font-light text-[10px] mb-6 text-white z-[4]">
								Frontend
								Developer
							</span>
							{/* <span className="font-light text-sm mb-6 text-white z-[4]">
								포스트{' '}
								{
									userInformation
										.user_posts
										.length
								}
								개
							</span> */}
						</div>
						<div className="flex flex-1 flex-wrap">
							<div className="flex w-full rounded-[8px] mx-4 min-h-32 bg-[#bb004a] justify-center items-center">
								<span>
									위젯
									준비중
								</span>
							</div>
							<div className="flex w-full px-6 py-6">
								<h1 className="font-bold text-2xl">
									{userInformation?.nickname.toUpperCase()}
									님이
									작성한
									포스트
								</h1>
							</div>
							<div className="grid grid-cols-1 w-full gap-2 lg:grid-cols-3 px-4">
								{userInformation.user_posts.map(
									(
										post: any
									) => (
										<PostCard
											key={
												post.post_call_id
											}
											post={
												post
											}
										/>
									)
								)}
							</div>
						</div>
					</>
				) : (
					<div className="flex w-full h-[500px] justify-center items-center">
						<span className="text-2xl font-bold">
							&quot; {params.id}{' '}
							&quot; 유저를 찾을 수
							없어요.
						</span>
					</div>
				)}
			</div>
			<ErrorHandlerRedirect err={!user} message={message} />
			<Footer />
		</div>
	);
};

export default UserInformation;
