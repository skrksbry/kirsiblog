import Image from "next/image";
import deco1 from "../../public/deco1.svg";
import deco2 from "../../public/deco2.svg";
import Link from "next/link";
import {IPost} from "@/interface/postInterface";

const randomSvgImage = (value: string) => {
    if(value === "deco1"){
        return deco1;
    }else if(value === "deco2"){
        return deco2;
    }
}

const PostCard = ({post}:{post: IPost}) => {
    return (
        <Link className="grid justify-center group" href={`/view/${post.post_id}`}>
            <div
                className="flex relative w-60 min-w-26 h-full my-2 flex-wrap bottom-0 transition-transform">
                <div className="flex relative w-full h-40 object-cover rounded-lg overflow-hidden z-10">
                    <Image src={post.post_image.indexOf("http") === -1  ? randomSvgImage(post.post_image) : post.post_image} alt="document image" fill priority={true}
                           className="w-full h-40 object-cover group-hover:scale-110 transition-all"/>
                </div>
                <div className="flex w-full mt-0.5" style={{transition: "none"}}>
                    <span className="text-2xl font-bold truncate min-h-6">{post.post_name}</span>
                </div>
                <div className="flex w-full">
                    <span className="text-[12px] text-gray-600 dark:text-gray-400 min-h-3">{post.post_description}</span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
