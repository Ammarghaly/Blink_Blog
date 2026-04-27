import { useState } from "react";
import { type Post } from "../types";
import { Heart, MessageCircle, Share2,Pencil , Trash2 } from "lucide-react";
import { usePostStore } from "../store/usePostStore";
import { toggleLikeRequest, addCommentRequest, deletePostRequest } from "../api/posts";
import { useAuth } from "../hooks/useAuth";
import { useAuthModal } from "../hooks/useAuthModal";
import { timeAgo } from "../utils/timeAgo";
import toast from "react-hot-toast";

export default function PostCard({ post }: { post: Post }) {
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleLikeLocal, addCommentLocal, deletePostLocal } = usePostStore();
  const { user } = useAuth();
  const { open } = useAuthModal();
  const isLiked = user ? post.likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!user) {
      open();
      return;
    }
    const userId = user._id;
    toggleLikeLocal(post._id, userId);
    try {
      await toggleLikeRequest(post._id);
    } catch {
      toggleLikeLocal(post._id, userId);
    }
  };

  const copyLinkPost = async (id: string) => {
    const postUrl = `https://blink-blog-coral.vercel.app/posts/${id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };
  const words = post.content.split(" ");
  const isLongText = words.length > 25;
  const displayedContent = isExpanded
    ? post.content
    : words.slice(0, 25).join(" ") + (isLongText ? "..." : "");

 const handleAddComment = async () => {
   if (!user) {
     open();
     return;
   }
   if (!comment.trim()) return;
   const tempComment = {
     _id: Date.now().toString(),
     text: comment,
     user,
     createdAt: new Date().toISOString(),
   };
   addCommentLocal(post._id, tempComment);
   setComment("");
   try {
     await addCommentRequest(post._id, comment);
     toast.success("Comment added ");
   } catch {
     toast.error("Failed to add comment");
   }
 };

  const handleDelete = async (postId: string) => {
    const previousPosts = usePostStore.getState().posts; 
    deletePostLocal(postId);
    try {
      await deletePostRequest(postId);
      toast.success("Deleted successfully");
    } catch  {
      usePostStore.setState({ posts: previousPosts });
      toast.error("Delete failed, restored");
    }
  };
  
  const handleEdit = (id: string) => {
     console.log(id);
  };

  return (
    <div
      className="
        bg-[#0a0a0a]
        w-full
        sm:w-[90%]
        md:w-[70%]
        lg:w-[50%]
        xl:w-[40%]
        mx-auto
        my-3
        border border-gray-800
        rounded-2xl
        p-5
        shadow-md
        space-y-4
      "
    >
      <div className="flex items-center  justify-between">
        <div className="flex gap-3">
          <img
            src={post.author?.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="user"
          />
          <div>
            <p className="text-sm font-semibold">{post.author?.name}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </div>
        {post.author?._id === user?._id ? (
          <div className="flex">
            <div
              onClick={() => handleEdit(post._id)}
              className="text-gray-400 hover:text-blue-500 cursor-pointer transition   p-2 rounded-full hover:bg-blue-500/10"
            >
              <Pencil size={18} />
            </div>
            <div
              onClick={() => handleDelete(post._id)}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition p-2 rounded-full hover:bg-red-500/10"
            >
              <Trash2 size={20} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <hr className=" mx-auto h-[1.5px] border-0 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
      <h2 className="font-bold">{post.title}</h2>
      <p className="text-sm text-gray-300 leading-relaxed">
        {displayedContent}
      </p>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[var(--color-secondary)] hover:underline text-sm w-full cursor-pointer"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-xl max-h-[300px] object-cover"
        />
      )}

      <div className="flex items-center gap-6 text-gray-400 text-sm pt-2 border-t border-gray-800">
        <div
          onClick={handleLike}
          className={`flex items-center gap-1 cursor-pointer transition ${
            isLiked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={isLiked ? "red" : "none"} />
          <span>{post.likes?.length || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => copyLinkPost(post._id)}
        >
          <Share2 size={18} />
        </div>
      </div>
      <div className="space-y-3 pt-3 border-t border-gray-800">
        <div className="space-y-2 max-h-[100px] hide-scrollbar overflow-y-auto pr-1">
          {post.comments.map((c) => (
            <div
              key={c._id}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <img
                src={c.user?.image}
                className="w-7 h-7 rounded-full object-cover mt-0.5 flex-shrink-0"
                alt={c.user?.name}
              />
              <div>
                <span className="font-semibold mr-3 text-white">
                  {c.user?.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {timeAgo(c.createdAt)}
                </span>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm"
          />
          <button onClick={handleAddComment} className="btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
