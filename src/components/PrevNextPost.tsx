import Image from "next/image";
import deco1 from "../../public/deco1.svg";
import deco2 from "../../public/deco2.svg";
import Link from "next/link";
import {IMarkdownPost} from "@/interface/postInterface";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

const randomSvgImage = (value: string) => {
    if(value === "deco1"){
        return deco1;
    }else if(value === "deco2"){
        return deco2;
    }
}

const PrevNextPost = ({post, basicPostId}:{post: IMarkdownPost,basicPostId: string}) => {
    const targetPos = Number(post.post_call_id) > Number(basicPostId) ? "next" : "prev";
    return (
        <Link className="flex justify-center w-full max-w-[50%] group flex-wrap" href={`/mdview/${post.post_call_id}`}>
            
            <div
                className={`flex relative w-full overflow-hidden h-full my-2 mx-1.5 flex-col bottom-0 transition-transform`}>
                <div className="flex relative w-full min-h-48 object-cover rounded-lg overflow-hidden z-10" style={{background: post.post_color}}>
                    <Image src={post.post_image.indexOf("http") === -1  ? randomSvgImage(post.post_image) : post.post_image} alt="document image" fill priority={true}
                           className="w-full h-48 object-cover group-hover:scale-110 transition-all"/>
                    <div className={`flex absolute left-0 top-0 w-full h-full px-4 py-2 backdrop-blur-0 hover:backdrop-blur-sm flex-col from-[rgba(255,255,255,0.5)] bg-gradient-to-t dark:from-[rgba(0,0,0,0.5)]`}>
                        <div className={`flex flex-1 w-full items-end flex-wrap content-end ${targetPos === "next" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex w-full items-center gap-1 opacity-70 ${targetPos === "next" ? "justify-end" : "justify-start"}`}>
                                {targetPos === "next" ? 
                                    <>
                                        <span className="font-light text-sm">Next</span> 
                                        <ArrowRightIcon className="w-4 h-4 text-black dark:text-white" />
                                    </>
                                    :
                                    <>
                                        <ArrowLeftIcon className="w-4 h-4 text-black dark:text-white" />
                                        <span className="font-light text-sm">Prev</span> 
                                    </>
                                }
                            </div>
                            <div className="flex mt-0.5 overflow-hidden" style={{transition: "none"}}>
                                <span className="text-2xl font-bold truncate min-h-6">{post.post_name}</span>
                            </div>
                            <div className="flex w-full">
                                <span className="text-[12px] text-gray-600 dark:text-gray-400 min-h-3">{post.post_description}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </Link>
    )
}

export default PrevNextPost
