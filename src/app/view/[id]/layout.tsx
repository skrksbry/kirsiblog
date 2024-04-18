import type {Metadata} from "next";
import { cookies } from 'next/headers'


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
