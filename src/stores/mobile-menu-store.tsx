import { create } from 'zustand';

type MobilItemActiveState = {
  activeItem: string;
};
type MobilItemActiveStateAction = {
  updateActiveItem: (activeItem: string) => void;
};

export const useMobileMenuStore = create<MobilItemActiveState & MobilItemActiveStateAction>(
  (set) => ({
    activeItem: 'Overview',
    updateActiveItem: (activeItem) => set(() => ({ activeItem: activeItem })),
  })
);
