"use client";

import React, { useState } from "react";
import {
  Comment,
  Like,
  PostMainCompTypes,
  PostMainLikesCompTypes,
} from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaCommentDots, FaShare } from "react-icons/fa";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const likeOrOnlike = () => {
    console.log("likeOrOnlike");
  };

  const router = useRouter();
  return (
    <>
      <div id={`PostMain-${post.id}`} className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-4 text-center">
            <button
              className="rounded-full bg-gray-200 p-2 cursor-pointer"
              disabled={hasClickedLike}
              onClick={() => likeOrOnlike()}
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLiked ? "#ff2626" : ""}
                  size="25"
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size="25" />
              )}
            </button>
            <span className="text-xs text-gray-800 font-semibold">
              {likes?.length}
            </span>
          </div>
          <button
            className="pb-4 text-center"
            onClick={() =>
              router.push(`/post/${post?.id}/${post?.profile?.user_id}`)
            }
          >
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaCommentDots size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
              {comments.length}
            </span>
          </button>
          <button
            className="text-center">
            <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <FaShare size="25" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">
                55
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
