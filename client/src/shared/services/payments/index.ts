import Stripe from "stripe";
import db from "@/db";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

type GetCountryResponse = {
  message: string;
  status: 404 | 422 | 200 | 500;
  data: {
    id: string;
    country: string;
    email: string;
    type: string;
  } | null;
};

export class PaymentService {
  stripe: Stripe;

  constructor() {
    console.log("Instantiating payment service ...");
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }

  // ____ For creating provider's express account on stripe ...
  async CreateProviderAccount({
    email,
    country,
  }: {
    email: string;
    country: string
  }) {
    try {
      const account = await this.stripe.accounts.create({
        type: "express",
        country: country,
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        }
      });
      // console.log(
      //   "\n[Payments]:[SUCCESS] ===> Account created successfully : ",
      //   account,
      // );

      const response = {
        message: "Account created successfully",
        status: 201,
        account_id: account.id,
      };

      // console.log("\n[Payments]:[RESPONSE] ===>  : ", response);

      return response;
    } catch (err: any) {
      // console.log(
      //   "\n[Payments]:[ERROR] ===> An error occured while creating stripe express account  : ",
      //   err,
      // );
      const response = {
        message: err.message,
        status: err.code,
        account_id: null,
      };
      return response;
    }
  }

  // ______ Generate account link (redirect URL for onboarding)
async GenerateOnboardingLink({
  stripeAccountId,
  baseUrl,
}: {
  stripeAccountId: string;
  baseUrl: string;
}) {
  console.log("\n========== ONBOARDING LINK DEBUG ==========");
  console.log("1. Input parameters:");
  console.log("   - stripeAccountId:", stripeAccountId);
  console.log("   - baseUrl:", baseUrl);
  
  try {
    // Step 1: Verify the account exists and get its status
    console.log("\n2. Retrieving Stripe account...");
    const account = await this.stripe.accounts.retrieve(stripeAccountId);
    console.log("   - Account found:", account.id);
    console.log("   - Account type:", account.type);
    console.log("   - Charges enabled:", account.charges_enabled);
    console.log("   - Payouts enabled:", account.payouts_enabled);
    console.log("   - Details submitted:", account.details_submitted);
    console.log("   - Capabilities:", JSON.stringify(account.capabilities, null, 2));
    
    // Step 2: Construct URLs
    const refreshUrl = new URL("/create-account", baseUrl).toString();
    const returnUrl = new URL("/dashboard", baseUrl).toString();
    console.log("\n3. URLs being used:");
    console.log("   - Refresh URL:", refreshUrl);
    console.log("   - Return URL:", returnUrl);
    
    // Step 3: Attempt to create account link
    console.log("\n4. Creating account link...");
    const accountLink = await this.stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
    });
    
    console.log("\n5. SUCCESS! Account link created:");
    console.log("   - URL:", accountLink.url);
    console.log("   - Created:", accountLink.created);
    console.log("==========================================\n");
    
    return {
      message: "Account Linked successfully",
      url: accountLink.url,
    };
    
  } catch (err: any) {
    console.error("\n❌❌❌ ONBOARDING LINK FAILED ❌❌❌");
    console.error("Error details:", {
      type: err.type,
      code: err.code,
      statusCode: err.statusCode,
      message: err.message,
      param: err.param,
      stack: err.stack
    });
    console.error("==========================================\n");
    
    return {
      message: `Stripe error: ${err.message}`,
      url: null,
    };
  }
}

  // ______ Get provider's account info  ...
  async GetProviderInfo(accountId: string | null): Promise<GetCountryResponse> {
    let response: GetCountryResponse | null = null;
    console.log("\n[Payments]:[CALLING]GetProviderInfo() ...");

    if (!accountId) {
      response = {
        message: "Error : Account id not mentioned",
        status: 422,
        data: null,
      };
      console.log("\n[Payments]:[ERROR] Please mention account id ...");
      return response;
    }

    const account = await this.stripe.accounts.retrieve(accountId);
    console.log("\n[Payments]:[SUCCESS]  Fetched provider info : ", account);
    // e.g. "US", "AU"

    response = {
      data: {
        id: account.id,
        email: account.email as string,
        country: account.country as string,
        type: account.type,
      },
      message: "Fetched provider country successfully",
      status: 200,
    };
    console.log("\n[Payments]:[RESPONSE] : ", response);

    return response;
  }

  // ______ Method for disconnecting provider's stripe account ...
  async DisconnectStripeAccount(email: string): Promise<{
    message: string;
    status: 404 | 200 | 422;
  }> {
    // _______ Initialized response ...
    let response: {
      message: string;
      status: 404 | 200 | 422;
    } = {
      message: "",
      status: 200,
    };

    if (!email) {
      response = {
        message: "Invalid email",
        status: 422,
      };
      console.log("\n[Payments]:[RESPONSE] : ", response);
      return response;
    }

    // _______ Check if user exists  ...
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!existingUser) {
      response = {
        message: "Provider not found",
        status: 404,
      };
      console.log("\n[Payments]:[RESPONSE] : ", response);
      return response;
    }

    const stripeAccountId = existingUser.stripe_account_id as string;

    const deleted = await this.stripe.accounts.del(stripeAccountId);
    console.log("Deleted Stripe account:", deleted);
    console.log("\n[Payments]:[SUCCESS]  Deleted stripe account : ", deleted);

    response = { message: "Stripe disconnected successfully", status: 200 };
    console.log("\n[Payments]:[RESPONSE] : ", response);
    return response;
  }
}
