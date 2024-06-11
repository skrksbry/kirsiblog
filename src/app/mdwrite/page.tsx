import MdWriter from "@/components/write/MdWriter";

const MdEdit = () => {

    return (
        <div className="w-full min-h-[100vh] relative flex flex-wrap content-start">
            <div className="flex relative w-full m-0 px-4 lg:w-[1024px] lg:m-auto lg:px-0 pt-24 pb-12">
                <div className="flex flex-1 relative flex-wrap content-start h-[100%] min-h-[600px]">
                    <div className="left-0 top-[0px] relative mb-6">
                        <h1
                            className="w-full relative text-xl font-bold text-black dark:text-white">{"새 포스트 발행하기"}</h1>
                    </div>
                    <MdWriter />
                </div>
            </div>
        </div>
    )
    
}

export default MdEdit;