"use client"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ColorBlock from "../common/ColorBlock";

const MDWriter = () => {
    const [content, setContent] = useState<any>("");
    const [title, setTitle] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [imageFileName, setImageFileName] = useState<string>("");
    const router = useRouter();

    const colorChnage = ( color:string ) => {
        setColor(color);
    }
    const submitMdPost = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post_name:title,post_image:`https://r2.silvercherry.io/${imageFileName}`,post_category:"",post_hidden:true,post_description:"",post_date:new Date(),post_color:color,post_content:content}),
        }).then(async (res)=>{
            const postData = await res.json();
            router.push(`/mdview/${postData.post_call_id}`);
        });
    }
    return (
        <>
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} className="w-full text-3xl bg-transparent outline-none mb-2" placeholder="제목을 입력해주세요"></input>
            <ColorBlock color="linear-gradient(90deg, #d53369 0%, #daae51 100%)" onClick={colorChnage}/>
            <ColorBlock color="linear-gradient(90deg, #bdc2e8 0%, #e6dee9 100%)" onClick={colorChnage} />
            <ColorBlock color="linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)" onClick={colorChnage} />
            <ColorBlock color="linear-gradient(to right, #74ebd5, #acb6e5)" onClick={colorChnage} />
            <ColorBlock color="linear-gradient( to right, #dd4e4e 10%, #dd4e4e 100%)" onClick={colorChnage} />
            <ColorBlock color="linear-gradient(90deg, #111111 0%, #333333 100%)"  onClick={colorChnage} />
            {/*TODO: 선택된 색상 인터페이스 어떻게 할지 고민 */}
            <span className="w-full text-sm">SELECTED GRADIENT : {color}</span>
            <input onChange={(e)=>{setImageFileName(e.target.value)}} value={imageFileName} className="w-full text-xl bg-transparent outline-none mb-2" placeholder="이미지 파일명 입력"></input>
            
            <MDEditor value={content} onChange={setContent} style={{ width:'100%'}} height={600} />
            <button onClick={submitMdPost} className="w-full h-12 bg-black dark:bg-white rounded-[10px] mt-6 text-white dark:text-black">보내기</button>            
        </>
    )
}

export default MDWriter;