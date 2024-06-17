import Image from "next/image";
import MetadataContent from "@/components/Metadata";
import { IMetadata } from "@/interface/commentInterface";
import Footer from "@/components/Footer";
import BannerCharView from "@/components/common/BannerCharView";
import FloatButton from "@/components/view/FloatButton";
import { getDate } from "@/common/common";
import ContinuePost from "@/components/view/ContinuePost";
import dynamic from "next/dynamic";
import SkeletonView from "@/components/common/SkeletonView";
import {EyeIcon, HeartIcon} from "@heroicons/react/20/solid";
import LikeBtn from "@/components/view/LikeBtn";
import { headers } from "next/headers";


const getMarkdownPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const updateViewCountPost = async (id:string) => {
    const headersList = headers();
    let ip = headersList.get("x-forwarded-for");
    if (ip) {
        ip = ip.split(',')[0].trim();
    }else{
        ip = "0.0.0.0"
    }
    return await fetch(`${process.env.baseUrl}/markdown-posts/viewCreate`, {
        next: { revalidate: false },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id,ip:ip,ua:""}),
    });
}

export const generateMetadata = async ({ params }:{ params:{id: string}}): Promise<IMetadata> =>
    {
        const data = await getMarkdownPost(params.id)
        return MetadataContent({title:`KIRSI BLOG | ${data.post_name}`, description:data.post_description, asPath:'', ogImage:`/og?id=${params.id}`})
    }

const MarkdownPostViewer  = dynamic(() => import("@/components/view/MarkdownPostViewer"), {
    ssr: false,
    loading: () => <SkeletonView />
});


const MarkdownPostView = async ({params}: { params: { id: string } }) => {
    const postContent = await getMarkdownPost(params.id);
    await updateViewCountPost(params.id);
    return (
        <div className="w-full min-h-[100vh] relative flex flex-wrap content-start">
            <div className="flex relative w-full m-0 px-3 lg:px-0 lg:w-[1024px] lg:m-auto pt-24">
                <div className="flex w-full flex-1 relative flex-wrap content-start">
                    <div className="flex w-full flex-wrap left-0 top-[0px] relative post-view">
                        <h1
                            className="w-full relative text-4xl font-bold text-black dark:text-white">{postContent.post_name}</h1>
                        <div className="flex-1 flex relative items-center text-gray-400 mt-6 gap-2"><span className="flex font-extrabold text-lg">{"Kirsi"}</span> | <span className="text-md">{getDate(postContent.post_date)}</span></div>
                        <div className="flex relative items-center text-gray-400 mt-6 gap-2 "><EyeIcon className="w-4 h-4"/>{postContent.post_view_count} <HeartIcon className="w-4 h-4"/>{postContent.post_likes_count}</div>
                    </div>
                    <div className="w-full flex justify-center my-4" style={{position: 'relative'}}>
                        <div className="h-auto flex image-cover rounded-[12px] max-h-[300px]" style={{width: "100%", background: postContent.post_color, position: 'relative'}}>
                            <Image
                                src={postContent.post_image}
                                alt={"타이틀 이미지"}
                                fill
                                sizes="100%, 100%"
                                className="object-contain flex image-unset"
                                priority={true}
                            />
                        </div>
                    </div>
                    <MarkdownPostViewer md={postContent.post_content}/>
                    <div className="py-4 mt-4 border-t-2 border-b-0 w-full flex border-dotted border-[#808080] border-opacity-30 flex-wrap">
                        <span className="w-full font-extrabold text-xl px-2">Written by</span>
                        <div className="bg-white rounded-full w-24 h-24 overflow-hidden border-[2px] pl-1.5 border-opacity-30 m-2" style={{background: postContent.post_color}}>
                            <BannerCharView />
                        </div>
                        <div className="m-4 justify-center flex flex-col">
                            <span className="font-extrabold text-2xl">KIRSI</span>
                            <span className="font-light text-sm text-gray-400">Frontend Developer</span>
                        </div>
                        <div className="flex flex-1 items-center justify-end">
                            <LikeBtn likes={postContent.post_likes_count}/>
                        </div>

                        <ContinuePost id={params.id} />
                    </div>
                </div>
                <div className="flex absolute -right-6 h-full items-end">
                    <FloatButton/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default MarkdownPostView;