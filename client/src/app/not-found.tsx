import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="w-full h-screen">
      <section className="h-full w-full flex flex-col gap-3 justify-center items-center">
        <Image
          src={"/images/not-found.png"}
          alt="not found image"
          width={300}
          height={300}
        />
        <h1 className="text-5xl font-bold">404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! We didn't found what you're looking for</p>

        <Link href={"/account"}>
          <button
            type="button"
            className="bg-secondary-container text-on-secondary-container px-lg py-md rounded-lg font-label-bold text-label-bold flex items-center gap-sm shadow-sm hover:brightness-95 active:scale-95 transition-all"
          >
            Open Account
          </button>
        </Link>
      </section>
    </main>
  );
}
