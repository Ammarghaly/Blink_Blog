import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createPostRequest } from "../api/posts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import type { Post } from "../types";

interface CreatePostInput extends Omit<Post, "image"> {
  image: FileList;
}

export default function CreatePost() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostInput>();

  const [preview, setPreview] = useState<string | null>(null);
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const navigate = useNavigate();

  const onSubmit = async (data: CreatePostInput) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await createPostRequest(formData);
      reset();
      setPreview(null);
      toast.success("Post created successfully ");
      navigate("/");
    } catch {
      toast.error("Something went wrong ");
    }
  };
  return (
    <div className="mt-20 flex justify-center items-center bg-neutral text-white">
      <div className="flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg card-bg p-6 space-y-4 shadow-2xl"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-1">Create New Post</h2>
          </div>

          <div>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters",
                },
              })}
              placeholder="Title"
              className={`w-full p-3 rounded-lg bg-black/40 border ${
                errors.title ? "border-red-500" : "border-gray-700"
              } focus:border-primary outline-none`}
            />

            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Minimum 50 characters",
                },
              })}
              placeholder="Content"
              rows={4}
              className={`w-full p-3 rounded-lg bg-black/40 border ${
                errors.content ? "border-red-500" : "border-gray-700"
              } focus:border-primary outline-none`}
            />

            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full border rounded-2xl border-gray-700 focus:border-[var(--color-primary)] bg-black/40 text-sm text-gray-400 p-2
                file:mr-4 file:py-1 file:px-4 
                file:rounded-lg file:border-0 
                file:bg-primary file:text-white 
                hover:file:bg-secondary cursor-pointer transition"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg 
  bg-[var(--color-primary)] transition 
  ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}`}
          >
            {isSubmitting ? "Creating..." : "Create →"}
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-100 h-100 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden items-center justify-center relative shadow-2xl ml-8">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-800">
              <Image />
            </div>
            <p className="text-gray-500 font-medium">Image Preview</p>
            <p className="text-gray-600 text-xs mt-2">
              Your shot will appear here
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
