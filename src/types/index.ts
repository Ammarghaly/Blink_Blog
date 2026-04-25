export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Comment {
  user: User;
  _id: string;
  text: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  title:string;
  content: string;
  image?: string;
  createdAt: string;
  author: User;
  likes: string[];
  comments: Comment[];
}