'use server'
import {IMarkdownPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

const getPosts = async (searchParams: { [key: string]: string | string[] | undefined}) => {
    const requestUrl = searchParams.ct ? `${process.env.baseUrl}/markdown-posts/category/${searchParams.ct}` : `${process.env.baseUrl}/markdown-posts/`
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
                {posts.map((post: IMarkdownPost) => (
                    <PostCard key={post.post_call_id} post={post}/>
                ))}
            </div>
        </>
    );
}

export default PostList;
