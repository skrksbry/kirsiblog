import {CodeBracketSquareIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

const CategoryButton = ({isSelect=false,children,link,onClick =()=>{}} : {isSelect :boolean,children  :React.ReactNode,link: string,onClick:()=>void}) => {

    return (
        <Link href={link.length > 0 ? `/?ct=${link}` : `/`} onClick={onClick} className="py-2 flex flex-wrap items-center opacity-50 gap-0.5 rounded-lg text-[14px] mt-2 cursor-pointer hover:opacity-100"
        style={{
            color: isSelect ? "" : "",
            opacity: isSelect ? "1" : "",
            transition: "transform 0.25s, opacity 0.25s"
        }}>
            {children}
        </Link>
    )
}

export default CategoryButton;
