import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Input from "./Input";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "./Post";


export default function Feed({ posts }) {
const [realtimePosts, setRealtimePosts] = useState([]);
const [handlePost, setHandlePost] = useRecoilState(handlePostState);
const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

   useEffect(() => {
     const fetchPosts = async () => {
     	const response = await fetch("/api/posts", {
     		method: "GET",
     		headers: {  "Content-Type": "application/json" }
     	});
     	const responseData = await response.json();
     	
     	setRealtimePosts(responseData);
     	setHandlePost(false);
     	setUseSSRPosts(false);
     };
     console.log(realtimePosts);
   }, [handlePost])

	return (
		<div className="space-y-6 pb-24 max-w-lg">
			 <Input />
			{/*posts*/}
               {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	)
}