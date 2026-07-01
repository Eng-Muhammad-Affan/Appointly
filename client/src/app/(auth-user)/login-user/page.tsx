"use client";

import { Input } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/validations";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { LeftImageSection } from "./components";
import { ContinueWithGoogleButton } from "@/components/common/continue-with-google";
import Link from "next/link";

type LoginForm = z.infer<typeof LoginFormSchema>;

const LoginPage = () => {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  methods.watch();

  const login = methods.handleSubmit(async ({ email, password }) => {
    console.log("Submitting...", { email, password });

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/account",
      rememberMe,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login successful!");
    router.push("/account");
    await authClient.getSession();
  });

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      <LeftImageSection />

      <section className="flex-1 bg-surface-container-lowest flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-[400px]">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Welcome back
            </h2>
            <p className="text-base text-on-surface-variant">
              Please enter your details to sign in.
            </p>
          </header>

          <FormProvider {...methods}>
            <form
              id="loginForm"
              className="space-y-4"
              onSubmit={login}
              noValidate
            >
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <label htmlFor="remember">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="font-bold w-full py-3 bg-secondary-container rounded-lg"
              >
                {methods.formState.isSubmitting ? "Please wait..." : "Login"}
              </button>
              <ContinueWithGoogleButton />
              <footer className="pt-2 text-center">
                <p className="text-body-small text-on-surface-variant font-body-base">
                  Already have an account?{" "}
                  <Link
                    className="font-label-bold text-primary hover:underline"
                    href="/login-user"
                  >
                    Log In
                  </Link>
                </p>
              </footer>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
