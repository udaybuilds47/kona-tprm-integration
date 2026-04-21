"use client";

import { create } from "zustand";
import type { LicensedVertical, Role } from "@/lib/types";

type AuthState = {
  role: Role;
  vertical: LicensedVertical;
  setRole: (role: Role) => void;
  setVertical: (vertical: LicensedVertical) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: "Risk Administrator",
  vertical: "general",
  setRole: (role) => set({ role }),
  setVertical: (vertical) => set({ vertical }),
}));
