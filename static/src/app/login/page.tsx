"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Simulate API authorization call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-sans antialiased">
      <main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section: Visual & Branding (Desktop Only) */}
        <section className="hidden md:flex flex-1 flex-col justify-center items-center bg-[#e8e2d0] p-12 relative overflow-hidden">
          <div className="z-10 text-center max-w-md space-y-8">
            
            {/* Brand Logo Header */}
            <div className="flex justify-center">
              <span className="text-h1 font-black text-primary font-h1 select-none">Appointly</span>
            </div>

            {/* Flat Organic Brand Illustration */}
            <div className="relative group flex justify-center">
              <img
                alt="Appointly abstract community booking illustration"
                className="w-[360px] h-auto object-contain transform group-hover:scale-102 transition-transform duration-500 ease-out"
                src="/login-illustration.png"
              />
              {/* Decorative Ambient Shadow matching style guide */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-3 bg-primary/5 blur-xl rounded-full" />
            </div>

            {/* Catchphrase Block */}
            <div className="space-y-3">
              <p className="font-h2 text-h2 text-primary leading-tight">
                Your next appointment, <br />
                <span className="text-[#7a3d54] bg-[#fdadc7] px-2 py-0.5 mt-1 inline-block rounded font-extrabold">
                  just a tap away.
                </span>
              </p>

              <div className="flex gap-1.5 justify-center items-center text-on-surface-variant text-body-small">
                <ShieldCheck size={16} className="text-secondary-dark" />
                <span className="font-medium">Fast, secure, and always synchronized.</span>
              </div>
            </div>

          </div>

          {/* Subtly Textured Background Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
        </section>

        {/* Right Section: Interactive Login form */}
        <section className="flex-1 bg-surface-container-lowest flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-[360px] space-y-6">
            
            {/* Mobile Branding Header (Collapsed View) */}
            <div className="md:hidden text-center space-y-1">
              <h1 className="font-h1 text-h1 text-primary">Appointly</h1>
              <p className="text-body-base text-on-surface-variant">
                Welcome back! Please login to your account.
              </p>
            </div>

            {/* Desktop Welcomer Header */}
            <header className="hidden md:block space-y-1">
              <h2 className="font-h1 text-h1 text-primary">Welcome back</h2>
              <p className="text-body-base text-on-surface-variant">
                Please enter your details to sign in.
              </p>
            </header>

            {success ? (
              /* Triumphant Success Modal */
              <div className="p-6 bg-[#92E889]/10 border border-[#92E889]/30 rounded-card text-center space-y-4 shadow-sm animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mx-auto">
                  <CheckCircle2 size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-body-base text-primary">Logged in successfully</h4>
                  <p className="text-caption text-on-surface-variant">
                    Redirecting you to the Appointly workspace dashboard...
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-block w-full py-2 bg-primary text-white text-body-small font-label-bold rounded-lg"
                >
                  Continue
                </Link>
              </div>
            ) : (
              /* Regular Login Form context */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email address field */}
                <div className="space-y-1">
                  <label className="block font-label-bold text-label-bold text-on-surface" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-body-small">
                    <label className="font-label-bold text-label-bold text-on-surface" htmlFor="password">
                      Password
                    </label>
                    <a className="font-label-bold text-label-bold text-secondary hover:underline cursor-pointer" href="#forgot">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember checklist */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label className="font-body-small text-body-small text-on-surface-variant select-none cursor-pointer" htmlFor="remember">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Primary form submission action trigger */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#fdadc7] hover:bg-[#ffb0ca] text-[#7a3d54] hover:shadow-md transition-all active:scale-[0.98] font-label-bold text-label-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Log In</span>
                  )}
                </button>

                {/* divider visualizer */}
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                  <span className="flex-shrink mx-3 text-on-surface-variant font-caption text-[11px] uppercase tracking-wider font-bold">
                    or
                  </span>
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                </div>

                {/* Social Login Button */}
                <button
                  type="button"
                  className="w-full py-2.5 border border-outline-variant rounded-lg font-label-bold text-label-bold flex items-center justify-center gap-2.5 hover:bg-surface-container-low transition-colors cursor-pointer text-primary"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

              </form>
            )}

            <footer className="pt-4 text-center">
              <p className="text-body-small text-on-surface-variant">
                Don't have an account?{" "}
                <Link className="font-label-bold text-secondary-dark hover:underline" href="/signup">
                  Sign Up
                </Link>
              </p>
            </footer>

          </div>
        </section>

      </main>
    </div>
  );
}
