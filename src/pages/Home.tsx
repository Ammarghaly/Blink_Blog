import { useEffect } from "react";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import { usePostStore } from "../store/usePostStore";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
 const { posts, setPosts } = usePostStore();

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
    </>
  );
}
