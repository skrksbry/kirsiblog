import "./globals.css";
import { cookies } from 'next/headers'
import Header from "@/components/Header";
import {IMetadata} from "@/interface/commentInterface";
import MetadataContent from "@/components/Metadata";


export const generateMetadata = async ({ params }:{ params:{id: string}}): Promise<IMetadata> =>
{
    return MetadataContent({title:"KIRSI BLOG", description:"키르시 블로그입니다.", asPath:'', ogImage:`/blog_og.png`})
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode}>) => {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
  return (
    <html data-color-mode={`${theme?.value === "light" ? "light" : "dark"}`} lang="ko" className={`h-full ${theme?.value === "light" ? "" : "dark"}`}>
        <body className="text-black bg-[rgb(233,233,233)] dark:text-white dark:bg-black transition-all duration-500 pt-[68px]">
            <Header theme={theme?.value} />
            {children}
        </body>
    </html>
  );
}

export default RootLayout;
