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

// update date

type State = {
  firstName: string;
  lastName: string;
};

type UpdateDate = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State & UpdateDate>((set) => ({
  firstName: "",
  lastName: "",
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}));
