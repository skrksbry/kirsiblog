import {IBlock} from "@/interface/postInterface";
import Image from "next/image";
import {LinkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

const getPostBlocks = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const TextBlock = ({data}: {data: IBlock}) => {
    return (
        <div key={`content-${data.block_id}`} id={`content-${data.block_id}`} style={{
            fontSize: data.block_option ? data.block_option + "px" : "",
            fontWeight: Number(data.block_option) > 18 ? "bold" : ""
        }}
             className="min-h-6 whitespace-pre-wrap break-all relative">{data.block_content}</div>
    )
}

const ImageBlock = ({data}: {data: IBlock}) => {
    return (
        <div key={`content-${data.block_id}`} id={`content-${data.block_id}`}
             className="w-full flex justify-center my-4" style={{position: 'relative'}}>
            <div className="h-auto flex image-cover" style={{width: data.block_option === "F" ? "100%" : "50%", position: 'relative'}}>
                <Image
                    src={data.block_content}
                    alt={"본문이미지"}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-contain flex image-unset"
                />
            </div>
        </div>
    )
}

const HeaderImageBLock = ({data}: {data: IBlock}) => {
    return (
        <div key={`content-${data.block_id}`} id={`content-${data.block_id}`}
             className="w-full flex justify-center my-4" style={{position: 'relative'}}>
            <div className="h-auto flex image-cover" style={{width: "100%", background: data.block_option, position: 'relative'}}>
                <Image
                    src={data.block_content}
                    alt={"본문이미지"}
                    fill
                    sizes="(max-width: 768px) 100%, 100%"
                    className="object-contain flex image-unset"
                />
            </div>
        </div>
    )
}

const LinkBlock = async ({data}: {data: IBlock}) => {
    if(data.block_content === "blog_link") {
        const postInformation = await getPostBlocks(data.block_option);
        return (
            <Link target={"_blank"} href={`/view/${data.block_option}`} key={`content-${data.block_id}`}
                  id={`content-${data.block_id}`}
                  className="bg-gray-400 dark:bg-gray-800 p-2 my-2 rounded-md relative flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700"><LinkIcon
                width={18} height={18}/>{postInformation.post_name}</Link>
        )
    } else {
        return (
            <Link target={"_blank"} href={`${data.block_option}`} key={`content-${data.block_id}`}
                  id={`content-${data.block_id}`}
                  className="bg-gray-400 dark:bg-gray-800 p-2 my-2 rounded-md relative flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700"><LinkIcon
                width={18} height={18}/>{data.block_content}</Link>
        )
    }
}

export {TextBlock, ImageBlock, LinkBlock, HeaderImageBLock}
