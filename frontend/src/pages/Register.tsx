import { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoIosLogIn } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import api from "../lib/api";
import { useProfile } from "../stores/use-profile";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

const SignupFormSchema = z.object({
  name: z
    .string({ message: "Please Enter your name" })
    .min(10, "Name must be atleast 10 characters")
    .max(20, "Name must be shorter than 15 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long")
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

type SignupFormData = z.infer<typeof SignupFormSchema>;

interface ApiErrorResponse {
  message: string;
  code?: string;
  remainingAttempts?: number;
}

const SignupComponent = () => {
  const { setInfo } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const from = (location.state as { from?: string } | null)?.from || "/";

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setTimeout(() => setFocus("email"), 100);
  }, [setFocus]);

  const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      case 401:
        setError("email", { message: " " });
        setError("password", {
          message: data?.remainingAttempts
            ? `Invalid credentials. ${data.remainingAttempts} attempts remaining`
            : "Invalid email or password",
        });

        if (data?.remainingAttempts === 0) {
          setIsLocked(true);
          toast.error(
            "Account temporarily locked. Please try again later or reset your password."
          );
        }
        break;

      case 429:
        toast.error(
          "Too many login attempts. Please wait a moment before trying again."
        );
        break;

      case 423:
        toast.error("Your account has been locked. Please contact support.");
        setIsLocked(true);
        break;

      case 403:
        toast.error("Please verify your email address before logging in.");
        break;

      default:
        toast.error(
          data?.message || "An unexpected error occurred. Please try again."
        );
    }
  };

const submitSignupForm = async (data: SignupFormData) => {
    if (isLocked) {
      toast.error("Please wait before attempting to login again.");
      return;
    }

    try {
      const response = await api.post("/auth/signup", data);

      const { message, user } = response.data as {
        message: string;
        user: {
          id: string;
          email: string;
          role: "user" | "admin";
          name: string;
        }
      };

      setInfo({
        ...user,
        userId: user.id,
      });

      toast.success(message);

      const destination =
        user.role === "admin" ? "/admin" : from !== "/" ? from : "/profile";
      navigate(destination, { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // 1. Extract the custom backend error payload safely
        const serverError = error.response?.data as { detail?: string } | undefined;
        
        // 2. If 'detail' exists (e.g., "Email already exists"), toast it. 
        // Otherwise, fall back to your general error handler or a generic message.
        if (serverError?.detail) {
          toast.error(serverError.detail);
        } else {
          handleApiError(error as AxiosError<ApiErrorResponse>);
        }
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };
  return (
    <>
      <Header />
      <div className="dark:bg-blackPrimary bg-whiteSecondary min-h-[100vh] w-full flex justify-center items-center py-10 mt-15">

        <div className="max-w-md mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <FaLock className="h-8 w-8 text-blue-main" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Register to Tech waghera</h1>
              <p className="text-gray-500 mt-2">Create your account</p>
            </div>

            <form onSubmit={handleSubmit(submitSignupForm)} className="space-y-5">
              {/* name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    type="name"
                    id="name"
                    autoComplete="name"
                    disabled={isSubmitting || isLocked}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "email-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 hover:border-gray-400"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="john doe"
                  />
                </div>
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    autoComplete="email"
                    disabled={isSubmitting || isLocked}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 hover:border-gray-400"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    disabled={isSubmitting || isLocked}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 hover:border-gray-400"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-main transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLocked}
                className="w-full bg-gradient-to-r from-blue-main to-blue-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-main focus:ring-offset-2 shadow-lg shadow-blue-main/25 hover:shadow-xl hover:shadow-blue-main/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <IoIosLogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-500 text-sm">
                Already have an account ? &nbsp;
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                >
                   signin
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Help Text */}
          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <Link to="/about#terms-of-service" className="underline hover:text-gray-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/about#privacy-policy" className="underline hover:text-gray-600">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupComponent;