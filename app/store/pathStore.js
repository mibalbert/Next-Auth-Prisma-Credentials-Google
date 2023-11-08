/**
 *  pathStore.js
 */

import { create } from 'zustand'

export const useRefreshStore = create((set) => ({
  refresh: false,
  changeRefresh: () => set((state) => ({ refresh: !state.refresh }))
}))


export const usePathStore = create((set) => ({
  paths: [],
  pushPath: (path) => set((state) => ({ paths: [...state.paths, path].slice(-5) })),
}));
