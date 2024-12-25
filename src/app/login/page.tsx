'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useToastStore from '@/store/toast.store';

const checkValidEmail = async (email: string) => {
	const res = await fetch(`/auth/email-check`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: email }),
		credentials: 'include',
	});
	return res.json();
};

const sendEmail = async (email: string) => {
	const res = await fetch(`/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: email }),
		credentials: 'include',
	});
	return res.json();
};

const tryLogin = async (email: string, code: string) => {
	const res = await fetch(`/auth/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, code }),
		credentials: 'include',
	});
	return res.json();
};

const LoginView = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isInside, setIsInside] = useState([false]);
	const [codeVisible, setCodeVisible] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [values, setValues] = useState(new Array(8).fill(''));
	const [email, setEmail] = useState('');
	const { newToast } = useToastStore();
	const router = useRouter();
	const koreanToEnglishMap: any = {
		ㅂ: 'q',
		ㅈ: 'w',
		ㄷ: 'e',
		ㄱ: 'r',
		ㅅ: 't',
		ㅛ: 'y',
		ㅕ: 'u',
		ㅑ: 'i',
		ㅐ: 'o',
		ㅔ: 'p',
		ㅁ: 'a',
		ㄴ: 's',
		ㅇ: 'd',
		ㄹ: 'f',
		ㅎ: 'g',
		ㅗ: 'h',
		ㅓ: 'j',
		ㅏ: 'k',
		ㅣ: 'l',
		ㅋ: 'z',
		ㅌ: 'x',
		ㅊ: 'c',
		ㅍ: 'v',
		ㅠ: 'b',
		ㅜ: 'n',
		ㅡ: 'm',
	};

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

	const handlePaste = (e: {
		preventDefault: () => void;
		clipboardData: { getData: (arg0: string) => string };
	}) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData('Text').toUpperCase();

		const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
		if (regex.test(pasteData)) {
			const newValues = pasteData.replace('-', '').split('');
			setValues(newValues);
			document.getElementById('input-7')?.focus();
		}
	};

	const handleChange = (e: { target: { value: any } }, index: number) => {
		const { value } = e.target;
		let uvalue = value;
		if (koreanToEnglishMap[value]) {
			uvalue = koreanToEnglishMap[value];
		}
		if (/^[a-zA-Z0-9]*$/.test(uvalue)) {
			uvalue = uvalue.toUpperCase();
			const newValues = [...values];
			newValues[index] = uvalue.slice(-1);
			setValues(newValues);

			if (uvalue && index < 7) {
				document.getElementById(
					`input-${index + 1}`
				)?.focus();
			}
		}
	};

	const handleKeyDown = (e: { key: string }, index: number) => {
		if (e.key === 'Backspace' && !values[index] && index > 0) {
			document.getElementById(`input-${index - 1}`)?.focus();
		}
	};

	const handleProgressEmailCheck = async () => {
		if (email === '') {
			newToast({
				message: '이메일은 비워둘 수 없습니다.',
				duration: 5000,
				type: 'error',
			});
			return 0;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newToast({
				message: '이메일 형식이 올바르지 않습니다.',
				duration: 5000,
				type: 'error',
			});
			return 0;
		}
		const validCheck = await checkValidEmail(email);
		if (validCheck.code === 200) {
			setCodeVisible((value) => !value);
			await sendEmail(email);
			newToast({
				message: '인증 이메일이 발송되었습니다 메일을 확인해주세요.',
				duration: 5000,
				type: 'success',
			});
		} else {
			newToast({
				message: '이메일 주소가 등록되지 않았습니다.',
				duration: 5000,
				type: 'error',
			});
		}
	};

	const handleUpdateEmail = (e: any) => {
		setEmail(e.target.value);
	};

	const handleTryLogin = async () => {
		const code = values.join('');
		const validCheck = await tryLogin(
			email,
			`${code.slice(0, 4)}-${code.slice(4, 8)}`
		);
		if (validCheck.code === 200) {
			router.push('/');
		} else {
			newToast({
				message: '인증에 실패하였습니다 코드를 확인해주세요.',
				duration: 5000,
				type: 'error',
			});
		}
	};

	return (
		<div
			className="blg-page"
			style={{ minHeight: '100%', alignContent: 'center' }}
		>
			<div
				className="blg-page-content-area"
				style={{ minHeight: '100%', paddingTop: 0 }}
			>
				<div className="flex flex-col items-center justify-start gap-6 w-full h-[500px] relative">
					<h1 className="font-bold text-2xl w-full lg:w-[560px]">
						LOGIN
					</h1>
					<div className="flex flex-col items-center w-full relative">
						<div className="absolute top-0 w-full lg:w-[560px] h-full overflow-hidden rounded-[10px]">
							<div
								className={`absolute flex justify-center items-center w-[320px] h-[180px] rounded-full ${
									!codeVisible
										? 'bg-[#bb004a]/50'
										: 'bg-[rgba(218,174,81,0.5)]'
								}`}
								style={{
									left: `${
										position.x -
										160
									}px`,
									top: `${
										position.y -
										90
									}px`,
									display: isInside[0]
										? 'flex'
										: 'none',
								}}
							>
								<div
									className={`flex w-[55px] h-[44px] rounded-full ${
										!codeVisible
											? 'bg-[#bb004a]'
											: 'bg-[rgba(218,174,81,1)]'
									}`}
								/>
							</div>
						</div>
						<div
							className="flex w-full lg:w-[560px] max-h-[500px] rounded-[10px] flex-col overflow-hidden backdrop-blur-[64px]"
							style={{
								border: '0px solid #fff',
								// background: 'linear-gradient(90deg, rgb(239, 68, 68) 0%, rgb(218, 174, 81) 100%)',
								transition: 'background 0.4s ease, box-shadow 0.4s ease, height 3s ease',
								background: codeVisible
									? 'rgba(218, 174, 81, 0.6)'
									: 'rgba(187, 0, 74, 0.6)',
							}}
						>
							<div
								className="flex p-6 flex-col gap-1"
								onMouseMove={
									handleMouseMove
								}
								onMouseEnter={() => {
									handleMouseEnter(
										0
									);
								}}
								onMouseLeave={() => {
									handleMouseLeave(
										0
									);
								}}
								onPaste={
									handlePaste
								}
							>
								<span className="font-semibold text-white">
									EMAIL
								</span>
								<input
									// contentEditable={
									// 	codeVisible
									// 		? false
									// 		: true
									// }
									onChange={
										handleUpdateEmail
									}
									value={
										email
									}
									className={
										codeVisible
											? 'blg-login-input-div-disable'
											: 'blg-login-input-div-enable'
									}
									style={{
										transition: 'background 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease',
									}}
								/>
								<div
									className={`flex flex-wrap justify-center items-center content-center gap-[5px] lg:gap-[10px] overflow-hidden ${
										codeVisible
											? 'h-[108px] opacity-100'
											: 'h-0 opacity-0'
									}`}
									style={{
										transition: codeVisible
											? 'height 0.4s ease, opacity 0.8s ease'
											: 'height 0.6s ease, opacity 0.4s ease',
									}}
								>
									<span className="font-semibold w-full">
										Verification
										Code
									</span>
									{values.map(
										(
											value,
											index
										) => (
											<React.Fragment
												key={
													index
												}
											>
												{index ===
													4 && (
													<span className="text-[32px] lg:text-[38px]">
														-
													</span>
												)}{' '}
												<input
													key={
														index
													}
													id={`input-${index}`}
													style={{
														transition: 'background 0.4s ease, box-shadow 0.4s ease',
													}}
													type="text"
													maxLength={
														1
													}
													value={
														value
													}
													onChange={(
														e
													) =>
														handleChange(
															e,
															index
														)
													}
													onKeyDown={(
														e
													) =>
														handleKeyDown(
															e,
															index
														)
													}
													className="verification-input w-[32px] h-[46px] text-[18px] lg:w-[42px] lg:h-[55px] lg:text-[24px] focus:shadow-[0_0_10px_1px_rgba(255,255,255,0.8)]"
												/>
											</React.Fragment>
										)
									)}
								</div>
							</div>
							{/* <div
								style={{
									width: '100%',
									height: '6px',
									background: 'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
									margin: '0 auto',
								}}
							/> */}
						</div>
					</div>
					<button
						onClick={
							codeVisible
								? handleTryLogin
								: handleProgressEmailCheck
						}
						className="w-full lg:w-[560px] p-[10px] rounded-[12px] text-[16px] font-bold bg-black dark:bg-white text-white dark:text-black dark:hover:text-white hover:bg-[#bb004a] dark:hover:bg-[#bb004a]"
						style={{
							transition: 'background 0.4s ease, box-shadow 0.4s ease',
						}}
					>
						로그인
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginView;
