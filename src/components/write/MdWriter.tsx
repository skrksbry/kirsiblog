'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ColorBlock from '../common/ColorBlock';
import useToastStore from '@/store/toast.store';

const MDWriter = () => {
	const [content, setContent] = useState<any>('');
	const [title, setTitle] = useState<string>('');
	const [color, setColor] = useState<string>('');
	const [imageFileName, setImageFileName] = useState<string>('');
	const [uploadFile, setUploadFile] = useState<File | null>(null);
	const router = useRouter();
	const { newToast } = useToastStore();

	const colorChnage = (color: string) => {
		setColor(color);
	};
	const getSessionCookie = (name: string) => {
		const value = `; ${document.cookie}`;
		const part = value.split(`; ${name}=`);
		if (part.length === 2) return part.pop()?.split(';').shift();
		return null;
	};
	const submitMdPost = () => {
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/markdown-posts/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				post_name: title,
				post_image: `https://r2.silvercherry.io/${imageFileName}`,
				post_category: '',
				post_hidden: true,
				post_description: '',
				post_date: new Date(),
				post_color: color,
				post_content: content,
			}),
		}).then(async (res) => {
			const postData = await res.json();
			router.push(`/mdview/${postData.post_call_id}`);
		});
	};

	const imageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setUploadFile(e.target.files[0]);
		}
	};
	const imageRemove = () => {
		setUploadFile(null);
	};
	const imageUpload = () => {
		if (!uploadFile) {
			newToast({
				message: '업로드 실패',
				duration: 5000,
				type: 'error',
			});
			return;
		}

		const formData = new FormData();
		formData.append('image', uploadFile);
		imageRemove();
		try {
			fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload/`,
				{
					method: 'POST',
					body: formData,
					credentials: 'include',
				}
			)
				.then((res) => res.json())
				.then((json) => {
					navigator.clipboard.writeText(
						`![image](${json.location})`
					);
					newToast({
						message: '이미지 업로드를 완료하였습니다 markdown 문법을 붙혀넣어 사용하세요.',
						duration: 5000,
						type: 'success',
					});
				});
		} catch (e) {
			newToast({
				message: '업로드 실패',
				duration: 5000,
				type: 'error',
			});
		}
	};
	return (
		<>
			<input
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				value={title}
				className="w-full text-3xl bg-transparent outline-none mb-2"
				placeholder="제목을 입력해주세요"
			></input>
			<ColorBlock
				color="linear-gradient(90deg, #d53369 0%, #daae51 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient(90deg, #bdc2e8 0%, #e6dee9 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient(to right, #74ebd5, #acb6e5)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient( to right, #dd4e4e 10%, #dd4e4e 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient(90deg, #111111 0%, #333333 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<ColorBlock
				color="linear-gradient(90deg, #bb004a 0%, #bb004a 100%)"
				onClick={colorChnage}
				nowColor={color}
			/>
			<div className="w-full flex mb-6">
				<div className="flex flex-wrap flex-col flex-1">
					<input
						onChange={(e) => {
							setImageFileName(
								e.target.value
							);
						}}
						value={imageFileName}
						className="w-full text-xl bg-transparent outline-none mb-2"
						placeholder="이미지 파일명 입력"
					></input>
				</div>
				<div className="flex flex-wrap flex-1">
					{!uploadFile ? (
						<input
							type="file"
							onChange={imageOnChange}
							className="w-full text-md bg-transparent outline-none mb-2"
						/>
					) : (
						<span className="w-full text-md">
							{uploadFile.name}
						</span>
					)}
					<button
						className="w-26 p-2 h-9 text-[12px] font-bold bg-black dark:bg-white rounded-[10px] text-white dark:text-black mr-2"
						onClick={imageUpload}
					>
						UPLOAD
					</button>
					{uploadFile && (
						<button
							className="w-26 p-2 h-9 text-[12px] font-bold bg-red-600 rounded-[10px]"
							onClick={imageRemove}
						>
							REMOVE
						</button>
					)}
				</div>
			</div>

			<MDEditor
				value={content}
				onChange={setContent}
				style={{ width: '100%' }}
				height={600}
			/>
			<button
				onClick={submitMdPost}
				className="w-full h-12 font-bold bg-black dark:bg-white rounded-[10px] mt-6 text-white dark:text-black"
			>
				POST
			</button>
		</>
	);
};

export default MDWriter;
