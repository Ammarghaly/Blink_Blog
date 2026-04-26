import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPostsById } from "../api/posts";
import PostCard from "./PostCard";

export default function UserInfo() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);


  useEffect(()=>{
    const getData= async ()=>{
        const res = await getPostsById(user?._id)
         setUserPosts(res.data)
    }
    getData()
  },[])


  return (
    <>
      <div className="flex items-center w-100 mt-3 ml-3 gap-5 p-3 rounded-2xl bg-[#0a0a0a]  shadow-[0_0px_20px_#291f3f]">
        <img
          src={user?.image}
          alt="User Image"
          className="w-30 h-30 rounded-full border-2 border-primary"
        />
        <div>
          <h2 className="font-bold">{user?.email}</h2>
          <p className="font-normal text-stone-300">{user?.name}</p>
        </div>
      </div>
      {userPosts.map((p)=>(<PostCard post={p}/>))}
    </>
  );
}
