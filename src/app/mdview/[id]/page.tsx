import MarkdownPostViewer from "@/components/view/MarkdownPostViewer";
import Image from "next/image";

const getMarkdownPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const MarkdownPostView = async ({params}:{ params: {id: string}}) => {
    const postContent = await getMarkdownPost(params.id);
    return (
        <div className="w-full min-h-[100vh] relative flex flex-wrap content-start">
            <div className="flex relative w-full m-0 px-4 lg:w-[1024px] lg:m-auto lg:px-0 pt-24 pb-12">
                <div className="flex flex-1 relative flex-wrap content-start">
                    <div className="left-0 top-[0px] relative post-view">
                        <h1
                            className="w-full relative text-4xl font-bold text-black dark:text-white">{"TITLE"}</h1>
                        <div className="w-full relative ext-[12px] text-gray-400 mt-1">{"0000-00-00 00:00"}</div>
                    </div>
                    <div className="w-full flex justify-center my-4" style={{position: 'relative'}}>
                        <div className="h-auto flex image-cover rounded-[12px]" style={{width: "100%", background: postContent.post_color, position: 'relative'}}>
                            <Image
                                src={postContent.post_image}
                                alt={"본문이미지"}
                                fill
                                sizes="100%, 100%"
                                className="object-contain flex image-unset"
                                priority={true}
                            />
                        </div>
                    </div>
                    <MarkdownPostViewer md={postContent.post_content}/>
                </div>
            </div>
        </div>
    );
}
export default MarkdownPostView;