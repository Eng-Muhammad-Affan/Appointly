// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";

import type z from "zod";
import { toast } from "sonner";

// _____ Zod validations ...
import { UserSignupFormSchema } from "./_validations";

// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const useSignupForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    upper: false,
    number: false,
    special: false,
  });

  const methods = useForm({
    resolver: zodResolver(UserSignupFormSchema),
    mode: "onChange",
  });

  // Watch password field for real-time requirements check
  const password = methods.watch("password", "");

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

  const signup = methods.handleSubmit(
    async (_formData: z.infer<typeof UserSignupFormSchema>) => {
      if (_formData.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const response = await authClient.signUp.email({
        ..._formData,
        callbackURL: "/account",
      });
      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Account created successfully");
        await authClient.getSession();
      }
    },
  );

  return {
    methods,
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
