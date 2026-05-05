import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { verifyOtpRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

type FormData = {
  otp: string;
};

export default function VerifyOtp() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const email = localStorage.getItem("pendingEmail");
      if (!email) {
        toast.error("Email not found. Please register again.");
        return;
      }
      await verifyOtpRequest(email, data.otp);
      toast.success("Account verified successfully");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Verify your account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        <input
          {...register("otp", { required: true, maxLength: 6 })}
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          className="w-60 px-4 py-2 bg-black border border-gray-700 rounded-md text-center tracking-widest"
        />

        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
}
