import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portfolio from "./pages/Portfolio";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "./hooks/useAuth";
import { AuthModalProvider } from "./context/AuthModalContext";
import AuthModal from "./components/AuthModal";
import Post from "./pages/Post";
import PageNotFound from "./pages/PageNotFound";
import AddPost from "./pages/AddPost";

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
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route
            path="/addPost"
            element={user ? <AddPost /> : <Navigate to="/" />}
          />
          <Route
            path="/portfolio"
            element={!user ? <Navigate to="/" /> : <Portfolio />}
          />
        </Route>

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <AuthModal />
    </AuthModalProvider>
  );
}
