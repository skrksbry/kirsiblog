import { getUserFromSession } from '@/app/layout';
import PostCard from '@/components/PostCard';
import PostList from '@/components/PostList';
import ErrorHandlerRedirect from '@/components/Shadow/ErrorHandlerRedirect';
import BannerCharView from '@/components/common/BannerCharView';
import { cookies } from 'next/headers';

export const getUser = async (userNickname: string = '') => {
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
	console.log(userInformation);

	return (
		<div className="blg-page">
			<div className="blg-page-content-area">
				{user ? (
					<>
						<div
							className="w-auto h-auto rounded-[8px] flex items-center flex-wrap flex-col"
							style={{
								background: 'rgba(239, 68, 68, 0.7)',
								position: 'relative',
							}}
						>
							<div
								className="w-full h-full rounded-[8px] absolute top-0 left-0"
								style={{
									background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.4) 0%, rgba(218, 174, 81, 0.4) 100%)',
								}}
							></div>
							<div className="rounded-full w-40 h-40 overflow-hidden border-[2px] box-content pl-2 border-opacity-30 m-6 mb-2 z-[4]">
								<BannerCharView />
							</div>
							<h1 className="font-semibold text-white text-2xl z-[4]">
								{userInformation?.nickname.toUpperCase()}
							</h1>
							<span className="font-light text-[10px] mb-6 text-white z-[4]">
								Frontend
								Developer
							</span>
							<span className="font-light text-sm mb-6 text-white z-[4]">
								포스트{' '}
								{
									userInformation
										.user_posts
										.length
								}
								개
							</span>
						</div>
						<div className="flex flex-1">
							<div className="flex w-full content-end px-4">
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
		</div>
	);
};

export default UserInformation;
