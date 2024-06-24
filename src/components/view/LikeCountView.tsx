"use client"

import {useEffect, useState} from "react";

const getLikes = async (id:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/likes/${id}`,);
    return res.json();
}

const LikeCountView = ( {id}:{id: string} ) => {

    const [likeCount,setLikeCount] = useState<number>(0);

    useEffect(() => {
        const update = async () => {
            const likes = await getLikes(id);
            setLikeCount(likes.like_count);
        }
        update();
    }, [id]);
    return (
        <>{likeCount}</>
    )
};

export default LikeCountView;