import { create } from "zustand";
import type { Post, Comment } from "../types/index";

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  toggleLikeLocal: (postId: string, userId: string) => void;
  addCommentLocal: (postId: string, comment: Comment) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  toggleLikeLocal: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post._id !== postId) return post;
        const isLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      }),
    })),
  addCommentLocal: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
            }
          : post,
      ),
    })),
}));
