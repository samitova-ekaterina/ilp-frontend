import { create } from 'zustand';

export type ToastMessage =
  | 'errors.network'
  | 'errors.server'
  | 'errors.unexpected'
  | 'errors.forbidden.text'
  | 'errors.notFound.text';

export type Toast = {
  id: string;
  message: ToastMessage;
  requestId?: string;
};

type ToastState = {
  toasts: Toast[];
  show: (message: ToastMessage, requestId?: string) => void;
  dismiss: (id: string) => void;
};

export const useToasts = create<ToastState>()((set) => ({
  toasts: [],
  show: (message, requestId) =>
    set((state) =>
      state.toasts.some((toast) => toast.message === message)
        ? state
        : { toasts: [...state.toasts, { id: crypto.randomUUID(), message, requestId }] },
    ),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
