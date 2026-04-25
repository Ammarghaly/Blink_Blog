import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import imageLogin from "../assets/Login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        const errorMessage = errorData?.message || errorData?.error;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#050505] text-white">
      <div className="image">
        <img src={imageLogin} alt="Login Visual" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#0a0a0a] p-10 rounded-3xl border border-gray-800 shadow-[0_0_17px_#8b5cf6]">
          <h2 className="text-2xl font-bold mb-3 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-8">
            Fill in your credentials to access your experience
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-2 font-bold">
                Email
              </label>
              <input
                defaultValue={"aa@aa.com"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-700 p-3.5 rounded-xl focus:border-purple-500 outline-none transition-all"
                placeholder="name@domain.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase mb-2 font-bold">
                Password
              </label>
              <input
                defaultValue={"123456789"}
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-700 p-3.5 rounded-xl focus:border-purple-500 outline-none transition-all"
                placeholder="**********"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 py-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Initialize Session →"}
            </button>

            <p className="text-center text-gray-600 text-sm mt-8">
              New to the vortex?
              <span
                className="text-white ml-1.5 cursor-pointer hover:text-primary underline underline-offset-4"
                onClick={() => navigate("/register")}
              >
                Create Account
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


