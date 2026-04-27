import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPostsUserById } from "../api/posts";
import PostCard from "./PostCard";
import { usePostStore } from "../store/usePostStore";
import { useLoading } from "../hooks/useLoading";

export default function UserInfo() {
  const { user } = useAuth();
  const { userPosts, setUserPosts } = usePostStore();
  const { setIsLoading } = useLoading();
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await getPostsUserById(user?._id);
        setUserPosts(res);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [user?._id, setUserPosts]);


  return (
    <div className="relative">
      <div className="sticky top-16 z-40 flex items-center w-[95%] mt-3 mx-auto gap-5 p-5 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-md shadow-[0_0px_20px_#291f3f]">
        <img
          src={user?.image}
          alt="User Image"
          className="w-24 h-24 object-cover rounded-full border-2 border-primary"
        />
        <div className="text-white">
          <h2 className="font-bold text-lg">Email: {user?.email}</h2>
          <p className="text-stone-300">Name: {user?.name}</p>
          <p className="text-stone-400 text-sm">Posts: {userPosts.length}</p>
        </div>
      </div>
      <div className="mt-8 px-3">
        {userPosts?.length > 0 ? (
          userPosts.map((p) => <PostCard key={p._id} post={p} />)
        ) : (
          <p className="text-center text-gray-500">No posts found...</p>
        )}
      </div>
    </div>
  );
}
