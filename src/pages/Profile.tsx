import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../hooks/useAuth";
import { SquarePenIcon } from "lucide-react";


export default function Profile() {
  const {user}=useAuth()
  return (
    <>
      <UserInfo />
      {!!user && (
        <Link
          to={"/addPost"}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full text-white flex items-center justify-center bg-black fixed bottom-10 shadow-[0_0_10px_var(--color-primary)] right-10 cursor-pointer hover:bg-gray-800 transition border border-gray-700"
        >
          <SquarePenIcon color="#a855f7" />
        </Link>
      )}
    </>
  );
}
