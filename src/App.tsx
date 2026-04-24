import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portfolio from "./pages/Portfolio";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "./hooks/useAuth"; 

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading && !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <Routes>
      <Route element={user ? <MainLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>

      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}

      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
