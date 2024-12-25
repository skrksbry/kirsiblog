import { CloudFlareIcon, NestIcon, NginxIcon } from '@/components/icons';
import { LinkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className="flex w-full justify-center p-2 mb-2 flex-wrap">
			<div className="flex w-[1024px] min-h-36 flex-wrap gap-2 content-start">
				<div className="flex bg-[#808080] opacity-30 w-full h-[1px] my-2"></div>
				<div className="w-full px-6 lg:px-0">
					<div className="w-full flex gap-1 content-center items-center flex-wrap">
						<div className="flex justify-center items-center font-black text-sm w-4 h-4 bg-[#808080] rounded-[3px]">
							<span className="text-[rgb(233,233,233)] dark:text-black font-black transition-all duration-500">
								K
							</span>
						</div>
						<div className="flex flex-col">
							<span className="w-full text-[9px] font-black text-[#808080] leading-[90%]">
								KIRSI BLOG
							</span>
						</div>
					</div>
					<div className="flex w-full items-center flex-wrap">
						<div className="flex w-full gap-2 items-center">
							<span className="text-[#808080] font-black text-[12px] min-w-[45px]">
								KIRSI
							</span>
							<span className="text-[#808080] font-semibold text-[12px] min-w-[45px]">
								kirsi@kirsi.moe
							</span>
						</div>
						<div className="flex w-full gap-2 items-center">
							<span className="text-[#808080] text-[12px] min-w-[45px]">
								©2024
								silvercherry.io
								all rights
								reserved.
							</span>
						</div>
					</div>
					<div className="flex w-full gap-2 items-center">
						<div className="flex gap-[2px]">
							<NginxIcon className="fill-[#808080] w-4 h-4" />
							<span className="text-[#808080] font-bold text-[9px]">
								NginX
							</span>
						</div>
						<div className="flex gap-[2px]">
							<NestIcon className="fill-[#808080] w-4 h-4" />
							<span className="text-[#808080] font-bold text-[9px]">
								Nest.js
							</span>
						</div>
						<div className="flex gap-[2px]">
							<CloudFlareIcon className="fill-[#808080] w-4 h-4" />
							<span className="text-[#808080] font-bold text-[9px]">
								Cloud Flare
							</span>
						</div>
						{/* <div className="flex bg-[#808080] rounded-md px-[8px] py-[3px]">
                            <Link className="flex gap-1 items-center" href="https://portfolio.silvercherry.io/"
                                target="_blank"><LinkIcon
                                className="w-3 h-3 fill-[rgb(233,233,233)] dark:fill-black"/><span
                                className="text-[rgb(233,233,233)] dark:text-black font-black text-[9px] min-w-[45px]">포트폴리오</span></Link>
                        </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Footer;
