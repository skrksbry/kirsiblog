"use client";
import {useEffect, useState} from "react";
import { usePathname, useRouter } from 'next/navigation'
import {ChevronLeftIcon, ChevronUpIcon, MoonIcon, SunIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

const Header = ({theme}:{theme: string|undefined}) => {
    const [scroll,setScroll] = useState(0);
    const [documentState,setDocument] = useState<Document|null>(null);
    const [currentTheme, setCurrentTheme] = useState(theme || "dark");
    const pathname = usePathname();
    const regex = /^\/view\/.*/;
    const isViewer = regex.test(pathname);
    const router = useRouter();

    const updateScroll = () => {
        setScroll(window.scrollY);
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
        setScroll(window.scrollY);
        setDocument(document);
        const currentTheme = localStorage.getItem('theme') ?? null;
        if (currentTheme) {
            document.documentElement.classList.add(currentTheme);
            setCurrentTheme(currentTheme);
        }else{
            localStorage.setItem('theme', 'dark');
        }
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    },[])

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setCurrentTheme('light');
            document.cookie = "theme=light; path=/; expires=" + 60 * 60 * 24 * 365 * 10;
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setCurrentTheme('dark');
            document.cookie = "theme=dark; path=/; expires=" + 60 * 60 * 24 * 365 * 10;
        }
    };
    return (
        <div
            className="flex z-20 p-4 w-full fixed items-center gap-3 border-b-[1px] bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)] backdrop-blur-sm left-0 top-0 flex-wrap drop-shadow-sm"
            style={scroll > 8 ? {
                height: "68px",
                borderColor: "rgba(255,255,255,0.1)",
            } : {background: "transparent", height: "68px", borderColor: "transparent"}}
        >
            <div className="flex gap-1 items-center transition-transform m-auto flex-wrap"
                 style={scroll > 8 ? {width: "1024px", marginTop:"0px", transition: "margin 0.25s"} : {width: "1024px", marginTop:"50px", transition: "margin 0.25s"}}>
                <div className="flex w-full gap-3 items-center">
                    <Link href="/" className="flex gap-3 items-center">
                        <div
                            className="flex justify-center items-center font-black text-black text-2xl w-8 h-8 bg-red-500 rounded-[5px]">K
                        </div>
                        <span className="font-light text-lg transition-none duration-0">KIRSI BLOG</span>
                    </Link>
                    <div className="block flex-1 overflow-hidden whitespace-nowrap text-ellipsis items-center font-bold mx-6"
                    style={{
                        opacity: scroll > 120 && isViewer ? 1 : 0,
                        transition: scroll > 120 && isViewer ? "opacity 0.3s" : "opacity 0.1s",
                    }}>
                        {documentState ? documentState.title.split("| ")[1] : ""}
                    </div>
                    {isViewer ? (<div onClick={goToBack}
                                      className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 hover:scale-105 transition-transform">
                        <ChevronLeftIcon className="w-4 h-4"/>BACK</div>) : ""}
                    {scroll > 8 ? (<div onClick={scrollToTop}
                                         className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 hover:scale-105  transition-transform">
                        <ChevronUpIcon className="w-4 h-4"/>TOP</div>) : ""}
                    <div onClick={toggleTheme}
                         className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 hover:scale-110  transition-transform">
                        {currentTheme === "light" ? <SunIcon className="w-4 h-4"/> : <MoonIcon className="w-4 h-4"/> }{currentTheme.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;

