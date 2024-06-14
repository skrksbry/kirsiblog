import {useState} from "react";
import {IMarkdownPost, IPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";
import PrevNextPost from "../PrevNextPost";

const getPrevNextPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/prev-next/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const ContinuePost = async ({id}:{id:string}) => {
    const posts = await getPrevNextPost(id);
    return (
        <div className={`flex w-full gap-2 ${posts.length === 1 && posts[0].post_call_id > id ? "justify-end":""}`}>
            {posts.map((post: IMarkdownPost) => (
                <PrevNextPost key={post.post_call_id} post={post} basicPostId={id} />
            ))}
        </div>
    );
}

export default ContinuePost
