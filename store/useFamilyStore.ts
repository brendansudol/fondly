import { create } from "zustand"

interface FamilyState {
  familyId?: string // undefined until discovered
  setFamilyId: (id: string) => void
}

export const useFamilyStore = create<FamilyState>((set) => ({
  familyId: undefined,
  setFamilyId: (id) => set({ familyId: id }),
}))
