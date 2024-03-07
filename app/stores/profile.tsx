import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetRandomUsers from "../hooks/useGetRandomUsers";
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import { Profile } from "../types";

interface ProfileStore {
    currentProfile: Profile | null
    setCurrentProfile: (userId: string) => void
}

export const useProfileStore = create<ProfileStore>()(
    devtools(
        persist(
            (set) =>({
                currentProfile: null,
               

                setCurrentProfile: async (userId: string) => {
                    const result = await useGetProfileByUserId(userId)
                    set({currentProfile: result})
                }
               
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )

)