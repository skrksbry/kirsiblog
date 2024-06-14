"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const FloatButton = () => {
    const [bounce, setBounce] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);
    const [scrollLimitPos, setScrollLimitPos] = useState(0);

    const bounceRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const updateScroll = () => {
        if(window.scrollY > (document.body.scrollHeight - window.innerHeight) - 400){
            setBounce(true);
        }else{
            setBounce(false);
        }
        setScrollPos(window.scrollY);
        setScrollLimitPos((document.body.scrollHeight - window.innerHeight) - 400);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    }

    const goToBack = () => {
        router.back();
    }

    useEffect(()=> {
        window.addEventListener('scroll', updateScroll);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    },[]);

    useEffect(()=>{
        const handleAnimationEnd = () => {
            if(bounceRef.current){
                if(window.scrollY <= (document.body.scrollHeight - window.innerHeight) - 400){
                    bounceRef.current.classList.remove('bouncing');
                }
                bounceRef.current.removeEventListener('animationiteration', handleAnimationEnd);
            }
        };
        if (bounceRef.current){
            if (bounce) {
                bounceRef.current.classList.add('bouncing');
            } else {
                bounceRef.current.addEventListener('animationiteration', handleAnimationEnd);
            }
        }
    },[bounce])

    return (
        <div className="ml-5 z-20 flex justify-end items-end gap-2 flex-col fixed right-8 bottom-8">
            <div onClick={scrollToTop} ref={bounceRef} className={`flex items-center px-2 py-2 h-8 font-bold rounded-[8px] overflow-hidden hover:bg-red-500 dark:hover:bg-red-500 bg-black dark:bg-white dark:text-black cursor-pointer transition-all duration-500 ${scrollPos > 150 ? "opacity-100" : "opacity-0"}  ${scrollLimitPos < scrollPos ? "w-[110px]" : "w-8"}`}>
                <ChevronUpIcon className="min-w-4 min-h-4 w-4 h-4 text-white dark:text-black"/>
                <div className={`flex text-[12px] text-white dark:text-black transition-all overflow-hidden duration-300 text-nowrap items-center ${scrollLimitPos < scrollPos ? "opacity-100" : "opacity-0"}`}>맨 위로 돌아가기</div>
            </div>
            <div onClick={goToBack} className={`flex items-center px-2 py-2 h-8 font-bold rounded-[8px] overflow-hidden hover:bg-red-500 dark:hover:bg-red-500 bg-black dark:bg-white dark:text-black cursor-pointer transition-all duration-500 ${scrollPos > 150 ? "opacity-100" : "opacity-0"}  ${scrollLimitPos < scrollPos ? "w-[130px]" : "w-8"}`}>
                <ChevronLeftIcon className="min-w-4 min-h-4 w-4 h-4 text-white dark:text-black"/>
                <div className={`flex text-[12px] text-white dark:text-black transition-all overflow-hidden duration-300 text-nowrap items-center ${scrollLimitPos < scrollPos ? "opacity-100" : "opacity-0"}`}>다른 포스트 찾아보기</div>
            </div>
        </div>
    )
};


export default FloatButton;