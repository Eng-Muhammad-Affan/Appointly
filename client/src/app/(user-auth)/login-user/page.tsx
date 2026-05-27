"use client"
import Image from "next/image";
import Link from "next/link";
import { useLoginForm } from "./use-login-form";
import { Input, PasswordInput } from "@/components/common";
import { 
  Verified, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronLeft 
} from 'lucide-react';

const LoginPage = () => {
  const { rememberMe , setRememberMe,isSubmitted, login, loginWithGoogle, errors, isSubmitting, register } =
    useLoginForm();

  return (


<main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
  {/* Left Section: Visual & Branding */}
  <section className="hidden md:flex flex-1 flex-col justify-center items-center bg-tertiary p-8 relative">
    <div className="z-10 text-center max-w-md">
      <div className="mb-8 flex justify-center">
        {/* Brand Identity as Anchor */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-primary">Appointly</span>
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
        Your next appointment, <br/>
        <span className="text-secondary-container bg-primary px-2 py-1 inline-block">just a tap away.</span>
      </p>
      
      <div className="mt-6 flex gap-1 justify-center items-center text-on-surface-variant text-sm">
        <Verified size={18} />
        <span>Fast, secure, and always synchronized.</span>
      </div>
    </div>
    
    {/* Pattern Overlay (Subtle Tonal Layering) */}
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}
    ></div>
  </section>
  
  {/* Right Section: Login Form */}
  <section className="flex-1 bg-surface-container-lowest flex items-center justify-center px-4 md:px-8">
    <div className="w-full max-w-[400px]">
      {/* Mobile Header Only */}
      <div className="md:hidden mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Appointly</h1>
        <p className="text-base text-on-surface-variant">Welcome back! Please login to your account.</p>
      </div>
      
      <header className="mb-8 hidden md:block">
        <h2 className="text-3xl font-bold text-primary mb-2">Welcome back</h2>
        <p className="text-base text-on-surface-variant">Please enter your details to sign in.</p>
      </header>
      
      <form className="space-y-4" id="loginForm" onSubmit={login}>
        {/* Email Field */}
        <div className="space-y-1">
          <label className="font-semibold text-sm text-on-surface" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              className={`${errors.email ? "border border-red-600" : ""} w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base outline-none transition-all placeholder:text-outline-variant`} 
              placeholder="you@example.com" 
              type="email"
              id="email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
        </div>
        
        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-sm text-on-surface" htmlFor="password">
              Password
            </label>
            <a className="font-semibold text-sm text-secondary hover:underline" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              className={`${errors.password ? "border border-red-600" : ""} w-full pl-12 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-base outline-none transition-all placeholder:text-outline-variant`} 
              id="password" 
              placeholder="Enter your password" 
              type="password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" 
              id="togglePassword" 
              type="button"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-1">
          <input 
            className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" 
            id="remember" 
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="text-sm text-on-surface-variant" htmlFor="remember">
            Remember me for 30 days
          </label>
        </div>
        
        {/* Login Button */}
        <button 
          className="w-full py-3.5 bg-secondary-container text-black font-semibold text-sm rounded-lg transition-all active:scale-[0.98] mt-4 hover:opacity-90" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait ..." : "Login"}
        </button>
        
        {/* Divider */}
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-outline-variant opacity-20"></div>
          <span className="flex-shrink mx-4 text-on-surface-variant text-xs">OR</span>
          <div className="flex-grow border-t border-outline-variant opacity-20"></div>
        </div>
        
        {/* Social Login */}
        <button 
          className="w-full py-3 border border-outline-variant rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors" 
          type="button"
          onClick={loginWithGoogle}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          Continue with Google
        </button>
      </form>
      
      <footer className="mt-8 text-center">
        <p className="text-sm text-on-surface-variant">
          Don't have an account? 
          <a className="font-semibold text-secondary hover:underline ml-1" href="#">
            Sign Up
          </a>
        </p>
      </footer>
    </div>
  </section>
</main>
  );
};
export default LoginPage;
