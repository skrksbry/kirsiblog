'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Star {
	id: number;
	x: number;
	y: number;
	size: number;
	distanceFactor: number;
	color: string;
	opacity: number;
	animationDuration: number;
}

const BackdropPoint = ({ path, ua }: { path: string; ua: string }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener(
				'mousemove',
				handleMouseMove
			);
		};
	}, []);

	useEffect(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		setStars(generateStars(width, height));
	}, []);

	const generateStars = (width: number, height: number): Star[] => {
		const baseCount = 200;
		let count = Math.round(
			((width * height) / (1920 * 1080)) * baseCount
		);
		count = Math.max(count, 50);
		const stars: Star[] = [];

		for (let i = 0; i < count; i++) {
			const size = Math.random() * 5 + 1;
			const distanceFactor = size / 26;
			const x = Math.random() * width;
			const y = Math.random() * height;
			const color =
				Math.random() > 0.65 ? '#ffffff' : '#bb004a';
			const opacity = Math.random() * 0.5 + 0.6;
			const animationDuration = Math.random() * 3 + 2;
			stars.push({
				id: i,
				x,
				y,
				size,
				distanceFactor,
				color,
				opacity,
				animationDuration,
			});
		}

		return stars;
	};
	return (
		<div className={`absolute w-full h-full overflow-hidden`}>
			{stars.map((star) => {
				const offsetX =
					(mousePos.x - window.innerWidth / 2) *
					star.distanceFactor;
				const offsetY =
					(mousePos.y - window.innerHeight / 2) *
					star.distanceFactor;

				return (
					<div
						key={star.id}
						className={`transition-all md:transition-none ${
							star.color === '#ffffff'
								? 'bg-[#000] dark:bg-[#fff]'
								: ' bg-[#bb004a]'
						}`}
						style={{
							position: 'absolute',
							top:
								star.y +
								offsetY -
								star.size / 2,
							left:
								star.x +
								offsetX -
								star.size / 2,
							width: star.size,
							height: star.size,
							borderRadius: '50%',
							opacity: star.opacity,
							pointerEvents: 'none',
							animation: `twinkle ${star.animationDuration}s infinite`,
						}}
					></div>
				);
			})}

			<div className="relative w-full h-full px-3 lg:px-0 lg:w-auto flex-wrap flex items-center content-center backdrop-blur-[2px] justify-center z-20">
				<div className="relative flex h-[374px] w-[330px] lg:h-[468px] lg:w-[412px] z-[0] -mb-28 lg:-mb-0 lg:-mr-10">
					<Image
						fill
						src="https://r2.silvercherry.io/kirsi_error.webp"
						alt="404 not found"
						className="select-none drag-none pointer-events-none"
					/>
				</div>
				<div className="relative flex flex-col justify-center items-center content-center z-[2] w-full lg:max-w-[380px]">
					<div className="flex flex-col lg:items-center">
						{/* <ExclamationTriangleIcon className="w-10 lg:w-20" /> */}
						<span className="flex font-extrabold justify-start items-center w-full text-[42px] lg:text-[48px] leading-none text-[#bb004a] [text-shadow:_0_0_5px_rgb(187_0_74_/_100%)] select-none -mb-2 lg:-mb-4">
							NOT
							<br />
							FOUND
						</span>
						<span className="flex font-extrabold justify-center items-center w-full text-[140px] lg:text-[180px] text-[#bb004a] leading-none select-none animate-randomBlink">
							404
						</span>
					</div>
					<div className="flex flex-1 pb-3 ">
						<div
							className="flex flex-1 whitespace-normal break-all text-sm flex-wrap bg-gray-400/80 text-white dark:text-black rounded-md p-0.5 px-2"
							style={{
								fontFamily: 'MonoplexKR-Regular',
							}}
						>
							<span className="line-clamp-3">
								Path : {path}
							</span>{' '}
							<span className="line-clamp-3">
								UA&nbsp;&nbsp; :{' '}
								{ua}
							</span>{' '}
						</div>
					</div>
					<a
						href={'/'}
						className="flex justify-center w-full"
					>
						<div className="rounded-md bg-[#bb004a] w-full text-white items-center dark:bg-[#bb004a] dark:text-white px-3 py-3 mt-4 text-sm transition-all hover:scale-105">
							메인으로 돌아가기
						</div>
					</a>
				</div>
			</div>
			<style jsx>{`
				@keyframes twinkle {
					0%,
					100% {
						opacity: 0.2;
					}
					50% {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default BackdropPoint;
