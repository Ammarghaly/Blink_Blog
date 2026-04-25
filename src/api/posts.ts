import api from "./axios";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data.posts;
};

export const toggleLikeRequest = (postId: string) => {
  return api.put(`/posts/${postId}/like`);
};

export const addCommentRequest = (postId: string, text: string) => {
  return api.post(`/posts/${postId}/comment`, { text });
};