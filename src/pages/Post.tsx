import PostCard from "../components/PostCard";
import type { Post } from "../types";
import { getPostById } from "../api/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast/headless";
import { usePostStore } from "../store/usePostStore";
import { useLoading } from "../hooks/useLoading";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { post, setPost } = usePostStore();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const res = await getPostById(id);
          setPost(res);
        } catch {
          toast.error("Failed to fetch post");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPost();
  }, [id, setPost, setIsLoading]);

  if (!post) return <p className="mx-auto w-fit text-red-500 text-2xl pt-14">Post not found</p>;

  return (
    <div>
      <PostCard post={post} />
    </div>
  );
}
