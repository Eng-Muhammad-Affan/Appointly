"use client";
// _____ Hooks  ...
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
// _____ Libraries  ....
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// ____ types and validations ...
import { LoginFormSchema } from "@shared/validations";
import { toast } from "sonner";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const [rememberMe , setRememberMe] = useState(false)

  const login = handleSubmit(
    async ({ email, password }: z.infer<typeof LoginFormSchema>) => {
        const { data, error } = await authClient.signIn.email({ email, password, callbackURL: "/account", rememberMe: true })

        if(error) {
          toast.error(error.message)
        }
        else {
        toast.success("Login successfull !");
        router.push("/account");
        await authClient.getSession()
        }
    },
  );



  const loginWithGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account",
    });
    if (error) {
      return {
        message: error.statusText + error.message && error.message,
        status: error.status,
      };
    }
    if (data.url) {
      return redirect(data.url);
    }
  };

  return {
    register,
    loginWithGoogle,
    login,
    errors,
    isSubmitting,
    isSubmitted,
    rememberMe ,
    setRememberMe
  };
};
