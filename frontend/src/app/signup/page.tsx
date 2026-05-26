"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle2, Loader2, Check, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Real-time password requirement validators
  const [reqs, setReqs] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setReqs({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  const allReqsMet = reqs.length && reqs.upper && reqs.number && reqs.special;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || password !== confirmPassword || !agreeTerms || !allReqsMet) {
      return;
    }

    setLoading(true);
    // Simulate API registration workflow
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen selection:bg-secondary-container">
      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Branding & Illustration */}
        <section className="hidden md:flex flex-1 bg-[#FFF9E6] relative items-center justify-center p-12 overflow-hidden border-r border-outline-variant/10">
          <div className="max-w-md w-full text-center space-y-8 z-10">
            
            {/* Pulsing Visual Container */}
            <div className="flex justify-center transition-all duration-300">
              <img
                alt="Appointly community scheduling flat vector illustration"
                className="w-[380px] h-auto object-contain transform hover:scale-[1.01] transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujqg8ttkv0UaIUTrhNggUOmWiG927u56TPKVWCNk6Xp_MPGRjTjkOUrZW0ihcNxo8jvC4osG9A5iQYA3aiBJYGkLc-5ZQJH50NCGS2e8NaNqdgqsyuRg37LfdIh3gAVDSp3wROtMVBKWMYWytejLQD25TUEN0Au2V2BxgJD2va5vQuC7WJ0lEpHCbsz1LRD-k8v9F36sKhEZTd9UTNsiKZhjsLvI5te8LIvqt_-FuHttOAYH9FVTRE_W1jN"
              />
            </div>

            <div className="space-y-2">
              <h1 className="font-h1 text-h1 text-primary tracking-tight font-black">Join Appointly.</h1>
              <p className="font-h2 text-h2 text-on-surface-variant font-normal">Book smarter.</p>
            </div>
            
          </div>

          {/* Abstract background auroras representing high-trust "Structured Organic" movement */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-36 h-36 rounded-full bg-[#F6A7C1] opacity-15 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-52 h-52 rounded-lg rotate-12 bg-[#92E889] opacity-15 blur-2xl" />
          </div>
        </section>

        {/* Right Side: Signup Form */}
        <section className="flex-grow flex items-center justify-center p-6 md:p-12 bg-surface-container-lowest overflow-y-auto">
          <div className="max-w-[400px] w-full space-y-6 py-4">
            
            {/* Header info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold text-h3 font-h2 select-none">Appointly</span>
              </div>
              <h2 className="font-h1 text-h1 text-primary tracking-tight">Create an account</h2>
              <p className="text-body-base text-on-surface-variant">
                Experience the future of seamless scheduling.
              </p>
            </div>

            {success ? (
              /* Success Redirection slips */
              <div className="p-6 bg-[#92E889]/10 border border-[#92E889]/30 rounded-card text-center space-y-4 shadow-sm animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mx-auto">
                  <CheckCircle2 size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-body-base text-primary">Registration successful</h4>
                  <p className="text-caption text-on-surface-variant">
                    Congratulations! Your Appointly membership is locked in. Let's redirect you...
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-block w-full py-2 bg-primary text-white text-body-small font-label-bold rounded-lg"
                >
                  Continue to Sign In
                </Link>
              </div>
            ) : (
              /* Core Signup form content */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full name input */}
                <div className="space-y-1">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                  />
                </div>

                {/* Password password */}
                <div className="space-y-1">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-outline focus:border-primary focus:ring-0 focus:outline-none rounded-lg text-body-base transition-all focus:border-2 placeholder:text-outline-variant/60 font-medium"
                  />
                </div>

                {/* Real-time Requirements checklist block */}
                <div className="bg-surface-container-low p-3.5 rounded-lg space-y-2 border border-outline-variant/10">
                  <p className="text-caption font-label-bold text-on-surface-variant/70 uppercase text-[10px] tracking-wider">
                    Password requirements
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-small">
                    
                    <div className={`flex items-center gap-1.5 ${reqs.length ? "text-green-700 font-bold" : "text-on-surface-variant"}`}>
                      <Check size={14} className={reqs.length ? "text-green-600" : "text-outline opacity-40"} />
                      <span className="text-[12px]">8+ characters</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${reqs.upper ? "text-green-700 font-bold" : "text-on-surface-variant"}`}>
                      <Check size={14} className={reqs.upper ? "text-green-600" : "text-outline opacity-40"} />
                      <span className="text-[12px]">One uppercase</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${reqs.number ? "text-green-700 font-bold" : "text-on-surface-variant"}`}>
                      <Check size={14} className={reqs.number ? "text-green-600" : "text-outline opacity-40"} />
                      <span className="text-[12px]">One number</span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${reqs.special ? "text-green-700 font-bold" : "text-on-surface-variant"}`}>
                      <Check size={14} className={reqs.special ? "text-green-600" : "text-outline opacity-40"} />
                      <span className="text-[12px]">One special symbol</span>
                    </div>

                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-1">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="confirmPassword">
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
                    <p className="text-caption text-red-600 font-medium mt-1">Passwords do not match.</p>
                  )}
                </div>

                {/* Terms agreement checklist */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label className="text-body-small text-on-surface-variant select-none cursor-pointer" htmlFor="terms">
                    I agree to the{" "}
                    <a className="text-primary font-semibold hover:underline" href="#terms">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="text-primary font-semibold hover:underline" href="#privacy">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Create account primary button */}
                <button
                  type="submit"
                  disabled={loading || !agreeTerms || !allReqsMet}
                  className="w-full py-3 bg-[#92E889] hover:bg-[#7EDC73] text-black hover:shadow-md transition-all active:scale-[0.98] font-label-bold text-label-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>

                {/* divider separator */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                  <span className="flex-shrink mx-3 text-on-surface-variant font-caption text-[11px] uppercase tracking-wider font-bold">
                    or
                  </span>
                  <div className="flex-grow border-t border-outline-variant opacity-30" />
                </div>

                {/* Google Sign up button */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2.5 py-3 border border-outline-variant rounded-lg font-label-bold text-label-bold hover:bg-surface-container-low transition-colors cursor-pointer text-primary"
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

            <footer className="pt-2 text-center">
              <p className="text-body-small text-on-surface-variant font-body-base">
                Already have an account?{" "}
                <Link className="font-label-bold text-primary hover:underline" href="/login">
                  Log In
                </Link>
              </p>
            </footer>

          </div>
        </section>

      </main>

      {/* Simple absolute footer */}
      <footer className="md:fixed bottom-0 right-0 w-full md:w-1/2 p-4 bg-surface-container-lowest text-center border-t border-outline-variant/10 z-10">
        <p className="text-caption text-outline/70">
          © 2026 Appointly. Secure. Fast. Transparent scheduling.
        </p>
      </footer>
    </div>
  );
}
