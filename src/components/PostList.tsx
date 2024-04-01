'use server'
import {IPost} from "@/interface/postInterface";
import PostCard from "@/components/PostCard";

const getPosts = async (searchParams: { [key: string]: string | string[] | undefined}) => {
    const requestUrl = searchParams.ct ? `http://127.0.0.1:4000/posts/category/${searchParams.ct}` : 'http://127.0.0.1:4000/posts/'
    const res = await fetch(requestUrl,{ next: { revalidate: 30 } });
    return await res.json();
}
const PostList = async ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    const posts = await getPosts(searchParams);
    return (
        <div className="grid grid-cols-4 w-full gap-2">
            {posts.map((post: IPost) => (
                <PostCard key={post.post_id} post={post} />
            ))}

        </div>
    );
}

export default PostList;
