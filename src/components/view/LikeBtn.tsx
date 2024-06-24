"use client";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";

const getLikes = async (id:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/likes/${id}`);
    return res.json();
}

const LikeBtn = ({id}:{id: string}) => {
    const [isLike, setIsLike] = useState<boolean>(false);
    const [likeCount,setLikeCount] = useState<number>(0);
    const changePostLike = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/addLike/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id,ua:""}),
        });
        setLikeCount(Number(likeCount) + (isLike ? -1 : +1));
        setIsLike(!isLike)
        if(res.status === 200) {
            setLikeCount(likeCount + Number(isLike ? -1 : +1));
            setIsLike(!isLike)
            return await res.json();
        }
    }

    useEffect(() => {
        const update = async () => {
            const likes = await getLikes(id);
            setIsLike(likes.my_likes);
            setLikeCount(likes.like_count);
        }
        update();
    }, [id]);

    return (
        <div className="relative flex my-2 justify-center pr-2">
            {!isLike && 
            <div className="blg-tooltip-top-center">
                <span className="bg-white z-[2]">글이 도움이 되었다면 눌러주세요 !</span>
                <div className="flex absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45 z-[1]" />
            </div>
            }
            <div onClick={()=>{changePostLike(id)}} className={`px-2 py-1 flex justify-center items-center gap-2 text-white rounded-[8px] transition-all hover:cursor-pointer ${isLike ? "hover:bg-red-600 bg-red-500" : "hover:bg-gray-600 bg-gray-500"}`}>
                {isLike ? <HeartIconSolid className="w-4 h-4" /> : <HeartIconOutline className="w-4 h-4" /> }
                <span className="font-extrabold">{likeCount}</span>
            </div>
        </div>
    )
}

export default LikeBtn;