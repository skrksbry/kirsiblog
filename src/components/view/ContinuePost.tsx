"use client"
import {useState} from "react";
import {IPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";

const ContinuePost = () => {
    const [posts,setPost] = useState<IPost[]>([]);

    const getPost = () => {
        fetch(`${process.env.baseUrl}/posts/`)
            .then(async (r) => {
                const data = await r.json();
                setPost(data);
            });
    }
    getPost();

    return (
        <div className="flex w-full gap-2">
            {posts.map((post: IPost) => (
                <PostCard key={post.post_id} post={post} />
            ))}
        </div>
    );
}

export default ContinuePost
