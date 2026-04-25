import { useAuthModal } from "../hooks/useAuthModal";
import { useNavigate } from "react-router-dom";

export default function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 w-[90%] max-w-sm text-center space-y-4">
        <h2 className="text-lg font-semibold">Login Required 🔒</h2>

        <p className="text-gray-400 text-sm">You need to login to continue</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={close}
            className="px-4 py-2 border border-gray-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              close();
              navigate("/login");
            }}
            className="btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
