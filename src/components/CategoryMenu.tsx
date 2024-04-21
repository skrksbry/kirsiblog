'use client'

import CategoryButton from "@/components/CategoryButton";
import {
    ChatBubbleBottomCenterIcon,
    CodeBracketSquareIcon,
    SparklesIcon,
    Squares2X2Icon
} from "@heroicons/react/20/solid";
import {useState} from "react";
const CategoryMenu = ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined }}) => {
    const [scroll,setScroll] = useState(1);
    const [selectCategory,setSelectCategory] = useState(searchParams.ct ?? "");
    return (
        <div className="sticky flex w-full left-0 top-68px transition-transform duration-100 flex-wrap gap-4">
        <CategoryButton isSelect={selectCategory === ""} link="" onClick={() => {
            setSelectCategory("")
        }}>
            <SparklesIcon className="w-4 h-4"/>
            <div>All</div>
        </CategoryButton>
        <CategoryButton isSelect={selectCategory === "tech"} link="tech" onClick={() => {
            setSelectCategory("tech")
        }}>
            <CodeBracketSquareIcon className="w-4 h-4"/>
            <div>Tech</div>
        </CategoryButton>
        <CategoryButton isSelect={selectCategory === "uiux"} link="uiux" onClick={() => {
            setSelectCategory("uiux")
        }}>
            <Squares2X2Icon className="w-4 h-4"/>
            <div>UI/UX</div>
        </CategoryButton>
        <CategoryButton isSelect={selectCategory === "diary"} link="diary" onClick={() => {
            setSelectCategory("diary")
        }}>
            <ChatBubbleBottomCenterIcon className="w-4 h-4"/>
            <div>Diary</div>
        </CategoryButton>

    </div>
    )
}

export default CategoryMenu;

