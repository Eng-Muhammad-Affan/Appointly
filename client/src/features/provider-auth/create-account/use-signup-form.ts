"use client";
// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";

// _____ Hooks ...
import { useForm } from "react-hook-form";

// _____ Libraries ...
import type { z } from "zod";
import axios from "axios";
import { toast } from "sonner";

// _____ Validations  ...
import { ProviderSignupAPIRequestSchema } from "./validations";
import { authClient } from "@/lib/auth-client";

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProviderSignupAPIRequestSchema),
    mode: "onChange",
  });

  // _____ Function for signup post request ...
const signup = async (
  formData: z.infer<typeof ProviderSignupAPIRequestSchema>,
) => {
  const { data } = await axios.post(
    "/api/provider/auth/create",
    formData,
  );
  if (!data.url) {
    toast.error(data.message);
  }
  window.document.location.href = data.url  
  authClient.getSession();
};


  const signupReq = handleSubmit(signup);

  return {
    register,
    signupReq,
    errors,
    isSubmitting,
  };
};
