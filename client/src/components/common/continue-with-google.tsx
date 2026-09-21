import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export const ContinueWithGoogleButton = () => {
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
      return window.location.href = data.url;
    }
  };

  return (
    <button
      className="w-full py-3 border border-outline-variant rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
      type="button"
      onClick={loginWithGoogle}
    >
      <Image
        src={"/icons/google.svg"}
        alt="cotinue with google"
        width={20}
        height={20}
      />
      Continue with Google
    </button>
  );
};
