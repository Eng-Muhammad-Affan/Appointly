import { Star } from "lucide-react";

const OverviewPage = () => {
  return (
    <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-x-hidden">
      {/* Header */}
      <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-primary">
            Good morning, Luxe Artistry
          </h1>
          <p className="font-body-base text-on-surface-variant mt-xs">
            Here's what's happening in your studio today.
          </p>
        </div>
        <div className="flex gap-sm">
          <span className="px-md py-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-caption font-label-bold flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">
              calendar_today
            </span>
            Oct 24, 2023
          </span>
        </div>
      </header>
      {/* Quick Stats Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow card-hover border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <span className="p-sm bg-secondary-fixed rounded-lg text-on-secondary-fixed">
              <span className="material-symbols-outlined">payments</span>
            </span>
            <span className="text-accent-success font-label-bold text-[12px] flex items-center">
              +12%
            </span>
          </div>
          <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">
            Total Earnings
          </p>
          <h2 className="text-h1 font-h1 mt-xs">$4,280.00</h2>
          <p className="text-caption text-on-surface-variant mt-sm">
            This month so far
          </p>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow card-hover border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <span className="p-sm bg-tertiary-fixed rounded-lg text-on-tertiary-fixed">
              <span className="material-symbols-outlined">event_available</span>
            </span>
            <span className="text-on-surface-variant font-label-bold text-[12px]">
              24 total
            </span>
          </div>
          <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">
            New Bookings
          </p>
          <h2 className="text-h1 font-h1 mt-xs">18</h2>
          <p className="text-caption text-on-surface-variant mt-sm">
            In the last 7 days
          </p>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow card-hover border border-outline-variant/10">
          <div className="flex justify-between items-start mb-md">
            <span className="p-sm bg-accent-success/20 rounded-lg text-on-background">
              <span className="material-symbols-outlined">star</span>
            </span>
            <span className="text-on-surface-variant font-label-bold text-[12px]">
              128 reviews
            </span>
          </div>
          <p className="text-caption text-on-surface-variant uppercase tracking-wider font-label-bold">
            Average Rating
          </p>
          <h2 className="text-h1 font-h1 mt-xs">4.9</h2>
          <div className="flex gap-xs mt-sm">
            <span className="material-symbols-outlined text-primary text-[16px]">
              star
            </span>
            <span className="material-symbols-outlined text-primary text-[16px]">
              star
            </span>
            <span className="material-symbols-outlined text-primary text-[16px]">
              star
            </span>
            <span className="material-symbols-outlined text-primary text-[16px]">
              star
            </span>
            <span className="material-symbols-outlined text-primary text-[16px]">
              star
            </span>
          </div>
        </div>
      </section>

      {/* <!-- Main Content Area --> */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* <!-- Today's Schedule --> */}
        <section className="lg:col-span-8 flex flex-col gap-lg">
          <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow border border-outline-variant/10">
            <div className="flex justify-between items-center mb-xl">
              <h3 className="font-h2 text-h2 text-primary">Today's Schedule</h3>
              <button
                type="button"
                className="text-primary font-label-bold hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-md">
              {/* <!-- Appointment Item 1 --> */}
              <div className="flex items-center gap-lg p-md hover:bg-surface-container-low transition-colors rounded-lg group">
                <div className="flex flex-col items-center justify-center min-w-[64px]">
                  <span className="font-h4 text-h4">09:00</span>
                  <span className="text-caption text-on-surface-variant">
                    AM
                  </span>
                </div>
                <div className="w-1 h-12 bg-accent-pink rounded-full"></div>
                <div className="flex-1">
                  <p className="font-h4 text-h4">Sarah Jenkins</p>
                  <p className="text-body-small text-on-surface-variant">
                    Signature Hydrafacial
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-sm">
                  <span className="px-sm py-xs bg-surface-container-high rounded text-caption font-label-bold">
                    60 min
                  </span>
                  <button
                    type="button"
                    className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    more_vert
                  </button>
                </div>
              </div>
              <hr className="border-outline-variant/20" />
              {/* <!-- Appointment Item 2 --> */}
              <div className="flex items-center gap-lg p-md hover:bg-surface-container-low transition-colors rounded-lg group">
                <div className="flex flex-col items-center justify-center min-w-[64px]">
                  <span className="font-h4 text-h4">11:30</span>
                  <span className="text-caption text-on-surface-variant">
                    AM
                  </span>
                </div>
                <div className="w-1 h-12 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="font-h4 text-h4">Michael Chen</p>
                  <p className="text-body-small text-on-surface-variant">
                    Men's Executive Sculpt
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-sm">
                  <span className="px-sm py-xs bg-surface-container-high rounded text-caption font-label-bold">
                    45 min
                  </span>
                  <button
                    type="button"
                    className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    more_vert
                  </button>
                </div>
              </div>
              <hr className="border-outline-variant/20" />
              {/* <!-- Appointment Item 3 --> */}
              <div className="flex items-center gap-lg p-md hover:bg-surface-container-low transition-colors rounded-lg group">
                <div className="flex flex-col items-center justify-center min-w-[64px]">
                  <span className="font-h4 text-h4">02:00</span>
                  <span className="text-caption text-on-surface-variant">
                    PM
                  </span>
                </div>
                <div className="w-1 h-12 bg-accent-success rounded-full"></div>
                <div className="flex-1">
                  <p className="font-h4 text-h4">Aria Stark</p>
                  <p className="text-body-small text-on-surface-variant">
                    Bridal Consultation
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-sm">
                  <span className="px-sm py-xs bg-surface-container-high rounded text-caption font-label-bold">
                    90 min
                  </span>
                  <button
                    type="button"
                    className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    more_vert
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Earnings Overview Simplified Chart --> */}
          <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow border border-outline-variant/10">
            <div className="flex justify-between items-center mb-xl">
              <h3 className="font-h3 text-h3 text-primary">
                Earnings Overview
              </h3>
              <select className="bg-transparent border-none text-caption font-label-bold focus:ring-0 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-48 w-full flex items-end gap-sm px-md py-xs relative">
              {/* <!-- Simple Bar Visual --> */}
              <div className="flex-1 bg-surface-container-high rounded-t-lg h-[40%] hover:bg-accent-pink transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $420
                </div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-lg h-[65%] hover:bg-accent-pink transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $580
                </div>
              </div>
              <div className="flex-1 bg-primary rounded-t-lg h-[90%] relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $840
                </div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-lg h-[30%] hover:bg-accent-pink transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $310
                </div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-lg h-[75%] hover:bg-accent-pink transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $690
                </div>
              </div>
              <div className="flex-1 bg-surface-container-high rounded-t-lg h-[55%] hover:bg-accent-pink transition-colors relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $510
                </div>
              </div>
              <div className="flex-1 bg-accent-success rounded-t-lg h-[45%] relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-sm py-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  $440
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-md px-md text-caption text-on-surface-variant font-label-bold uppercase tracking-tight">
              <span>Mon</span>
              <span>Tue</span>
              <span className="text-primary font-bold">Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span className="text-accent-success">Sun</span>
            </div>
          </div>
        </section>
        {/* <!-- Sidebar Content --> */}
        <aside className="lg:col-span-4 flex flex-col gap-lg">
          {/* <!-- Pending Requests --> */}
          <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow border border-outline-variant/10">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-secondary">
                pending_actions
              </span>
              <h3 className="font-h3 text-h3 text-primary">Pending (3)</h3>
            </div>
            <div className="space-y-md">
              <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div className="flex justify-between items-start mb-sm">
                  <p className="font-label-bold">Elena Gilbert</p>
                  <span className="text-caption bg-surface-container-highest px-xs rounded">
                    New
                  </span>
                </div>
                <p className="text-body-small text-on-surface-variant mb-md">
                  Deep Tissue Massage • Tomorrow, 10:00 AM
                </p>
                <div className="flex gap-sm">
                  <button
                    type="button"
                    className="flex-1 py-xs bg-primary text-white text-caption font-label-bold rounded-lg active:scale-95 transition-transform"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-xs bg-white border border-outline text-primary text-caption font-label-bold rounded-lg active:scale-95 transition-transform"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div className="flex justify-between items-start mb-sm">
                  <p className="font-label-bold">Damon Salvatore</p>
                </div>
                <p className="text-body-small text-on-surface-variant mb-md">
                  Beard Grooming • Oct 26, 3:30 PM
                </p>
                <div className="flex gap-sm">
                  <button
                    type="button"
                    className="flex-1 py-xs bg-primary text-white text-caption font-label-bold rounded-lg active:scale-95 transition-transform"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-xs bg-white border border-outline text-primary text-caption font-label-bold rounded-lg active:scale-95 transition-transform"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Recent Reviews --> */}
          <div className="bg-surface-container-lowest p-lg rounded-xl card-shadow border border-outline-variant/10">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-h3 text-h3 text-primary">Recent Reviews</h3>
              <button
                type="button"
                className="material-symbols-outlined text-on-surface-variant"
              >
                open_in_new
              </button>
            </div>
            <div className="space-y-lg">
              <div className="relative">
                <div className="flex gap-sm mb-xs">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                </div>
                <p className="text-body-small italic text-on-surface mb-xs">
                  "Absolutely the best service I've had. The attention to detail
                  was incredible. Highly recommend Luxe Artistry!"
                </p>
                <p className="text-caption font-label-bold">
                  — Jessica W.{" "}
                  <span className="text-on-surface-variant font-normal">
                    2h ago
                  </span>
                </p>
              </div>
              <hr className="border-outline-variant/10" />
              <div className="relative">
                <div className="flex gap-sm mb-xs">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    star
                  </span>
                  <Star size={12} />
                </div>
                <p className="text-body-small italic text-on-surface mb-xs">
                  "Professional and fast. The studio environment is very
                  relaxing. Will definitely be back next month."
                </p>
                <p className="text-caption font-label-bold">
                  — David R.{" "}
                  <span className="text-on-surface-variant font-normal">
                    Yesterday
                  </span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default OverviewPage;
