import React from 'react';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import { useRecoilState } from 'recoil';

export default function Form() {
const { data: session } = useSession();
const [input, setInput] = useState("");
const [photoUrl, setPhotoUrl] = useState("");
const [modalOpen, setModalOpen] = useRecoilState(modalState);
const [handlePost, setHandlePost] = useRecoilState(handlePostState);

 const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
          'Accept': 'application/json',
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    setHandlePost(true);
    setModalOpen(false);
  };

	return (
		<form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75" >
			<textarea 
			className="bg-transparent focus:outline-none dark:placeholder-white/75" 
			rows="4" 
			placeholder="what do you want to talk about?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
			  />

			  <input 
			  className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
			  type="text"  
              placeholder="Add a photo URL (optional)"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
			  />
         

           <button className="absolute bottom-0 right-0 bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 
            disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1 font-medium"
              disabled={!input.trim() && !photoUrl.trim()}
              type="submit"
              onClick={uploadPost}
               >
               Post
           </button>
		</form>
	)
}