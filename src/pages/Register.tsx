import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import imageRegister from "../assets/register.png";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
  profilePic: FileList;
};

export default function Login() {
  const { registration } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email.toLowerCase());
      formData.append("password", data.password);
      if (data.profilePic[0]) {
        formData.append("image", data.profilePic[0]);
      }
      await registration(formData);
      toast.success("Account created");
      navigate("/login");
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden ">
      <div className="image hidden md:block w-[45%] h-full">
        <img
          src={imageRegister}
          alt="Login Visual"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-3 ">
        <div className="w-full max-w-md bg-[#0a0a0a] shadow-[0_0_17px_#8b5cf6] p-7 rounded-3xl border border-gray-800 shadow-2xl overflow-y-auto max-h-[95vh]">
          <h2 className="text-xl font-bold mb-0.5 text-center">
            Create Account
          </h2>
          <p className="text-gray-500 mb-5 text-center text-sm">
            Join the next evolution of digital social spaces.
          </p>

          <form className="space-y-3 " onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-0.5 font-bold ">
                Full Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                  pattern: { value: /^[A-Za-z\s]+$/i, message: "Invalid Name" },
                })}
                className="w-full bg-[#121212] border border-gray-700 p-2 rounded-xl focus:border-purple-500 outline-none transition-all text-sm"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-0.5 font-bold">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-700 p-2 rounded-xl focus:border-purple-500 outline-none transition-all text-sm"
                placeholder="name@domain.com"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-0.5 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                  className="w-full bg-[#121212] border border-gray-700 p-2 rounded-xl text-sm outline-none focus:border-purple-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-0.5 font-bold">
                  Re-Password
                </label>
                <input
                  type="password"
                  {...register("rePassword", {
                    required: "Required",
                    validate: (val) => val === watch("password") || "No match",
                  })}
                  className="w-full bg-[#121212] border border-gray-700 p-2 rounded-xl text-sm outline-none focus:border-purple-500"
                />
                {errors.rePassword && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase mb-0.5 font-bold">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("profilePic", {
                  required: "Image required",
                  validate: {
                    checkType: (files) =>
                      !files[0] ||
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        files[0]?.type,
                      ) ||
                      "Invalid format",
                    checkSize: (files) =>
                      !files[0] ||
                      files[0]?.size < 2 * 1024 * 1024 ||
                      "Max 2MB",
                  },
                })}
                className="w-full bg-[#121212] border border-gray-700 p-2 rounded-xl text-[10px] text-gray-400
                   file:bg-purple-600 file:text-white file:border-0 file:rounded-lg file:px-2 file:py-1 file:mr-2 cursor-pointer"
              />
              {errors.profilePic && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.profilePic.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 py-3 rounded-xl cursor-pointer font-bold hover:bg-purple-700 transition-all text-sm mt-2 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "CREATE ACCOUNT"}
            </button>

            <p className="text-center text-gray-600 text-xs mt-4">
              Already have an account?
              <span
                className="text-white ml-1.5 cursor-pointer underline hover:text-primary underline-offset-4"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
