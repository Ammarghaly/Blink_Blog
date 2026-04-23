import api from "./axios";
import { toast } from "react-hot-toast";
export const loginRequest = async (email: string, password: string) => {
 try {
   const res = await api.post("/auth/login", {
     email,
     password,
   });

   return res.data;
 } catch (error: any) {
  toast.error(`"ERROR RESPONSE:" ${error.response?.data}`);
 }
};
