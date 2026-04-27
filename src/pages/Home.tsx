import { useEffect } from "react";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import { usePostStore } from "../store/usePostStore";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { posts, setPosts } = usePostStore();
  const { user }=useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data;
          const errorMessage = errorData?.message || errorData?.error;
          toast.error(errorMessage);
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {!!user && (
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full text-white flex items-center justify-center bg-black fixed bottom-10 shadow-[0_0_10px_var(--color-primary)] right-10 cursor-pointer hover:bg-gray-800 transition border border-gray-700">
          <Link
            to={"/addPost"}
            className="font-bold text-2xl sm:text-3xl md:text-4xl"
          >
            +
          </Link>
        </div>
      )}
    </>
  );
}
