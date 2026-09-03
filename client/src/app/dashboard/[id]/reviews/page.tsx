import Image from "next/image";

const ReviewsPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Content */}
        <div className="p-margin-desktop max-w-[1400px] mx-auto w-full space-y-xl">
          {/* Page Title Section */}
          <div>
            <h2 className="font-h1 text-h1 text-on-background">
              Review Insights
            </h2>
            <p className="font-body-base text-on-surface-variant mt-xs">
              4.9 stars across 128 reviews • Keep up the great work!
            </p>
          </div>

          {/* Analytics Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Overall Satisfaction */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
              <p className="font-label-bold text-on-surface-variant mb-md">
                Overall Satisfaction
              </p>
              <div className="flex items-baseline gap-sm mb-lg">
                <span className="text-[48px] font-bold leading-none">4.9</span>
                <span className="text-on-surface-variant font-label-bold">
                  / 5
                </span>
              </div>
              <div className="space-y-sm">
                {/* 5 Stars Bar */}
                <div className="flex items-center gap-sm">
                  <span className="text-caption w-4">5</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                {/* 4 Stars Bar */}
                <div className="flex items-center gap-sm">
                  <span className="text-caption w-4">4</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "12%" }}
                    ></div>
                  </div>
                </div>
                {/* 3 Stars Bar */}
                <div className="flex items-center gap-sm">
                  <span className="text-caption w-4">3</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "2%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Rate */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <p className="font-label-bold text-on-surface-variant mb-md">
                  Response Rate
                </p>
                <div className="flex items-baseline gap-sm">
                  <span className="text-[48px] font-bold leading-none text-secondary">
                    92%
                  </span>
                </div>
              </div>
              <div className="bg-[#92E889]/10 text-[#2E7D32] px-md py-sm rounded-lg flex items-center justify-between mt-lg">
                <span className="font-label-bold">On track</span>
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">
                    trending_up
                  </span>
                  <span className="text-caption font-bold">
                    +4% from last mo
                  </span>
                </div>
              </div>
            </div>

            {/* Review Volume */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
              <p className="font-label-bold text-on-surface-variant mb-md">
                Review Volume
              </p>
              <div className="h-24 flex items-end justify-between gap-sm pt-md">
                <div
                  className="w-full bg-outline-variant/30 h-[40%] rounded-t-sm"
                  title="Jan"
                ></div>
                <div
                  className="w-full bg-outline-variant/30 h-[60%] rounded-t-sm"
                  title="Feb"
                ></div>
                <div
                  className="w-full bg-outline-variant/30 h-[55%] rounded-t-sm"
                  title="Mar"
                ></div>
                <div
                  className="w-full bg-outline-variant/30 h-[80%] rounded-t-sm"
                  title="Apr"
                ></div>
                <div
                  className="w-full bg-secondary h-[95%] rounded-t-sm"
                  title="May"
                ></div>
                <div
                  className="w-full bg-secondary-container h-[70%] rounded-t-sm"
                  title="Jun"
                ></div>
              </div>
              <div className="flex justify-between mt-sm text-caption text-on-surface-variant px-xs">
                <span>Jan</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          {/* Review Management Section */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10 overflow-hidden">
            {/* Filters Tabs */}
            <div className="flex border-b border-outline-variant/20 px-lg pt-lg">
              <button
                type="button"
                className="px-lg py-md font-label-bold text-primary border-b-2 border-secondary transition-all"
              >
                All
              </button>
              <button
                type="button"
                className="px-lg py-md font-label-bold text-on-surface-variant hover:text-primary transition-all"
              >
                Unreplied (12)
              </button>
              <button
                type="button"
                className="px-lg py-md font-label-bold text-on-surface-variant hover:text-primary transition-all"
              >
                5 Stars
              </button>
              <button
                type="button"
                className="px-lg py-md font-label-bold text-on-surface-variant hover:text-primary transition-all"
              >
                Critical
              </button>
            </div>

            {/* Review List */}
            <div className="divide-y divide-outline-variant/10">
              {/* Review Item 1 */}
              <div className="p-lg hover:bg-surface-container-low transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-lg">
                  <div className="flex-shrink-0">
                    <Image
                    width={100}
                    height={100}
                      className="w-12 h-12 rounded-full object-cover"
                      alt="A portrait of a satisfied female client in a modern, brightly lit apartment. Her expression is genuinely happy, reflecting a high-quality service experience. The soft, natural lighting and minimalist background align with the premium brand aesthetic of Appointly."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVuGsMzqsug6OtzZaPfmwnBFm7L1s_r1mLiMeuKvv-ulFZh2RiD6vXtoCu-tNi2LB3-GIDwjImZgu4-BTZeBvOt6lbvAQYqeBEwZgRs3ZvsIo3aO4YAV7jS6CG4mjwhpqUX6gGxm61DnEnPLcQc1LXyo1vhCIHrtOal7cmz7lFoncr4o0m_ngO6n5SXsK1Kdh90-4kJTiBNt5JRSQeEfNV_WwPGFQtS7orurCKcN7-wax7_WY7rDGJRDtG7onc2OqvNEiw0T3zJdRU"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-sm">
                      <div>
                        <h4 className="font-h4 text-on-background">
                          Elena Richardson
                        </h4>
                        <p className="text-caption text-on-surface-variant">
                          Signature Hydrafacial • June 12, 2024
                        </p>
                      </div>
                      <div className="flex items-center gap-xs mt-sm md:mt-0">
                        <div className="flex text-secondary">
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold px-sm py-xs rounded-full">
                          Responded
                        </span>
                      </div>
                    </div>
                    <p className="font-body-base text-on-surface mb-lg">
                      Absolutely incredible experience. My skin has never looked
                      better. The attention to detail and the ambiance of the
                      studio were just perfect. I've already booked my next
                      appointment!
                    </p>
                    <div className="flex items-center gap-md">
                      <button
                        type="button"
                        className="bg-surface-container text-primary font-label-bold px-lg py-sm rounded-lg hover:bg-surface-container-high transition-colors active:scale-95"
                      >
                        View Reply
                      </button>
                      <button
                        type="button"
                        className="text-on-surface-variant hover:text-error font-label-bold px-sm py-sm rounded-lg transition-colors flex items-center gap-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          flag
                        </span>
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Item 2 */}
              <div className="p-lg hover:bg-surface-container-low transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-lg">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-12 h-12 rounded-full object-cover"
                      alt="Close-up portrait of a male client with a relaxed and satisfied expression, captured in a modern architectural setting with high-key lighting. The style is clean and professional, focusing on clear skin and a grooming-positive mood consistent with high-end wellness branding."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuiefZxCnS5DDrqIef9pWHPHA7WKUHr6eZvSPpc67EJTpCbnaSuze8jyHaEeSivp8zq5uV6Uy3b1MJP2b5OdbC5pfMOkPu5HFqD4KL8Ui0RYJow95ZmqdZSe6i7qvkNSUsf8jWwYCvx6BB0xW7AgiEzJuCe2OST60aaeD8rJeOYIblIE3pUGm8ZevRwlkeMHB25u3f62POvD0tR34BD1YZtc82tUb7S-UTNE4fzGacB3SdvQf_4K4bnZTLosipzvxAu2dRgZzr7efg"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-sm">
                      <div>
                        <h4 className="font-h4 text-on-background">
                          Marcus Thorne
                        </h4>
                        <p className="text-caption text-on-surface-variant">
                          Deep Tissue Massage • June 10, 2024
                        </p>
                      </div>
                      <div className="flex items-center gap-xs mt-sm md:mt-0">
                        <div className="flex text-secondary">
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold px-sm py-xs rounded-full">
                          Needs Response
                        </span>
                      </div>
                    </div>
                    <p className="font-body-base text-on-surface mb-lg">
                      Great session overall. The therapist was very
                      knowledgeable about sports injuries. Only reason it's not
                      5 stars was a 10-minute delay in starting, but the quality
                      of work was worth it.
                    </p>
                    <div className="flex items-center gap-md">
                      <button
                        type="button"
                        className="bg-secondary text-on-primary font-label-bold px-lg py-sm rounded-lg hover:opacity-90 transition-all active:scale-95"
                      >
                        Reply Now
                      </button>
                      <button
                        type="button"
                        className="text-on-surface-variant hover:text-error font-label-bold px-sm py-sm rounded-lg transition-colors flex items-center gap-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          flag
                        </span>
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Item 3 */}
              <div className="p-lg hover:bg-surface-container-low transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-lg">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-12 h-12 rounded-full object-cover"
                      alt="A portrait of a serene woman in a tranquil environment, featuring soft pastel tones and bright natural lighting. The aesthetic is modern-minimalist, conveying a sense of calm and rejuvenation following a professional beauty treatment. The visual style is crisp and inclusive."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4EdQh-nhKZswJyc045Ey8GfMFzlArf23HdDbICGkMNkCFpnHbgwpEpN6mpjdjbExv9MyV-OCdXYVIGOsJ4IokzYbcFOIjB7VTaGBknN9svT-JPnwpSAqXN_rKOVACEfpKWZnOpXbJjlU5asJHlqAqG1fxo1j_-tTa23I4qWE25C_p9Eicr7KTg4yXVRga_VHzcnNLcngFvw_jFRXPUcp43u43Ra3LX7cARPj6wF843TKbUszT-KClgGp9UMvQjimKB2thPEABT3r_"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-sm">
                      <div>
                        <h4 className="font-h4 text-on-background">
                          Aria Vane
                        </h4>
                        <p className="text-caption text-on-surface-variant">
                          Precision Haircut • June 8, 2024
                        </p>
                      </div>
                      <div className="flex items-center gap-xs mt-sm md:mt-0">
                        <div className="flex text-secondary">
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined filled-icon text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold px-sm py-xs rounded-full">
                          Responded
                        </span>
                      </div>
                    </div>
                    <p className="font-body-base text-on-surface mb-lg">
                      Exactly what I asked for. The stylist really took time to
                      understand my hair type and suggested some great products.
                      Very satisfied.
                    </p>
                    <div className="flex items-center gap-md">
                      <button
                        type="button"
                        className="bg-surface-container text-primary font-label-bold px-lg py-sm rounded-lg hover:bg-surface-container-high transition-colors active:scale-95"
                      >
                        View Reply
                      </button>
                      <button
                        type="button"
                        className="text-on-surface-variant hover:text-error font-label-bold px-sm py-sm rounded-lg transition-colors flex items-center gap-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          flag
                        </span>
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination / View More */}
            <div className="p-lg flex justify-center border-t border-outline-variant/10">
              <button
                type="button"
                className="text-secondary font-label-bold hover:underline"
              >
                Load more reviews
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Contextual */}
      <div className="fixed bottom-lg right-lg md:hidden">
        <button
          type="button"
          className="w-14 h-14 bg-secondary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
