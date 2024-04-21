'use server';
import Footer from "@/components/Footer";
import PostList from "@/components/PostList";
import CategoryMenu from "@/components/CategoryMenu";
import Banner from "@/components/Banner";

const Home = ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    return (
        <div className="w-full min-h-full relative flex flex-wrap content-start items-start">
            <div className="flex relative w-full px-6 lg:px-0 lg:w-[1024px] m-auto pt-24 pb-12 flex-wrap gap-6">
                <Banner />
                <CategoryMenu searchParams={searchParams}/>
                <PostList searchParams={searchParams}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
