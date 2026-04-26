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

// export const getPostById = async (id:string | undefined) => {
//   const res = await api.get(`/posts/:${id}`);
//   return res.data.posts;
// };

export const getPostById = async (id:string | undefined) => {
  const res = await api.get(`/posts/user/${id}`);
  return res.data.posts;
};
