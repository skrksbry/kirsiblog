import { create } from 'zustand';

interface UserStore {
	login: boolean;
	user: any | null;
	logoutUser: () => void;
	loginUser: (value: { login: boolean; user: any }) => void;
}
const useUserStore = create<UserStore>((set) => ({
	login: false,
	user: null,
	logoutUser: () => set({ login: false, user: null }),
	loginUser: (value: { login: boolean; user: any }) =>
		set({ login: true, user: value.user }),
}));

export default useUserStore;
