import { create } from "zustand";
import type { Post, Comment } from "../types/index";

type PostStore = {
  posts: Post[];
  post: Post | null;
  userPosts: Post[];
  setPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
  setUserPosts: (posts: Post[]) => void;
  toggleLikeLocal: (postId: string, userId: string) => void;
  addCommentLocal: (postId: string, comment: Comment) => void;
  deletePostLocal: (postId: string) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  userPosts: [],
  post: null,
  setPost: (post) => set({ post }),
  setPosts: (posts) => set({ posts }),
  setUserPosts: (userPosts) => set({ userPosts }),
  toggleLikeLocal: (postId, userId) =>
    set((state) => {
      const update = (p: Post) => {
        if (p._id !== postId) return p;
        const isLiked = p.likes.includes(userId);
        return {
          ...p,
          likes: isLiked
            ? p.likes.filter((id) => id !== userId)
            : [...p.likes, userId],
        };
      };
      return {
        posts: state.posts.map(update),
        userPosts: state.userPosts.map(update),
      };
    }),
  addCommentLocal: (postId, comment) =>
    set((state) => {
      const update = (p: Post) => {
        if (p._id !== postId) return p;
        return { ...p, comments: [...p.comments, comment] };
      };
      return {
        posts: state.posts.map(update),
        userPosts: state.userPosts.map(update),
        post: state.post ? update(state.post) : null,
      };
    }),
  deletePostLocal: (postId) => {
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== postId),
      userPosts: state.userPosts.filter((p) => p._id !== postId),
      post: state.post?._id === postId ? null : state.post,
    }));
  },
}));
