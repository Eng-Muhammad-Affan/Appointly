export const LeftSide = () => {
  return (
    <section className="hidden md:flex flex-1 bg-[#FFF9E6] relative items-center justify-center p-12 overflow-hidden border-r border-outline-variant/10">
      <div className="max-w-md w-full text-center space-y-8 z-10">
        {/* Pulsing Visual Container */}
        <div className="flex justify-center transition-all duration-300">
          <img
            alt="Appointly community scheduling flat vector illustration"
            className="w-[380px] h-auto object-contain transform hover:scale-[1.01] transition-transform duration-500"
            src="/images/signup-user-illustration.png"
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-h1 text-h1 text-primary tracking-tight font-black">
            Join Appointly.
          </h1>
          <p className="font-h2 text-h2 text-on-surface-variant font-normal">
            Book smarter.
          </p>
        </div>
      </div>

      {/* Abstract background auroras */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-36 h-36 rounded-full bg-[#F6A7C1] opacity-15 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-52 h-52 rounded-lg rotate-12 bg-[#92E889] opacity-15 blur-2xl" />
      </div>
    </section>
  );
};
