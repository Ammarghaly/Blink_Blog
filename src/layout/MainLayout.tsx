import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center">
        {<Outlet />}
      </div>
    </>
  );
}
