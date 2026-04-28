import { useEffect } from "react";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import { usePostStore } from "../store/usePostStore";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SquarePenIcon } from "lucide-react";
import { useLoading } from "../hooks/useLoading";

export default function Home() {
  const { posts, setPosts, currentPage, totalPages, setPagination } =
    usePostStore();
  const { user } = useAuth();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getPosts(currentPage);
        setPosts(data.posts);
        setPagination(data.page, data.pages);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data;
          const errorMessage = errorData?.message || errorData?.error;
          toast.error(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPagination(currentPage + 1, totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPagination(currentPage - 1, totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="pb-8">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 mb-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              currentPage === 1
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-black border border-gray-700 text-white hover:bg-gray-800 shadow-[0_0_5px_var(--color-primary)]"
            }`}
          >
            prev
          </button>

          <span className="text-gray-300 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              currentPage === totalPages
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-black border border-gray-700 text-white hover:bg-gray-800 shadow-[0_0_5px_var(--color-primary)]"
            }`}
          >
            next
          </button>
        </div>
      )}
      {!!user && (
        <Link
          to={"/addPost"}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full text-white flex items-center justify-center bg-black fixed bottom-10 shadow-[0_0_10px_var(--color-primary)] right-10 cursor-pointer hover:bg-gray-800 transition border border-gray-700"
        >
          <SquarePenIcon color="#a855f7" />
        </Link>
      )}
    </div>
  );
}
