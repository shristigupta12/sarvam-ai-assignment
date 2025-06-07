import { create } from 'zustand';

interface UIState {
  isFunctionModalOpen: boolean;
  functionNodePendingPosition: { x: number; y: number } | null;
  openFunctionModal: (position: { x: number; y: number }) => void;
  closeFunctionModal: () => void;
  
  isSettingsPanelOpen: boolean;
  toggleSettingsPanel: () => void;
  openSettingsPanel: () => void;
  closeSettingsPanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFunctionModalOpen: false,
  functionNodePendingPosition: null,
  isSettingsPanelOpen: false,

  openFunctionModal: (position) => set({ isFunctionModalOpen: true, functionNodePendingPosition: position }),
  closeFunctionModal: () => set({ isFunctionModalOpen: false, functionNodePendingPosition: null }),

  toggleSettingsPanel: () => set((state) => ({ isSettingsPanelOpen: !state.isSettingsPanelOpen })),
  openSettingsPanel: () => set({ isSettingsPanelOpen: true }),
  closeSettingsPanel: () => set({ isSettingsPanelOpen: false }),
})); 