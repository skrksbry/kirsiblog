'use client';
import useToastStore from '@/store/toast.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ErrorHandlerRedirect = ({
	err = false,
	message = '',
	redirect = '/',
}: {
	err?: boolean;
	message?: string;
	redirect?: string;
}) => {
	const router = useRouter();
	const { newToast } = useToastStore();
	useEffect(() => {
		if (err) {
			newToast({ message, duration: 5000, type: 'error' });
			//router.replace(redirect);
		}
	}, []);
	return <></>;
};

export default ErrorHandlerRedirect;
