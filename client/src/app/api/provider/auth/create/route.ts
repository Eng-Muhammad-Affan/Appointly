// _____ Libraries ...
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { auth } from "@/lib/auth";
import { ProviderSignupAPIRequestSchema } from "@/features/provider-auth/create-account";
import { PaymentService } from "@/shared/services";

const validate = async (
  data: z.infer<typeof ProviderSignupAPIRequestSchema>,
): Promise<string[] | null> => {
  try {
    ProviderSignupAPIRequestSchema.parse(data);
    return null;
  } catch (err: any) {
    return err.issues.map((issue: any) => issue.message);
  }
};

export async function POST(req: NextRequest) {
  console.log("🚀 START - /api/provider/auth/create");

  const body = await req.json();
  console.log("📦 Body received");

  const errors = await validate(body);
  if (errors) {
    return NextResponse.json({ message: errors[0] }, { status: 422 });
  }
  console.log("✅ Validation passed");


  console.log("💳 Creating PaymentService...");
  const payments = new PaymentService();

  console.log("🏦 Creating Stripe account...");
  const accountResponse = await payments.CreateProviderAccount({ 
    country:body.country,
    email:body.email
   });

  console.log("✅ Stripe account created:", accountResponse.account_id);

  console.log("👤 Creating auth user...");
  const authResult = await auth.api.signUpEmail({
    body: {
      name: body.name,
      email: body.email,
      role: "PROVIDER",
      password: body.password,
      stripe_account_id: accountResponse.account_id,
    },
  });
  console.log("✅ Auth user created:", authResult);

  if (accountResponse.status !== 201) {
    return NextResponse.json({ message: accountResponse.message }, { status: accountResponse.status });
  }

  console.log("🔗 Generating onboarding link...");
  const { message, url } = await payments.GenerateOnboardingLink({
    stripeAccountId: accountResponse.account_id as string,
    baseUrl: req.url,
  });
  console.log("✅ Onboarding link generated, URL exists:", !!url);

  if (!url) {
    console.log("❌ No URL returned, message:", message);
    return NextResponse.json({ message }, { status: 500 });
  }

  console.log("🔄 Redirecting to:", url);
  return NextResponse.json({
    url: url
  });
}
