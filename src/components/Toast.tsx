'use client';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useState } from 'react';

const Toast = ({
	id,
	message,
	duration,
	onRemove,
	removeFlag,
	type,
}: {
	id: number;
	message: string;
	duration: number;
	onRemove: (id: number) => void;
	removeFlag: boolean;
	type: string;
}) => {
	// time => milisecond //
	const [progress, setProgress] = useState(100);
	const [visible, setVisible] = useState(false);
	const [removing, setRemoving] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isInside, setIsInside] = useState([false]);
	const [isRemoveFlag, setRemoveFlag] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setVisible(true);
		}, 20);
	}, []);

	useEffect(() => {
		if (isRemoveFlag) {
			setRemoving(true);
			setTimeout(() => onRemove(id), 550);
		}
	}, [isRemoveFlag]);

	useEffect(() => {
		setRemoveFlag(removeFlag);
	}, [removeFlag]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isInside[0]) {
				setProgress((prev) => {
					if (prev <= 0) {
						setRemoving(true);
						setTimeout(
							() => onRemove(id),
							550
						);
					}
					return Math.max(
						0,
						prev -
							100 /
								((duration -
									100) /
									100)
					);
				});
			}
		}, 100);

		return () => {
			clearTimeout(interval);
		};
	}, [duration, isInside]);

	const handleMouseMove = (e: {
		currentTarget: { getBoundingClientRect: () => any };
		clientX: number;
		clientY: number;
	}) => {
		const rect = e.currentTarget.getBoundingClientRect(); // div 자체의 위치
		setPosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	const handleMouseEnter = (target: number) => {
		setIsInside((v) =>
			[...v].map((value, index) =>
				index === target ? true : value
			)
		);
	};

	const handleMouseLeave = (target: number) => {
		setIsInside((v) =>
			[...v].map((value, index) =>
				index === target ? false : value
			)
		);
	};

	const infoColor = useCallback(() => {
		if (type === 'info') {
			return {
				bg: 'bg-white bg-opacity-60 text-black',
				line: 'bg-white',
			};
		} else if (type === 'error') {
			return {
				bg: 'bg-red-500 bg-opacity-60 text-white',
				line: 'bg-red-500',
			};
		} else if (type === 'warning') {
			return {
				bg: 'bg-orange-500 bg-opacity-60 text-white',
				line: 'bg-orange-500',
			};
		} else if (type === 'success') {
			return {
				bg: 'bg-green-500 bg-opacity-60 text-white',
				line: 'bg-green-500',
			};
		}
		return {
			bg: 'bg-red-500 bg-opacity-60 text-white',
			line: 'bg-red-500',
		};
	}, []);
	return (
		<div
			className={`relative rounded-[8px] shadow-md overflow-hidden`}
			style={{
				transform: removing
					? 'scale(0)'
					: visible
					? 'scale(1)'
					: 'scale(0)',
				opacity: removing ? 0 : 1,
				height: removing
					? '0px'
					: visible
					? '56px'
					: '0px',
				marginBottom: removing ? '0px' : '12px',
				transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out, height 0.4s ease-in-out, padding 0.5s ease, margin 0.5s ease',
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => {
				handleMouseEnter(0);
			}}
			onMouseLeave={() => {
				handleMouseLeave(0);
			}}
		>
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[10px] z-[1]">
				<div
					className={`absolute flex justify-center items-center w-[160px] h-[100px] rounded-full ${
						infoColor().bg
					}`}
					style={{
						left: `${position.x - 80}px`,
						top: ` ${position.y - 50}px`,
						display: isInside[0]
							? 'flex'
							: 'none',
					}}
				>
					<div
						className={`flex w-[10px] h-[10px] rounded-full ${
							infoColor().line
						}`}
					/>
				</div>
			</div>
			<div
				className={`relative top-0 left-0 w-full h-full pl-12 pr-12 overflow-hidden rounded-[10px] backdrop-blur-[64px] z-[5] flex items-center  ${
					infoColor().bg
				}`}
			>
				<ExclamationTriangleIcon className="absolute left-4 top-[18px] w-[22px] h-[22px]" />
				<span className="break-all text-[16px] flex-1 select-none line-clamp-2 text-ellipsis">
					{message}
				</span>
				<XMarkIcon
					className="absolute right-4 top-4 w-[22px] h-[22px] hover:cursor-pointer"
					onClick={() => {
						setRemoveFlag(true);
					}}
				/>
				<div
					className={`progress absolute bottom-0 left-0 h-[4px] ${
						infoColor().line
					}`}
					style={{
						width: `${progress}%`,
						transition: 'width 0.15s linear',
					}}
				></div>
			</div>
		</div>
	);
};

export default Toast;
