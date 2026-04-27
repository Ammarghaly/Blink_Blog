import { create } from "zustand";
import type { Post, Comment } from "../types/index";

type PostStore = {
  posts: Post[];
  userPosts: Post[];
  setPosts: (posts: Post[]) => void;
  setUserPosts: (posts: Post[]) => void;
  toggleLikeLocal: (postId: string, userId: string) => void;
  addCommentLocal: (postId: string, comment: Comment) => void;
  deletePostLocal: (postId: string) => void;
  deletePostUserLocal: (postId: string) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  userPosts: [],
  setPosts: (posts) => set({ posts }),
  setUserPosts: (userPosts) => set({ userPosts }),
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
  deletePostLocal: (postId) => {
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== postId),
    }));
  },
  deletePostUserLocal: (postId) => {
    set((state) => ({
      userPosts: state.userPosts.filter((p) => p._id !== postId),
    }));
  },
}));
