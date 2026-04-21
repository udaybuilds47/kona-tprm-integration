"use client";

import { create } from "zustand";

type NotificationState = {
  unread: number;
  markAllRead: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  unread: 3,
  markAllRead: () => set({ unread: 0 }),
}));
