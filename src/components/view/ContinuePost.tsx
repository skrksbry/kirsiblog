import {IMarkdownPost} from "@/interface/postInterface";
import PrevNextPost from "../PrevNextPost";

const getPrevNextPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/prev-next/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const ContinuePost = async ({id}:{id:string}) => {
    const posts = await getPrevNextPost(id);
    return (
        <>
            {/*<span className="w-full my-4 font-extrabold text-2xl">다음글</span>*/}
            <div
                className={`flex w-full gap-2 mt-4 ${posts.length === 1 && posts[0].post_call_id > id ? "justify-end" : ""}`}>
                {posts.map((post: IMarkdownPost) => (
                    <PrevNextPost key={post.post_call_id} post={post} basicPostId={id}/>
                ))}
            </div>
        </>
    );
}

export default ContinuePost
