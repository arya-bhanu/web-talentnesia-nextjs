import { create } from 'zustand';

export interface IStatusModalStore {
  isModalActive: boolean;
  setIsModalActive: (isActive: boolean) => void;
  modalMessage?: string;
  status: 'error' | 'success';
  action?: 'update' | 'create' | 'delete';
  openModal: (params: {
    status: 'error' | 'success';
    action?: 'update' | 'create' | 'delete';
    message?: string;
    timeOut?: number;
  }) => void;
  closeModal: () => void;
}

export const useStatusModalStore = create<IStatusModalStore>((set) => ({
  status: 'success',
  isModalActive: false,
  setIsModalActive: (isActive) => set({ isModalActive: isActive }),
  closeModal: () => set({ isModalActive: false }),
  modalMessage: '',
  openModal: (params) => {
    if (params.status !== 'error' || params.timeOut) {
      setTimeout(() => {
        set(() => {
          return {
            isModalActive: false,
          };
        });
      }, params.timeOut || 1500);
    }
    set(() => {
      return {
        isModalActive: true,
        modalMessage: params.message,
        action: params.action,
        status: params.status,
      };
    });
  },
}));
