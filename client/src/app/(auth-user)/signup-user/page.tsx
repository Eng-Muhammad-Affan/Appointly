// SignupPage.tsx
"use client";
import { Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useSignupForm } from "./use-signup-form";
import { LeftSide } from "./components";
import { Input } from "@/components/common";
import { FormProvider } from "react-hook-form";
import { ContinueWithGoogleButton } from "@/components/common/continue-with-google";

export function SignupPage() {
  const {
    signup,
    methods,
    confirmPassword,
    setConfirmPassword,
    agreeTerms,
    setAgreeTerms,
    passwordRequirements,
    allReqsMet,
    password,
  } = useSignupForm();

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen selection:bg-secondary-container">
      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Branding & Illustration */}
        <LeftSide />

        {/* Right Side: Signup Form */}
        <section className="flex-grow flex items-center justify-center p-6 md:p-12 bg-surface-container-lowest overflow-y-auto">
          <div className="max-w-[400px] w-full space-y-6 py-4">
            {/* Header info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold text-h3 font-h2 select-none">
                  Appointly
                </span>
              </div>
              <h2 className="font-h1 text-h1 text-primary tracking-tight text-3xl font-bold">
                Create an account
              </h2>
              <p className="text-body-base text-on-surface-variant">
                Experience the future of seamless scheduling.
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={signup} className="space-y-4">
                {/* Full name input */}
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="John doe"
                />
                {/* Email Address */}
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="abc@gmail.com"
                />
                {/* Password input */}
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                />

                {/* Real-time Requirements checklist block */}
                <div className="bg-surface-container-low p-3.5 rounded-lg space-y-2 border border-outline-variant/10">
                  <p className="text-caption font-label-bold text-on-surface-variant/70 uppercase text-[10px] tracking-wider">
                    Password requirements
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-small">
                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordRequirements.length
                          ? "text-green-700 font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <Check
                        size={14}
                        className={
                          passwordRequirements.length
                            ? "text-green-600"
                            : "text-outline opacity-40"
                        }
                      />
                      <span className="text-[12px]">8+ characters</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordRequirements.upper
                          ? "text-green-700 font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <Check
                        size={14}
                        className={
                          passwordRequirements.upper
                            ? "text-green-600"
                            : "text-outline opacity-40"
                        }
                      />
                      <span className="text-[12px]">One uppercase</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordRequirements.number
                          ? "text-green-700 font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <Check
                        size={14}
                        className={
                          passwordRequirements.number
                            ? "text-green-600"
                            : "text-outline opacity-40"
                        }
                      />
                      <span className="text-[12px]">One number</span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 ${
                        passwordRequirements.special
                          ? "text-green-700 font-bold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <Check
                        size={14}
                        className={
                          passwordRequirements.special
                            ? "text-green-600"
                            : "text-outline opacity-40"
                        }
                      />
                      <span className="text-[12px]">One special symbol</span>
                    </div>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-1">
                  <label
                    className="block font-label-bold text-label-bold text-on-surface-variant"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-caption text-red-600 font-medium mt-1">
                      Passwords do not match.
                    </p>
                  )}
                </div>

                {/* Terms agreement checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label
                    className="text-body-small text-on-surface-variant select-none cursor-pointer"
                    htmlFor="terms"
                  >
                    I agree to the{" "}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#terms"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#privacy"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Create account primary button */}
                <button
                  type="submit"
                  disabled={
                    methods.formState.isSubmitting || !agreeTerms || !allReqsMet
                  }
                  className="w-full py-3 bg-[#92E889] hover:bg-[#7EDC73] text-black hover:shadow-md transition-all active:scale-[0.98] font-label-bold text-label-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  {methods.formState.isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                  <span className="flex-shrink mx-3 text-on-surface-variant font-caption text-[11px] uppercase tracking-wider font-bold">
                    or
                  </span>
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                </div>

                {/* Google Sign up button */}
                <ContinueWithGoogleButton />
              </form>
            </FormProvider>

            <footer className="pt-2 text-center">
              <p className="text-body-small text-on-surface-variant font-body-base">
                Already have an account?{" "}
                <Link
                  className="font-label-bold text-primary hover:underline"
                  href="/login-user"
                >
                  Log In
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignupPage;
