import type {Metadata} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from 'next/headers'
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirsi",
  description: "Kirsi Tech",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode}>) => {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
  return (
    <html lang="ko" className={`h-full ${theme?.value === "light" ? "" : "dark"}`}>
      <body className="text-black bg-[rgb(233,233,233)] dark:text-white dark:bg-black transition-all duration-500 pt-[68px]">
      <Header theme={theme?.value} />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
