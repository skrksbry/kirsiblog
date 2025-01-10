'use server';
import Footer from '@/components/Footer';
import PostList from '@/components/PostList';
import CategoryMenu from '@/components/CategoryMenu';
import Banner from '@/components/Banner';

const Home = ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	return (
		<div className="blg-page ">
			<div className="flex relative px-6 lg:px-0 m-auto pt-24 pb-12 flex-wrap gap-6 blg-layout-width">
				<Banner />
				<CategoryMenu searchParams={searchParams} />
				<PostList searchParams={searchParams} />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
