const Footer = () => {
    return (
        <div className="flex w-full justify-center p-2 h-24">
            <div className="flex w-[1024px] min-h-36 flex-col">
                <span className="w-full text-[12px] opacity-30">©2024 silvercherry.io all rights reserved.</span>
                <span className="w-full text-[12px] opacity-30">Develop by. Kirsi ( GOH JAE HYUN )</span>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span className="w-full text-[9px] opacity-30">"Cherry Blog" version 1.0.1 / NginX / Next.js</span>
            </div>
        </div>
    )
}
export default Footer;
