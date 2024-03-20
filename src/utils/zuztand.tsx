import { create } from "zustand";

type FolderStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useFolder = create<FolderStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});

type Action = {
  lastName: string;
  updateLastName: (lastName: string) => void;
};

export const useTeacherId = create<Action>((set) => ({
  lastName: "",
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}));
