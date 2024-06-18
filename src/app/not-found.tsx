'use server'
import Link from "next/link";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

const NotFound = async () => {
    return (
        <div className="w-full h-full absolute bg-black text-white left-0 top-0 z-[32] items-center flex flex-col flex-wrap justify-center content-center">
            <ExclamationTriangleIcon className="w-48"/>
                <span className="font-bold text-[72px] whitespace-pre px-2.5">404</span>
                <Link href={"/"} className="flex ml-2.5">
                    <div className="rounded-md bg-black text-white dark:bg-white dark:text-black px-2 py-1 mt-4 text-sm">메인으로 돌아가기</div>
                </Link>
        </div>
    );
}

export default NotFound;
