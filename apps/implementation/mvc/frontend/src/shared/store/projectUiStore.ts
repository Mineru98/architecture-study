import { create } from "zustand";

type ProjectUiStore = {
  activeView: "overview" | "notes";
  setActiveView: (activeView: "overview" | "notes") => void;
};

export const useProjectUiStore = create<ProjectUiStore>((set) => ({
  activeView: "overview",
  setActiveView: (activeView) => set({ activeView }),
}));
