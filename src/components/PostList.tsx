'use server'
import {IPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

const getPosts = async (searchParams: { [key: string]: string | string[] | undefined}) => {
    const requestUrl = searchParams.ct ? `${process.env.baseUrl}/posts/category/${searchParams.ct}` : `${process.env.baseUrl}/posts/`
    const res = await fetch(requestUrl,{ next: { revalidate: 30 } });
    return await res.json();
}

const getParamMatchName = (searchParams: { [key: string]: string | string[] | undefined}) => {
    switch (searchParams.ct){
        case "all": {
            return "RECENT";
        }
        case "tech": {
            return "TECH";
        }
        case "uiux": {
            return "UI/UX";
        }
        case "diary": {
            return "DIARY";
        }
        default : {
            return "RECENT"
        }
    }
}
const PostList = async ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    const posts = await getPosts(searchParams);
    return (
        <>
            <span className="w-full text-xl font-bold mt-4">{getParamMatchName(searchParams)} POST</span>
            {posts.length === 0 &&
                <div className="flex w-full mt-12 flex-col justify-center items-center gap-1">
                    <ExclamationTriangleIcon width={42} height={42}/>
                    <span className="font-bold text-[12px]">작성된 포스트가 없습니다</span>
                </div>
            }
            <div className="grid grid-cols-1 w-full gap-2 lg:grid-cols-4">
                {posts.map((post: IPost) => (
                    <PostCard key={post.post_id} post={post}/>
                ))}
                <Link className="flex justify-center w-full group" href={`/mdview/`}>
                    <div
                        className="flex relative w-full overflow-hidden h-full my-2 mx-1.5 flex-col bottom-0 transition-transform">
                        <div className="flex relative w-full min-h-40 object-cover rounded-lg overflow-hidden z-10" style={{background: 'black'}}>
                            
                        </div>
                        <div className="flex w-full mt-0.5 overflow-hidden" style={{transition: "none"}}>
                            <span className="text-xl font-bold truncate min-h-6">테스트 md 포스트</span>
                        </div>
                        <div className="flex w-full">
                            <span className="text-[12px] text-gray-600 dark:text-gray-400 min-h-3">테스트용</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default PostList;
