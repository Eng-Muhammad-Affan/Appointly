"use client";
// _____ utils ...
import { useLoginForm } from "./use-login-form";
import { OTPForm } from "./OtpForm";
import { useFormData } from "./formdata";

import { Verified, Mail, Lock, Eye } from "lucide-react";

export function ProviderLoginForm() {
  const { login, isSubmitting, register, errors, otpVisible } = useLoginForm();
  const { formData } = useFormData();

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

              <form className="space-y-4" id="loginForm" onSubmit={login}>
                {/* Email Field */}
                <div className="space-y-1">
                  <label
                    className="font-semibold text-sm text-on-surface"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                      size={20}
                    />
                    <input
                      className={`${errors.email ? "border border-red-600" : ""} w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base outline-none transition-all placeholder:text-outline-variant`}
                      placeholder="you@example.com"
                      type="email"
                      id="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label
                      className="font-semibold text-sm text-on-surface"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      className="font-semibold text-sm text-secondary hover:underline"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                      size={20}
                    />
                    <input
                      className={`${errors.password ? "border border-red-600" : ""} w-full pl-12 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base outline-none transition-all placeholder:text-outline-variant`}
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                      id="togglePassword"
                      type="button"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  className="w-full py-3.5 bg-secondary-container text-black font-semibold text-sm rounded-lg transition-all active:scale-[0.98] mt-4 hover:opacity-90"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait ..." : "Login"}
                </button>
              </form>

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

/*
     <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </CardHeader>
          <CardContent>
            <form className={cn("flex flex-col gap-6")} onSubmit={login}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className={`w-full ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  Login to dashboard
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?
                <Link href="/create-account" className="text-pink font-bold">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
*/
