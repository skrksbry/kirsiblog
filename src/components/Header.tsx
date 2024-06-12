"use client";
import {useEffect, useState} from "react";
import { usePathname, useRouter } from 'next/navigation'
import {ChevronLeftIcon, ChevronUpIcon, MoonIcon, SunIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

const Header = ({theme}:{theme: string|undefined}) => {
    const [scroll,setScroll] = useState(0);
    const [currentTheme, setCurrentTheme] = useState(theme || "dark");
    const pathname = usePathname();

    const [documentTitle, setDocumentTitle] = useState<string>("");
    const regex = /^\/mdview\/.*/;
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
        const currentTheme = localStorage.getItem('theme') ?? null;
        if (currentTheme) {
            document.documentElement.classList.add(currentTheme);
            document.documentElement.setAttribute('data-color-mode', currentTheme);
            setCurrentTheme(currentTheme);
        }else{
            localStorage.setItem('theme', 'dark');
        }
        return () => {
            window.removeEventListener('scroll', updateScroll);
        }
    },[])

    useEffect(() => {
        setDocumentTitle(document.title.split("| ")[1]);
    }, [pathname]);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-color-mode', 'light');
            localStorage.setItem('theme', 'light');
            setCurrentTheme('light');
            
            document.cookie = "theme=light; path=/; expires=" + 60 * 60 * 24 * 365 * 10;
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-color-mode', 'dark');
            localStorage.setItem('theme', 'dark');
            setCurrentTheme('dark');
            document.cookie = "theme=dark; path=/; expires=" + 60 * 60 * 24 * 365 * 10;
        }
    };
    return (
        <div
            className={`flex z-20 py-4 px-6 lg:px-4 w-full fixed items-center gap-3 border-b-[1px] bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)] backdrop-blur-sm left-0 top-0 flex-wrap ${scroll > 8 ? "drop-shadow-sm" :""}`}
            style={scroll > 8 ? {
                height: "68px",
                borderColor: "rgba(255,255,255,0.1)",
            } : {background: "transparent", height: "68px", borderColor: "transparent"}}
        >
            <div className="flex gap-1 w-full lg:w-[1024px] items-center transition-transform m-auto flex-wrap"
                 style={scroll > 8 ? {marginTop:"0px", transition: "margin 0.25s"} : {marginTop:"50px", transition: "margin 0.25s"}}>
                <div className="flex w-full gap-3 items-center">
                    <Link href="/" className="flex gap-3 items-center">
                        <div
                            className="flex justify-center items-center font-black text-black text-2xl w-8 h-8 bg-red-500 rounded-[5px]">K
                        </div>
                        <span className="font-light text-lg lg:hidden transition-none duration-0" style={scroll > 8 ? {display:"none"}:{}}>KIRSI BLOG</span>
                        <span className="font-light text-lg hidden lg:block transition-none duration-0">KIRSI BLOG</span>
                    </Link>
                    <div
                        className="block flex-1 overflow-hidden whitespace-nowrap text-ellipsis items-center font-bold mx-6"
                    style={{
                        opacity: scroll > 120 && isViewer ? 1 : 0,
                        transition: scroll > 120 && isViewer ? "opacity 0.3s" : "opacity 0.1s",
                    }}>
                        {documentTitle}
                    </div>
                    {isViewer ? (<div onClick={goToBack}
                                      className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline transition-transform"
                                      style={{
                                          transition: "opacity 0.25s",
                                      }}>
                        <ChevronLeftIcon className="w-4 h-4"/>BACK</div>) : ""}
                    {scroll > 8 ? (<div onClick={scrollToTop}
                                        className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline transition-transform"
                                        style={{
                                            transition: "opacity 0.25s",
                                        }}>
                        <ChevronUpIcon className="w-4 h-4"/>TOP</div>) : ""}
                    <div onClick={toggleTheme}
                         className="cursor-pointer text-[12px] flex justify-center items-center gap-0.5 opacity-70 hover:opacity-100 hover:underline  transition-transform"
                         style={{
                             transition: "opacity 0.25s",
                         }}>
                        {currentTheme === "light" ? <SunIcon className="w-4 h-4"/> : <MoonIcon className="w-4 h-4"/> }{currentTheme.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;

