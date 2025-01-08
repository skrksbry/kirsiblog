import Logo from '@/components/common/Logo';
import { ImageResponse } from 'next/og';

const getPost = async (id: string) => {
	const res = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`, {
		next: { revalidate: 10 },
	});
	return await res.json();
};
export const GET = async (request: Request) => {
	try {
		const { searchParams } = new URL(request.url);
		const post = await getPost(searchParams.get('id') || '0');

		return new ImageResponse(
			(
				<div
					style={{
						background: post.post_color,
						height: '100%',
						width: '100%',
						display: 'flex',
					}}
				>
					<div
						style={{
							display: 'flex',
							position: 'relative',
							justifyContent:
								'center',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								display: 'flex',
								position: 'absolute',
								left: '50px',
								top: '50px',
								fontWeight: 'bold',
								fontSize: '24px',
								color: '#bb004a',
								fontFamily: 'TTHakgyoansimMonggeulmonggeulR',
							}}
						>
							<img
								src="https://r2.silvercherry.io/samlogo_small.png"
								width="200px"
							/>
						</div>
						<img src={post.post_image} />
						<span
							style={{
								display: 'flex',
								width: '100%',
								height: '100%',
								paddingTop: '280px',
								justifyContent:
									'center',
								alignItems: 'center',
								position: 'absolute',
								fontSize: '38px',
								color: 'white',
							}}
						>
							{post.post_name}
						</span>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
};
