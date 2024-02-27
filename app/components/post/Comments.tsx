import { CommentsCompTypes } from "@/app/types";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function Comments({ params }: CommentsCompTypes) {
  const [comment, setComment] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const commentsByPost = [
    {
      id: "123",
      user_id: "456",
      post_id: "987",
      text: "This is some text",
      created_at: "date here",
      profile: {
        user_id: "456",
        name: "User 1",
        image: "https://placehold.co/100",
      },
    },
  ];

  const addComment = () => {
    console.log('addComment')
  }

  return (
    <>
      <div
        id="Comments"
        className="relative bg-[#f8f8f8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto "
      >
        <div className="pt-2" />

        <ClientOnly>
          {commentsByPost.length < 1 ? (
            <div className="text-center mt-6 text-xl text-gray-500">
              No comments...
            </div>
          ) : (
            <div>
              {commentsByPost.map((comment, index) => (
                <SingleComment key={index} comment={comment} params={params} />
              ))}
            </div>
          )}
        </ClientOnly>
        <div className="mb-28" />

        <div
          id="CreateComment"
          className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
        >
          <div
            className={`bg-[$f1f1f2] flex items-center rounded-lg w-full lg:max-w-[420px] ${
              inputFocused
                ? "border-2 border-gray-400"
                : "border-2 border-[#f1f1f2]"
            }`}
          >
            <input
              className="bg-[#f1f1f2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg "
              type="text"
              placeholder="Add comment..."
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setComment(e.target.value)}
              value={comment || ""}
            />
          </div>
          {!isUploading ? (
            <button
              disabled={!comment}
              onClick={() => addComment()}
              className={`font-semibold text-sm ml-5 pr-1 ${comment ? 'text-[#f02c56] cursor-pointer': 'text-gray-400'}`}
            >
              Post
            </button>
          ): (
            <BiLoaderCircle className="animate-spin" color="#e91e62" size={28}/>
          )}
        </div>
      </div>
    </>
  );
}
