import {IBlock} from "@/interface/postInterface";
import Image from "next/image";

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
             className="w-full flex justify-center my-4 relative">
            <div className="h-auto flex image-cover" style={{width: data.block_option === "F" ? "100%" : "50%"}}>
                <Image
                    src={data.block_content}
                    alt={"본문이미지"}
                    fill
                    className="object-contain flex image-unset"
                />
            </div>
        </div>
    )
}

export {TextBlock, ImageBlock}
