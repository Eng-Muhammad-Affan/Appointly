"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOTP } from "./use-otp";
import Link from "next/link";
import Image from "next/image";

export const OTPForm = () => {
  const { setOTP, resendOTP, verifyOTP, loading } = useOTP();

  return (
    // <div className="bg-surface font-sans text-on-surface">
    <main className="w-full h-screen bg-surface-container-lowest gap-2 flex items-center justify-center p-6 md:p-12">
      {/* Right Side: OTP Form */}
      {/* <section className=" "> */}

      <div className="space-y-4 mb-8">
        <div className="flex justify-center">
          <Image
            width={300}
            height={300}
            alt="Appointly illustration"
            className="w-[200px] h-auto object-contain"
            src="/images/signup-user-illustration.png"
          />
        </div>
      </div>

      <div>
        {/* Header info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary font-bold text-h3 font-h2 select-none">
              Appointly
            </span>
          </div>
          <h2 className="font-h1 text-h1 text-primary tracking-tight text-3xl font-bold">
            Enter OTP
          </h2>
          <p className="text-body-base text-on-surface-variant">
            We've sent a 6-digit code to your email address.
          </p>
        </div>

        <form className="space-y-4">
          {/* OTP Input */}
          <div className="space-y-3">
            <label className="block font-label-bold text-label-bold text-on-surface-variant">
              Verification Code
            </label>
            <div className="flex justify-center md:justify-start">
              <InputOTP maxLength={6} onChange={(e) => setOTP(e)}>
                <div className="flex items-center gap-2 md:gap-3">
                  <InputOTPGroup className="flex gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-outline-variant font-bold">
                    -
                  </InputOTPSeparator>
                  <InputOTPGroup className="flex gap-2">
                    <InputOTPSlot
                      index={3}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-8 h-8 md:w-10 md:h-10 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 text-center text-sm md:text-md font-bold"
                    />
                  </InputOTPGroup>
                </div>
              </InputOTP>
            </div>
          </div>

          {/* Verify Button */}
          <button
            type="button"
            onClick={verifyOTP}
            disabled={loading}
            className="w-full py-3 bg-[#92E889] hover:bg-[#7EDC73] text-black hover:shadow-md transition-all active:scale-[0.98] font-label-bold text-label-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify OTP</span>
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

          {/* Resend OTP */}
          <div className="text-center text-body-small text-on-surface-variant">
            <p>
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={resendOTP}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>

        <footer className="pt-2 text-center">
          <p className="text-body-small text-on-surface-variant font-body-base">
            Don't have an account?{" "}
            <Link
              className="font-label-bold text-primary hover:underline"
              href="/create-account"
            >
              Sign Up
            </Link>
          </p>
        </footer>
      </div>

      {/* </section> */}
    </main>

    // </div>
  );
};
