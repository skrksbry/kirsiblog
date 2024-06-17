import { HeartIcon } from "@heroicons/react/20/solid";

const LikeBtn = ({likes = 0}:{likes: number}) => {
    return (
        <div className="relative flex my-2 justify-center pr-2">
            <div className="min-w-[240px] flex absolute justify-center items-center -top-11 right-0 px-3 py-1 bg-white text-black rounded-[9px] z-[2] animate-bounce">
                <span className="bg-white z-[2]">글이 도움이 되었다면 눌러주세요 !</span>
                <div className="flex absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45 z-[1]" />
            </div>
            <div className="px-2 py-1 flex justify-center items-center gap-2 hover:opacity-50 bg-red-500 text-white rounded-[8px]">
                <HeartIcon className="w-4 h-4" />
                <span className="font-extrabold">{likes}</span>
            </div>
        </div>
    )
}

export default LikeBtn;