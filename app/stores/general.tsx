import { create } from "zustand";
import { RandomUsers } from "../types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import useGetRandomUsers from "../hooks/useGetRandomUsers";

interface GeneralStore {
    isLoginOpen: boolean,
    isEditProfileOpen: boolean,
    randomUsers: RandomUsers[],
    setisLoginOpen: (val: boolean) => void,
    setisEditProfileOpen: (val: boolean) => void,
    setRandomUsers: () => void   
}

export const useGeneralStore = create<GeneralStore>()(
    devtools(
        persist(
            (set) =>({
                isLoginOpen: false,
                isEditProfileOpen: false,
                randomUsers: [],

                setisLoginOpen: (val: boolean) => set({isLoginOpen: val}),
                setisEditProfileOpen: (val: boolean) => set({isEditProfileOpen: val}),
                setRandomUsers: async () => {
                    const result = await useGetRandomUsers()
                    set({randomUsers: result})
                } 
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )

)