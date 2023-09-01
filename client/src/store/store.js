// store.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth: {
    username: '',
    active: false,
  },
  setUserName: (value) => set((state) => ({ auth: { ...state.auth, username: value } })),
}));
