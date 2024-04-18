'use client';
import {useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import EditBlock from "@/components/write/EditBlock";
import {useRouter} from "next/navigation";

interface Blocks {
    index: number;
    uuid: string;
    content: string;
    type: string;
}
const Editor = () => {
    const { push } = useRouter();
    const cursorRef = useRef(1);
    const lengthRef = useRef(2);
    const [data,setData] = useState<Blocks[]>([{index:0,uuid:uuidv4(),type:"title",content:""}])
    const [tmpData,setTmpData] = useState<Blocks[]>([]);
    const [cursor, setCursor] = useState(1);
    const updateContent = (searchIndex:number, content: string, type? :string) => {
        if(!type || type !== "remove") {
            const copy = [...data];
            copy.filter((o) => o.index === searchIndex)[0].content = content;
            if (type) {
                copy.filter((o) => o.index === searchIndex)[0].type = type;
            }
            setData(copy);
        }else if(type === "remove" && searchIndex != 0){
            const copy = [...data];
            const newData = copy.filter((o)=> o.index !== searchIndex);
            newData.forEach((row, nIndex)=>{
                row.index = nIndex;
            })
            setData(newData);
        }
    }

    useEffect(() => {
        if(tmpData.length > 0) {
            setData(tmpData);
            setTmpData([]);
        }
    }, [tmpData]);

    const focusMove = (index :number, type :"pos"|"move"|"add" = "move") => {
        if(document ?? false){
            if(type === "move" || type === "add") {
                const item = document.getElementById(`editBlock${index}`);
                if (item && type !== "add") {
                    item.focus();
                } else {
                    if (type === "add") {
                        // no more block
                        const copy = [...data];
                        copy.splice(index,0,{index: index, uuid:uuidv4(), content: "", type: "text"});
                        copy.forEach((row, nIndex)=>{
                            row.index = nIndex;
                        })
                        setData(copy);
                        lengthRef.current = copy.length;
                    }
                }
            }else{
                cursorRef.current = index;
                setCursor(cursorRef.current);
            }
        }
    }

    const regContent = () => {
        const copy = [...data];
        const DPost = {post_name:copy[0].content,post_date:new Date(),post_image:"",post_description:"",post_category:"",blocks:[]};
        copy.forEach((block)=>{
            if(block.index != 0){
                // @ts-ignore
                DPost.blocks.push({block_index:block.index,block_content:block.content,block_type:block.type});
            }
        })

        fetch(`${process.env.baseUrl}/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DPost),
        }).then((res)=>{
            push("/");
        });
    }

    return (
        <>
            {
                data.map((block, index)=> {
                    console.log(block);
                    return(
                        <EditBlock key={block.uuid} block={block} changeBlock={updateContent} focusMove={focusMove}/>
                    )
                })
            }
            <div onClick={regContent} className="w-full bg-black text-white dark:bg-white dark:text-black flex justify-center items-center h-12 font-bold rounded-md mt-6">보내기</div>
        </>
    )
}

export default Editor;
