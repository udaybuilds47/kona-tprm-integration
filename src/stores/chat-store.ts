"use client";

import { create } from "zustand";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

type ChatState = {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clear: () => set({ messages: [] }),
}));
