import PostCard from "../components/PostCard";
import type { Post } from "../types";
import { getPostById } from "../api/posts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostStore } from "../store/usePostStore";
import { useLoading } from "../hooks/useLoading";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { post, setPost } = usePostStore();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      if (id) {
        try {
          const res = await getPostById(id);
          setPost(res);
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Failed to fetch post";
          toast.error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPost();
  }, [id, setPost, setIsLoading]);

  
  return (
    <>
      {post ? <PostCard post={post} /> : <p className="mx-auto w-fit text-red-500 text-2xl pt-14">Post not found</p>}
    </>
  );
}
