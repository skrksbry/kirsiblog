import Image from 'next/image';
import deco1 from '../../public/deco1.svg';
import deco2 from '../../public/deco2.svg';
import Link from 'next/link';
import { IMarkdownPost } from '@/interface/postInterface';

const randomSvgImage = (value: string) => {
	if (value === 'deco1') {
		return deco1;
	} else if (value === 'deco2') {
		return deco2;
	}
};

const PostCard = ({ post }: { post: IMarkdownPost }) => {
	return (
		<Link
			className="flex justify-center w-full group"
			href={`/mdview/${post.post_call_id}`}
		>
			<div className="flex relative w-full overflow-hidden h-full mx-1.5 flex-col bottom-0 transition-transform">
				<div
					className="flex relative w-full min-h-40 object-cover rounded-lg overflow-hidden z-10"
					style={{ background: post.post_color }}
				>
					<Image
						src={
							post.post_image.indexOf(
								'http'
							) === -1
								? randomSvgImage(
										post.post_image
								  )
								: post.post_image
						}
						alt="document image"
						fill
						priority={true}
						className="w-full h-40 object-cover group-hover:scale-110 transition-all"
					/>
				</div>
				<div
					className="flex w-full mt-1.5 overflow-hidden"
					style={{ transition: 'none' }}
				>
					<span className="text-xl font-bold truncate min-h-6">
						{post.post_name}
					</span>
				</div>
				<div className="flex w-full">
					<span className="text-[12px] text-gray-600 dark:text-gray-400 min-h-3">
						{post.post_description}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
