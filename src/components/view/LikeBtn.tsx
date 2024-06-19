"use client";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

const LikeBtn = ({likes = 0, id, ip = "0.0.0.0", already = false}:{likes: number, id: string, ip: string, already?: boolean}) => {
    const [isLike, setIsLike] = useState<boolean>(already);
    const [likeCount,setLikeCount] = useState<number>(likes);
    console.log(already);
    const changePostLike = async (id: string, ip: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/addLike/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id,ip:ip,ua:""}),
        });
        setLikeCount(Number(likeCount) + (isLike ? -1 : +1));
        setIsLike(!isLike)
        if(res.status === 200) {
            setLikeCount(likeCount + Number(isLike ? -1 : +1));
            setIsLike(!isLike)
            return await res.json();
        }
    }

    return (
        <div className="relative flex my-2 justify-center pr-2">
            {!isLike && 
            <div className="blg-tooltip-top-center">
                <span className="bg-white z-[2]">글이 도움이 되었다면 눌러주세요 !</span>
                <div className="flex absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45 z-[1]" />
            </div>
            }
            <div onClick={()=>{changePostLike(id,ip)}} className={`px-2 py-1 flex justify-center items-center gap-2 text-white rounded-[8px] transition-all hover:cursor-pointer ${isLike ? "hover:bg-red-600 bg-red-500" : "hover:bg-gray-600 bg-gray-500"}`}>
                {isLike ? <HeartIconSolid className="w-4 h-4" /> : <HeartIconOutline className="w-4 h-4" /> }
                <span className="font-extrabold">{likeCount}</span>
            </div>
        </div>
    )
}

export default LikeBtn;