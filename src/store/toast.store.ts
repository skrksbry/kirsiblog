import { create } from 'zustand';

interface ToastStore {
	toast: { message: string; duration: number; type: string } | null;
	newToast: (toast: {
		message: string;
		duration: number;
		type: string;
	}) => void;
}
const useToastStore = create<ToastStore>((set) => ({
	toast: null,
	newToast: (toast) => set({ toast }),
}));

export default useToastStore;
