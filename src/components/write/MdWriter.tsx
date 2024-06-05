"use client"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const MDWriter = () => {
    const [content, setContent] = useState<any>("");

    const submitMdPost = () => {
        fetch(`${process.env.baseUrl}/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content}),
        }).then((res)=>{
            console.log(res);
            alert(res.toString());
        });
    }
    return (
        <>
            <MDEditor value={content} onChange={setContent} style={{ width:'100%'}} height={600} />
            <button onClick={submitMdPost} className="w-full h-12 bg-black dark:bg-white rounded-[10px] mt-6 text-white dark:text-black">보내기</button>            
        </>
    )
}

export default MDWriter;