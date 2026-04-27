import React from "react";
import { useLoading } from "../hooks/useLoading";

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
    </div>
  );
};

export default LoadingSpinner;
