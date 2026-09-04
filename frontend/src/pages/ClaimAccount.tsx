import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import api from "../lib/api";
import { useProfile } from "../stores/use-profile";
import Header from "@/components/user/Header";

const ClaimFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ClaimFormData = z.infer<typeof ClaimFormSchema>;

interface ApiErrorResponse {
  detail?: string;
  message?: string;
}

const ClaimAccountComponent = () => {
  const { setInfo } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // States to explicitly handle link expirations and verification inputs
  const [isExpired, setIsExpired] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [linkSentSuccess, setLinkSentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ClaimFormData>({
    resolver: zodResolver(ClaimFormSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (token && !isExpired) {
      setTimeout(() => setFocus("password"), 100);
    }
  }, [setFocus, token, isExpired]);

  // EXPLICIT EMAIL HANDLER: Posts user-provided email to backend resend endpoint
  const handleEmailResendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) {
      toast.error("Please provide your order email address.");
      return;
    }

    try {
      setIsResending(true);
      const response = await api.post("/auth/claim-account/resend", {
        email: resendEmail,
      });
      
      setLinkSentSuccess(true);
      toast.success(response.data?.message || "Verification link sent! Please check your inbox.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ApiErrorResponse>;
        toast.error(
          serverError.response?.data?.detail || 
          "We couldn't process this resend request. Please verify the email address."
        );
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const submitClaimForm = async (data: ClaimFormData) => {
    try {
      const response = await api.post("/auth/claim-account", {
        token: token,
        password: data.password,
      });

      const { message, user } = response.data as {
        message: string;
        user: { id: string; email: string; role: "user" | "admin"; name: string };
      };

      setInfo({ ...user, userId: user.id });
      toast.success(message || "Account securely established!");
      navigate("/profile/orders", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ApiErrorResponse>;
        const errorMessage = serverError.response?.data?.detail || "";
        
        if (errorMessage.toLowerCase().includes("expired") || errorMessage.toLowerCase().includes("invalid")) {
          setIsExpired(true);
          toast.error("This activation link has expired. Please request a new one below.");
        } else {
          toast.error(errorMessage || "An error occurred while claiming your account.");
        }
      } else {
        toast.error("Network interface error. Check your connection paths.");
      }
    }
  };

  if (!token) {
    return (
      <>
        <Header />
        <div className="max-w-md mx-auto mt-20 px-4 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
              <IoIosWarning className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Missing Token</h1>
            <p className="text-gray-500 mt-2">This path requires a valid token sequence to process account creation.</p>
            <Link to="/" className="mt-6 inline-block text-blue-main font-semibold hover:underline">Return to Home</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <br /><br /><br /><br /><br />

      <div className="max-w-md mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          
          {/* STATE 1: LINK EXPIRED - EXPLICIT EMAIL REQUEST FORM */}
          {isExpired ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
                  <IoIosWarning className="h-8 w-8 text-amber-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Link Expired</h1>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  For your security, setup links expire after a short window. Please confirm your order email below to receive a fresh activation link.
                </p>
              </div>

              {linkSentSuccess ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center mt-4">
                  <p className="text-sm text-green-800 font-medium">
                    A new activation link has been generated and dispatched to **{resendEmail}**. Please check your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailResendSubmit} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="resendEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Order Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="resendEmail"
                        required
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        disabled={isResending}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white disabled:bg-gray-100"
                        placeholder="Enter the email used during checkout"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isResending}
                    className="w-full bg-gray-950 text-white py-3.5 rounded-2xl font-semibold text-base hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                  >
                    {isResending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <span>Request New Link</span>
                    )}
                  </button>
                  <p className="text-sm text-gray-600">Forgot email? check the previous confirmation email</p>
                </form>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Link to="/" className="text-sm font-semibold text-blue-main hover:underline">
                  Back to Marketplace Home
                </Link>
              </div>
            </div>
          ) : (
            
            /* STATE 2: ACTIVE TOKEN - SECURE ACCOUNT FORM */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <FaLock className="h-8 w-8 text-blue-main" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Secure Account</h1>
                <p className="text-gray-500 mt-2">Create a secure password to unlock and track your recent order records.</p>
              </div>

              <form onSubmit={handleSubmit(submitClaimForm)} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none ${
                        errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"
                      } disabled:bg-gray-100`}
                      placeholder="Minimum 8 characters"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none ${
                        errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"
                      } disabled:bg-gray-100`}
                      placeholder="Repeat your password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-main to-blue-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-main shadow-lg shadow-blue-main/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Activating Profile...</span>
                    </>
                  ) : (
                    <>
                      <IoIosCheckmarkCircle className="h-5 w-5" />
                      <span>Activate Account & View Orders</span>
                    </>
                  )}
                </button>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">
                    Already have an account? &nbsp;
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ClaimAccountComponent;