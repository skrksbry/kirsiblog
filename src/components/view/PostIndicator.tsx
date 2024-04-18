"use client"
import {IBlock} from "@/interface/postInterface";
import {useEffect, useState} from "react";
import { throttle } from "lodash";

const countKorean = (text: string) => {
    const regex = /[가-힣]/g;
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

const PostIndicator = ({blocks}:{blocks:IBlock[]}) => {
    const [scroll,setScroll] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const updateScroll = throttle(() => {
        setScroll(window.scrollY);
    },50);
    const scrollTarget = (target: string,index: number) => {
        const getItemOffset = document.getElementById(target)?.offsetTop || 0;
        const setPos = getItemOffset + (index * 24);
        window.scrollTo({
            top: setPos,
            left: 0,
            behavior: "smooth",
        })

    }
    useEffect(()=> {
        window.addEventListener('scroll', updateScroll);
        setScroll(window.scrollY);
        setIsLoading(true);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    }, [])
    return (
        <div
            className="hidden lg:flex sticky top-[72px] w-[120px] h-[100%] min-h-[60vh] gap-[0.1rem] flex-col py-2 px-0.5 ml-2">
            {/*<div className="absolute top-2 border-2 w-full h-10 border-red-500"></div>*/}
            {blocks.map((blockData, index) => {
                if(isLoading && document){
                let linkedItem = document.getElementById(`content-${blockData.block_id}`)?.offsetTop || 0;
                let linkedItemHeight = document.getElementById(`content-${blockData.block_id}`)?.offsetHeight || 0;
                let heightLatio = linkedItemHeight / 24;
                let addedKorean = countKorean(blockData.block_content) * 0.62;
                addedKorean = addedKorean - (addedKorean % 1);
                let totalLength = blockData.block_type == "text" ? blockData.block_content.length + addedKorean : 106;
                const mkItemArray = blockData.block_type == "text" ? Array.from({ length: (linkedItemHeight / 24) - ((linkedItemHeight / 24) % 1) }, (_, i) => (i-1) + 1) : [106];
                for (let i = 0;totalLength > 0;i++){
                    if(totalLength > 106){
                        mkItemArray[i] = 106;
                        totalLength -= 106;
                    }else{
                        mkItemArray[i] = totalLength;
                        totalLength =0;
                    }
                }
                return (
                    mkItemArray.map((data:number, lineIndex:number)=> {
                        if(blockData.block_type != "header" && blockData.block_type != "code") {
                            return (
                                <div key={`block-${blockData.block_id}-${lineIndex}`}
                                     className={`relative flex w-full h-[0.2rem] hover:h-2.5 transition-all duration-100 flex-col gap-[2px]`}
                                     style={{height: `${blockData.block_type !== "img" ? "" : `${heightLatio * 3.2}px`}`}}
                                     onClick={() => {
                                         scrollTarget(`content-${blockData.block_id}`, lineIndex)
                                     }}>
                                    <div
                                        className="bg-black dark:bg-white transition-all duration-200 flex flex-1"
                                        style={{
                                            width: `${blockData.block_type !== "img" ? `${(data / 106) * 100}%` : '100%'}`,
                                            maxWidth: "100%",
                                            opacity: (linkedItem + 188) + (linkedItemHeight / 2) >= scroll && linkedItem < scroll + window.innerHeight - 260 ? '70%' : '20%'
                                        }}
                                    >
                                        {blockData.block_type !== 'img' ? "" : <span
                                            className="flex w-full font-light text-[8px] text-gray-600 justify-center items-center">IMAGE</span>}
                                    </div>
                                </div>
                            )
                        }
                    })
                );
                } else {
                    return (<div key={index}></div>);
                }
            })}
        </div>
    )
}

export default PostIndicator
