'use server'
import {IPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";

const getPosts = async (searchParams: { [key: string]: string | string[] | undefined}) => {
    const requestUrl = searchParams.ct ? `${process.env.baseUrl}/posts/category/${searchParams.ct}` : `${process.env.baseUrl}/posts/`
    const res = await fetch(requestUrl,{ next: { revalidate: 30 } });
    return await res.json();
}
const PostList = async ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    const posts = await getPosts(searchParams);
    return (
        <div className="grid grid-cols-1 w-full gap-2 lg:grid-cols-4">
            {posts.map((post: IPost) => (
                <PostCard key={post.post_id} post={post} />
            ))}

        </div>
    );
}

export default PostList;
