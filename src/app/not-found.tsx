'use server'
import Link from "next/link";
import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import Image from "next/image";

const NotFound = async () => {
    return (
        <div className="w-full h-full absolute bg-black text-white left-0 top-0 z-[32] items-center flex flex-col flex-wrap justify-center content-center">
            <div className="relative w-full px-3 lg:px-0 lg:w-auto flex-wrap flex h-80">
                <div className="relative h-80 w-80 scale-x-[-1] z-[2]">
                    <Image fill src="https://r2.silvercherry.io/404_kirsi.png" alt="404 not found"/>
                </div>
                <div className="relative flex flex-col h-80 align-center justify-center z-[2]">
                    <div className="flex font-extrabold text-8xl gap-3 mb-4">
                        <ExclamationTriangleIcon className="w-20"/>
                        <p>Oops !!</p>
                    </div>
                    <span className="flex w-full justify-center my-4">이 페이지를 찾을 수 없었어요.</span>
                    <Link href={"/"} className="flex w-full justify-center">
                        <div
                            className="rounded-md bg-black text-white items-center dark:bg-white dark:text-black px-3 py-1 mt-4 text-sm">메인으로
                            돌아가기
                        </div>
                    </Link>
                </div>
                <div
                    className="absolute -right-[100px] z-[1] -top-[120px] bg-red-500 opacity-30 blur-lg w-[248px] h-[248px] rounded-full"/>
                <div
                    className="absolute -right-[0px] z-[1] -top-[0px] bg-green-500 opacity-30 blur-lg w-[248px] h-[248px] rounded-full"/>
                <div
                    className="absolute -right-[20px] z-[1] top-[160px] bg-fuchsia-500 opacity-30 blur-lg w-[188px] h-[188px] rounded-full"/>
                <div
                    className="absolute -left-[100px] z-[1] -bottom-[50px] bg-blue-500 opacity-30 blur-lg w-[218px] h-[218px] rounded-full"/>
                <div
                    className="absolute -left-[180px] z-[1] -top-[30px] bg-amber-400 opacity-30 blur-lg w-[248px] h-[248px] rounded-full"/>

            </div>
        </div>
    );
}

export default NotFound;
