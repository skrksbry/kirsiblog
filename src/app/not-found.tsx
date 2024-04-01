'use server'
import Link from "next/link";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

const NotFound = async () => {
    return (
        <div className="w-full h-full relative flex flex-wrap content-start">
            <div className="flex relative w-[1024px] h-[100%] m-auto justify-start flex-col">
                <ExclamationTriangleIcon className="w-32 mt-16"/>
                <span className="font-bold text-sm whitespace-pre px-2.5">ERROR 404</span>
                <span className="font-light text-sm whitespace-pre px-2.5">{`페이지를 찾을 수 없습니다.\n잘못된 요청이거나, 데이터 로드에 실패했습니다.\n\nTime: ${new Date()}`}</span>
                <Link href={"/"} className="flex ml-2.5">
                    <div className="rounded-md bg-black text-white dark:bg-white dark:text-black px-2 py-1 mt-4 text-sm">메인으로 돌아가기</div>
                </Link>
            </div>

        </div>
    );
}

export default NotFound;
