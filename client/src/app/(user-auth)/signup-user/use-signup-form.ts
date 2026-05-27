// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import type z from "zod";
import { toast } from "sonner";

// _____ Zod validations ...
import { UserSignupFormSchema } from "./_validations";

// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export const signupWithGoogle = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/account",
  });
  if (error) {
    return { message: error.statusText };
  }

  if (data.url) {
    return redirect(data.url);
  }
};

export const useSignupForm = () => {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignupFormSchema),
    mode: "onChange",
  });

  // Watch password field for real-time requirements check
  const password = watch("password", "");

  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Check if all password requirements are met
  const allReqsMet = Object.values(passwordRequirements).every(Boolean);

  const signup = handleSubmit(
    async (_formData: z.infer<typeof UserSignupFormSchema>) => {
      if (_formData.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const { data, error } = await authClient.signUp.email({
        ..._formData,
        callbackURL: "/account"
      })
      if (error) {
        toast.error(error.message)
      }
      else {
        toast.success("Account created successfully");
        await authClient.getSession();
      }
    },
  );

  return {
    register,
    errors,
    isSubmitting,
    signup,
    confirmPassword,
    setConfirmPassword,
    agreeTerms,
    setAgreeTerms,
    passwordRequirements,
    allReqsMet,
    password,
  };
};