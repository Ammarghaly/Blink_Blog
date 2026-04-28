import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  createPostRequest,
  getPostById,
  updatePostRequest,
} from "../api/posts";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import type { Post } from "../types";
import { useLoading } from "../hooks/useLoading";

interface CreatePostInput extends Omit<Post, "image"> {
  image: FileList;
}

export default function FormPost() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostInput>();

  const { setIsLoading } = useLoading();

  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const isEditMode = location.pathname.includes("edit");
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [imageFile]);

  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting, setIsLoading]);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const post = await getPostById(id);
          reset({
            title: post.title,
            content: post.content,
          });
          setPreview(post.image);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, isEditMode, reset, setIsLoading]);

  const onSubmit = async (data: CreatePostInput) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      if (isEditMode && id) {
        await updatePostRequest(id, formData);
        toast.success("Post updated");
      } else {
        await createPostRequest(formData);
        toast.success("Post created");
      }

      reset();
      setPreview(null);
      navigate("/");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center bg-neutral text-white">
      <div className="flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg card-bg p-6 space-y-4 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold">
            {isEditMode ? "Edit Post" : "Create Post"}
          </h2>
          <div>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
              })}
              placeholder="Title"
              className={`w-full p-3 rounded-lg bg-black/40 border ${
                errors.title ? "border-red-500" : "border-gray-700"
              }`}
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
                minLength: { value: 30, message: "Minimum 30 characters" },
              })}
              rows={4}
              placeholder="Content"
              className={`w-full p-3 rounded-lg bg-black/40 border ${
                errors.content ? "border-red-500" : "border-gray-700"
              }`}
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
            className="w-full border rounded-2xl border-gray-700 bg-black/40 text-sm text-gray-400 p-2 file:bg-primary file:text-white"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg bg-[var(--color-primary)] ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Post"
                : "Create →"}
          </button>
        </form>
      </div>
      <div className="hidden md:flex flex-col w-[400px] ml-8 self-center">
        <p className="text-gray-500 text-sm mb-2 text-center">Image Preview</p>
        {preview ? (
          <img
            src={preview}
            className="w-full rounded-xl max-h-[300px] object-cover border border-gray-800 shadow-lg"
          />
        ) : (
          <div className="w-full h-[250px] bg-[#0a0a0a] border border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 shadow-md">
            <div className="text-center">
              <Image size={40} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No image selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
