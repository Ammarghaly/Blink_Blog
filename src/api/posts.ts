import api from "./axios";

export const getPosts = async (page = 1, limit = 9) => {
  const res = await api.get(`/posts?page=${page}&limit=${limit}`);
  console.log(res.data);
  return res.data;
};

export const toggleLikeRequest = (postId: string) => {
  return api.put(`/posts/${postId}/like`);
};

export const addCommentRequest = (postId: string, text: string) => {
  return api.post(`/posts/${postId}/comment`, { text });
};

export const getPostById = async (id: string | undefined) => {
  const res = await api.get(`/posts/${id}`);
  return res.data.post;
};

export const getPostsUserById = async (id: string | undefined) => {
  const res = await api.get(`/posts/user/${id}`);
  return res.data.post;
};

export const createPostRequest = async (data: FormData) => {
  const res = api.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const deletePostRequest = async (id: string) => {
  const res = api.delete(`/posts/${id}`);
  return res;
};

export const updatePostRequest = async (id: string, formData: FormData) => {
  const res = await api.patch(`/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
