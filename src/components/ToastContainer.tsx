'use client';
import { IToast } from '@/interface/toastInterface';
import { useCallback, useEffect, useState } from 'react';
import Toast from './Toast';
import useToastStore from '@/store/toast.store';

const ToastContainer = () => {
	const [toasts, setToasts] = useState<IToast[]>([]);
	const { toast } = useToastStore();

	useEffect(() => {
		if (toast !== null) {
			addToast(toast.message, toast.duration, toast.type);
		}
	}, [toast]);

	const addToast = useCallback(
		(message: string, duration: number, type: string) => {
			const id = Date.now();
			setToasts((prevToasts) => {
				const updatedToasts = [
					...prevToasts,
					{ id, message, duration, type },
				];
				return updatedToasts;
			});
		},
		[]
	);

	const removeToast = useCallback((id: number) => {
		setToasts((prevToasts) =>
			prevToasts.filter((toast) => toast.id !== id)
		);
	}, []);

	return (
		// lg:translate-x-[-50%]
		<div className="absolute bottom-0 lg:bottom-4 max-w-full px-4 lg:px-0 z-[1000] w-full lg:w-auto lg:max-w-[550px] lg:right-6 lg:items-end flex flex-col max-h-[220px]">
			{toasts.map((toast, index) => (
				<Toast
					key={toast.id}
					id={toast.id}
					message={toast.message}
					duration={toast.duration}
					onRemove={removeToast}
					removeFlag={
						toasts.length > 3 &&
						toasts.length - 3 > index
							? true
							: false
					}
					type={toast.type}
				/>
			))}
		</div>
	);
};

export default ToastContainer;
