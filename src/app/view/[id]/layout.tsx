import type {Metadata} from "next";
import { Inter } from "next/font/google";
import { cookies } from 'next/headers'
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kirsi",
    description: "Kirsi Tech Blog",
};

const ViewLayout = ({ children }: Readonly<{ children: React.ReactNode}>) => {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    return (
        <>
            {children}
        </>
    );
}

export default ViewLayout;
