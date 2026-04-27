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
import FormPost from "./pages/FormPost";
import LoadingSpinner from "./components/LoadingSpinner";
import { useLoading } from "./hooks/useLoading";
import { useEffect } from "react";

export default function App() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(isAuthLoading && !user);
  }, [isAuthLoading, user, setIsLoading]);

  if (isAuthLoading && !user) {
    return <LoadingSpinner />;
  }
  return (
    <AuthModalProvider>
      <LoadingSpinner />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route
            path="/addPost"
            element={user ? <FormPost /> : <Navigate to="/" />}
          />
          <Route
            path="/edit/:id"
            element={user ? <FormPost /> : <Navigate to="/" />}
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
