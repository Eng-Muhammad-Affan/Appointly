"use client";
// _____ Components ...
import Link from "next/link";
import { Loader, Input, Label, Button } from "@/components/common";

// ____ Constant data ...
import CountriesData from "@shared/data/countries.json";
import { useSignupForm } from "./use-signup-form";
import Image from "next/image";
import { FormProvider } from "react-hook-form";

export default function SignupPage() {
  const { signupReq, methods } = useSignupForm();

  const {
    formState: { isSubmitting, errors },
    register,
  } = methods;
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-[100px] h-screen">
      <div className="w-[350px]">
        <FormProvider {...methods}>
          <form className={"flex flex-col gap-6"} onSubmit={signupReq}>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Get started with
                <strong className="text-pink font-bold">
                  &nbsp; Appointly
                </strong>
              </p>
            </div>
            <div className="grid gap-6">
              <Input
                name="name"
                label="Name"
                type="name"
                placeholder="John doe"
              />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
              />

              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <div className="grid gap-3">
                <Label htmlFor="Select your country">Select Country</Label>
                <select
                  id="country"
                  className="text-sm px-[10px] py-[5px] shadow-md shadow-gray-400"
                  {...register("country")}
                >
                  {CountriesData.map((country) => (
                    <option value={country.code} key={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && <p>{errors.country.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? "bg-pink/50 cursor-not-allowed flex justify-center items-center py-[20px]" : ""}`}
              >
                {isSubmitting ? <Loader /> : <span>Signup</span>}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="text-center text-sm">
              Already have an account?
              <Link href="/login-provider" className="text-pink font-bold">
                &nbsp; Login
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="flex flex-col flex-nowrap justify-center items-center w-[500px] h-[500px]">
        <Image
          src="/images/create-account.svg"
          alt="Image"
          width={450}
          height={450}
          className="object-cover w-auto h-auto m-auto"
        />
      </div>
    </div>
  );
}
