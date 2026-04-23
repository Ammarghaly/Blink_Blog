export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}
export interface Post {
  _id: string;
  content: string;
  image?: string;
  author: User;
  likes: string[];
  comments: Comment[];
}