"use client";
import {useRef, useState} from "react";

interface Blocks {
    index: number;
    uuid: string;
    content: string;
    type: string;
}
const EditBlock = ({block, changeBlock, focusMove}: {block:Blocks, changeBlock: Function, focusMove: Function}) => {
    const ref = useRef<HTMLDivElement|null>(null);
    const [blockContent,setBlockContent] = useState(block.content);
    const typeStyle = (type: string) => {
        const sameStyle = "flex w-full"
        switch (type){
            case "text": {

                return `${sameStyle} text-[12px]`
            }
            case "img": {

                return `${sameStyle} text-[12px]`
            }
            case "title": {

                return `${sameStyle} text-[32px] font-bold mb-1`
            }
            default: {

                return ""
            }
        }

    }

    const keyboardAction = (event: any) => {
        if(event.key === "Enter"){
            event.preventDefault();
            if (event.nativeEvent.isComposing) {
                return;
            }
            focusMove(block.index+1,"add")

        }else if(event.key === "ArrowUp"){
            event.preventDefault();
            if (event.nativeEvent.isComposing) {
                return;
            }
            focusMove(block.index-1)
        }else if(event.key === "ArrowDown"){
            event.preventDefault();
            if (event.nativeEvent.isComposing) {
                return;
            }
            focusMove(block.index+1,"move")
        }
        if(event.key && block.type === "img" && block.content !== ""){
            if(event.key === "Backspace"){
                event.preventDefault();
                if (event.nativeEvent.isComposing) {
                    return;
                }
                changeBlock(block.index,blockContent,"remove");
            }
        }else{
            if(event.key === "Backspace" && blockContent === ""){
                event.preventDefault();
                focusMove(block.index-1,"move");
                if (event.nativeEvent.isComposing) {
                    return;
                }
                changeBlock(block.index,blockContent,"remove");
            }
        }
    }

    const getInfoWord = (type: string) => {
        switch (type){
            case "text": {
                return `내용을 입력해주세요.`
            }
            case "img": {

                return `이미지 링크를 입력해주세요.`
            }
            case "title": {

                return `제목을 입력해주세요.`
            }
            default: {

                return ""
            }
        }
    }

    const updateContent = (event: any) => {
        if(event.target.innerText !== "/img"){
            setBlockContent(event.target.innerText)  ;
        }else{
            changeBlock(block.index,"","img");
            if(ref.current){
                ref.current.innerText = "";
            }
            setBlockContent("");
        }
    }

    const thisBlock = document.getElementById(`editBlock${block.index}`);
    thisBlock?.focus();

    return (
        <div className={`${typeStyle(block.type)} relative items-center`}>
            <div
                className={`${typeStyle(block.type)} spanBlockIndicator text-gray-600 dark:text-gray-400 z-0 absolute -left-[60px] top-0 h-full`}>
                <span
                    className="w-[30px] text-[10px] items-center flex justify-end font-normal">{block.type} |
                </span>
                <span
                    className="w-[30px] pr-[10px] text-[10px] items-center flex justify-end font-normal">{block.index}
                </span>
                {blockContent == "" ? `${getInfoWord(block.type)}` : ""}
            </div>
            {(block.type !== "img"  || block.content === "")  ?
                <div id={`editBlock${block.index}`}
                     suppressContentEditableWarning={true}
                     ref={ref}
                     className={`${typeStyle(block.type)} z-[1]`}
                     onKeyDown={keyboardAction}
                     contentEditable={true}
                     onBlur={
                        ()=>{changeBlock(block.index,blockContent)}
                     }
                     onInput={
                        (e: any)=>{updateContent(e)}
                     }
                     onFocus={
                         ()=>{
                             const thisBlock = document.getElementById(`editBlock${block.index}`);
                             if(thisBlock){
                                 let range = document.createRange()
                                 let sel = window.getSelection()
                                 if(thisBlock.childNodes && thisBlock.childNodes.length > 0) {
                                    range.setStart(thisBlock.childNodes[0], blockContent.length)
                                    range.collapse(true)
                                    sel?.removeAllRanges()
                                    sel?.addRange(range)
                                 }
                                 focusMove(block.index,'pos')
                             }

                         }
                     }
                     autoFocus
                >
                    {block.content}
                </div>
                :
                <div id={`editBlock${block.index}`}
                     suppressContentEditableWarning={true}
                     ref={ref}
                     className={`${typeStyle(block.type)} z-[1] justify-center`}
                     onKeyDown={keyboardAction}
                     contentEditable={true}
                     onInput={
                         (e: any)=>{setBlockContent(e.target.innerText)}
                     }>
                    <img src={block.content} alt={"본문 이미지"} className={"flex w-[50%] h-auto"}/>
                </div>
            }
        </div>
    )
}

export default EditBlock;
