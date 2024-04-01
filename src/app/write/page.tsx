'use client';

import Editor from "@/components/write/Editor";

const WritePage = () => {


    return (
        <div className="w-full h-full min-h-[100vh] relative flex flex-wrap content-start">
            <div className="flex relative w-[1024px] m-auto pt-24 pb-12 flex-wrap gap-0.5">
                <Editor />
            </div>
        </div>
    )
}

export default WritePage;
