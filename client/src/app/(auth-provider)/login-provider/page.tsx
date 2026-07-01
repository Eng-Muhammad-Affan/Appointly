"use client";
// _____ utils ...
import { useLoginForm } from "./use-login-form";
import { OTPForm } from "./OtpForm";

import { Verified } from "lucide-react";
import { Input } from "@/components/common";
import { FormProvider } from "react-hook-form";

export default function ProviderLoginForm() {
  const { login, otpVisible, methods } = useLoginForm();

  return (
    <div className="min-h-screen flex justify-center items-center">
      {otpVisible ? (
        <OTPForm />
      ) : (
        <main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
          {/* Left Section: Visual & Branding */}
          <section className="hidden md:flex flex-1 flex-col justify-center items-center bg-tertiary p-8 relative">
            <div className="z-10 text-center max-w-md">
              <div className="mb-8 flex justify-center">
                {/* Brand Identity as Anchor */}
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    Appointly
                  </span>
                </div>
              </div>

              <div className="relative group">
                {/* Image provided via placeholder */}
                <img
                  alt="Appointly Illustration"
                  className="w-[400px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  src="/images/login-illustration.png"
                />
                {/* Decorative Soft Ambient Shadows as per Style Guide */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-4 bg-primary/5 blur-2xl rounded-full"></div>
              </div>

              <p className="mt-8 text-2xl font-bold text-primary leading-tight">
                Your next appointment, <br />
                <span className="text-secondary-container bg-primary px-2 py-1 inline-block">
                  just a tap away.
                </span>
              </p>

              <div className="mt-6 flex gap-1 justify-center items-center text-on-surface-variant text-sm">
                <Verified size={18} />
                <span>Fast, secure, and always synchronized.</span>
              </div>
            </div>

            {/* Pattern Overlay (Subtle Tonal Layering) */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            ></div>
          </section>

          {/* Right Section: Login Form */}
          <section className="flex-1 bg-surface-container-lowest flex items-center justify-center px-4 md:px-8">
            <div className="w-full max-w-[400px]">
              {/* Mobile Header Only */}
              <div className="md:hidden mb-8 text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Appointly
                </h1>
                <p className="text-base text-on-surface-variant">
                  Welcome back! Please login to your account.
                </p>
              </div>

              <header className="mb-8 hidden md:block">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  Welcome back
                </h2>
                <p className="text-base text-on-surface-variant">
                  Please enter your details to sign in.
                </p>
              </header>

              <FormProvider {...methods}>
                <form className="space-y-4" id="loginForm" onSubmit={login}>
                  {/* Email Field */}
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="abc@gmail.com"
                  />
                  {/* Password Field */}
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                  />

                  {/* Login Button */}
                  <button
                    className="w-full py-3.5 bg-secondary-container text-black font-semibold text-sm rounded-lg transition-all active:scale-[0.98] mt-4 hover:opacity-90"
                    type="submit"
                    disabled={methods.formState.isSubmitting}
                  >
                    {methods.formState.isSubmitting
                      ? "Please wait ..."
                      : "Login"}
                  </button>
                </form>
              </FormProvider>

              <footer className="mt-8 text-center">
                <p className="text-sm text-on-surface-variant">
                  Don't have an account?
                  <a
                    className="font-semibold text-secondary hover:underline ml-1"
                    href="/create-account"
                  >
                    continue as provider
                  </a>
                </p>
              </footer>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
