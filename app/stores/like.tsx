import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { Like} from "../types";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";


interface LikeStore {
    likesbyPost: Like[]
    
    setLikesByPost: (postId: string) => void
}

export const useLikeStore = create<LikeStore>()(
    devtools(
        persist(
            (set) =>({
                likesbyPost: [],

                setLikesByPost: async (postId: string) =>{
                    const result = await useGetLikesByPostId(postId)
                    set({likesbyPost: result})
                },
            }),
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )

)