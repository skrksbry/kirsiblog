'use server';
import Footer from "@/components/Footer";
import {notFound} from 'next/navigation'
import {IBlock} from "@/interface/postInterface";
import type {Metadata} from "next";
import {ImageBlock, LinkBlock, TextBlock, HeaderImageBLock} from "@/components/view/PostBlocks";
import AlertLine from "@/components/view/AlertLine";
import CodeBlocks from "@/components/view/CodeBlocks";
import dynamic from "next/dynamic";
const PostIndicator = dynamic(() => import('@/components/view/PostIndicator'));

const getPostBlocks = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const getPostComments = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/comments/${id}`,{ cache: 'no-store' })
    return await res.json();
}

export const generateMetadata = async ({ params }:{ params:{id: string}}): Promise<Metadata> =>
{
    const data = await getPostBlocks(params.id)
    return {
        title: `KIRSI BLOG | ${data.post_name}`,
        description: `${data.post_description}`
    }
}

const ViewPost = async ({params}:{ params: {id: string}}) => {
    const postBlocks = await getPostBlocks(params.id);
    const postComments = await getPostComments(params.id);
    if( postBlocks.error || postComments.error ){
        notFound()
    }

    const getBlock = (data: IBlock) => {
        switch (data.block_type) {
            case "img": {
                return <ImageBlock key={data.block_id} data={data} />
            }
            case "text": {
                return <TextBlock key={data.block_id} data={data} />
            }
            case "link": {
                return <LinkBlock key={data.block_id} data={data} />
            }
            case "code": {
                return <CodeBlocks key={data.block_id} data={data} />
            }
            case "header": {
                return <HeaderImageBLock key={data.block_id} data={data} />
            }
            default: {
                return <TextBlock key={data.block_id} data={data} />
            }
        }
    }
    return (
        <div className="w-full h-full min-h-[100vh] relative flex flex-wrap content-start">
            <div className="flex relative w-full m-0 px-4 lg:w-[1024px] lg:m-auto lg:px-0 pt-24 pb-12">
                {/*    Content Area   */}
                <div className="flex flex-1 relative flex-wrap content-start">
                    <div className="left-0 top-[0px] relative">
                        <span
                            className="w-full relative text-4xl font-bold">{postBlocks.post_name}</span>
                        <div className="w-full relative ext-[12px] text-gray-400 mt-1">{postBlocks.post_date}</div>
                    </div>
                    <div className="flex w-full relative mt-6 flex-col">
                        {postBlocks.blocks.map((data: IBlock)=> (
                            getBlock(data)
                        ))}
                        {/* TODO: 고민해보고 추가 예정  */}
                        {/*<div className="flex w-full m-auto pt-4 pb-12 flex-col">*/}
                        {/*    <div className="w-full text-2xl font-bold">이어서보기</div>*/}
                        {/*    <Suspense fallback={<Loading/>}>*/}
                        {/*        /!*<ContinuePost/>*!/*/}
                        {/*    </Suspense>*/}
                        {/*</div>*/}
                        { postBlocks.post_hidden ? <AlertLine content={`이 포스트는 링크로만 접근 가능한 비공개 포스트입니다.`}  level={0}/>
                        :
                            <>
                                {/* TODO: 댓글기능 추가개발  */}
                                {/*<span className="w-full text-xl font-bold mt-4">댓글이 {postComments.length}개 있습니다</span>*/}
                                {/*<ul role="list" className="pr-12 pt-3">*/}
                                {/*    {postComments.map((data: IComment) => (*/}
                                {/*        <li key={data.comment_id}*/}
                                {/*            className="flex w-full py-6 gap-2 flex-wrap border-b-[1px] last:border-b-[0px] border-[rgba(0,0,0,0.3)] dark:border-[rgba(255,255,255,0.3)]">*/}
                                {/*            <div className="flex w-full flex-wrap gap-3.5 items-center">*/}
                                {/*                <div className="flex w-12">*/}
                                {/*                    <UserCircleIcon className="w-12 h-12"/>*/}
                                {/*                </div>*/}
                                {/*                <div className="flex-wrap flex flex-1 content-center">*/}
                                {/*                    <span*/}
                                {/*                        className="flex text-[14px] font-bold">{data.comment_owner}</span>*/}
                                {/*                    <span*/}
                                {/*                        className="flex text-[14px] font-light opacity-40 items-center ml-0.5">#F32B</span>*/}
                                {/*                    <span*/}
                                {/*                        className="w-full text-[9px] text-gray-400">{getDate(data.comment_time)}</span>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="flex w-full px-2 py-2">*/}
                                {/*                <span className="w-full text-[14px]">{data.comment_content}</span>*/}
                                {/*            </div>*/}
                                {/*        </li>*/}
                                {/*    ))}*/}
                                {/*</ul>*/}
                                {/*<div className="flex w-full flex-wrap gap-3 justify-end ">*/}
                                {/*    <textarea*/}
                                {/*        placeholder="내용을 입력해 주세요."*/}
                                {/*        className="flex w-full min-h-32 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)] outline-none border-none border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.2)] rounded-xl p-4 resize-none"/>*/}
                                {/*    <button*/}
                                {/*        className="flex px-4 py-2 bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(255,255,255,0.8)] text-white dark:text-black rounded-xl justify-center items-center font-bold hover:scale-105 transition-transform active:scale-100">*/}
                                {/*        댓글 등록*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </>
                        }
                    </div>
                </div>
                <PostIndicator blocks={postBlocks.blocks}/>
            </div>

            <Footer/>


        </div>
    );
}

export default ViewPost;
