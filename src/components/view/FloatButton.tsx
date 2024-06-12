"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const FloatButton = () => {
    const [bounce, setBounce] = useState(false);
    const bounceRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const updateScroll = () => {
        if(window.scrollY > (document.body.scrollHeight - window.innerHeight) - 400){
            setBounce(true);
        }else{
            setBounce(false);
        }
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
        <div className="mt-4 flex justify-end gap-2 flex-col fixed right-8 bottom-6">
            <div id="a89" onClick={scrollToTop} ref={bounceRef} className={`px-2 py-2 font-bold rounded-[8px] bg-black dark:bg-white dark:text-black cursor-pointer transition-all`}><ChevronUpIcon className="w-4 h-4"/></div>
            <div className="px-2 py-2 font-bold rounded-[8px] bg-black dark:bg-white dark:text-black cursor-pointer hover:bg-black transition-all"><ChevronLeftIcon className="w-4 h-4"/></div>
        </div>
    )
};


export default FloatButton;