const WalletPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-margin-desktop mt-xl space-y-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <p className="font-label-bold text-label-bold text-on-surface-variant mb-xs">
              Total Balance
            </p>
            <h3 className="font-h1 text-h1 text-primary">$4,850.00</h3>
          </div>
          <div className="mt-lg">
            <button
              type="button"
              className="w-full bg-brand-secondary text-primary font-label-bold text-label-bold py-sm rounded-lg hover:shadow-md transition-all active:scale-95"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
          <p className="font-label-bold text-label-bold text-on-surface-variant mb-xs">
            Pending Payouts
          </p>
          <h3 className="font-h1 text-h1 text-primary">$1,240.50</h3>
          <div className="mt-md flex items-center gap-xs text-brand-accent">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            <span className="font-caption text-caption text-on-surface-variant font-semibold">
              +12% from last week
            </span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
          <p className="font-label-bold text-label-bold text-on-surface-variant mb-xs">
            Lifetime Earnings
          </p>
          <h3 className="font-h1 text-h1 text-primary">$62,400.00</h3>
          <div className="mt-md p-xs bg-surface-container-low rounded-lg inline-flex items-center">
            <span className="font-caption text-caption text-on-surface-variant px-sm py-1">
              Top 5% of Providers
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
          <div className="flex items-center justify-between mb-lg">
            <h4 className="font-h3 text-h3 text-primary">Payout Schedule</h4>
            <span className="material-symbols-outlined text-on-surface-variant">
              calendar_today
            </span>
          </div>
          <div className="flex items-center gap-lg bg-surface-container-low p-lg rounded-lg">
            <div className="bg-brand-accent/20 p-md rounded-full">
              <span className="material-symbols-outlined text-brand-accent">
                event_repeat
              </span>
            </div>
            <div>
              <p className="font-body-base text-body-base text-primary font-semibold">
                Next automatic transfer
              </p>
              <p className="font-body-small text-body-small text-on-surface-variant">
                Your funds will be deposited on{" "}
                <span className="font-bold">Friday, Oct 27th</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10">
          <div className="flex items-center justify-between mb-lg">
            <h4 className="font-h3 text-h3 text-primary">Payout Methods</h4>
            <button
              type="button"
              className="text-brand-secondary font-label-bold text-label-bold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center gap-md p-md border border-outline-variant/20 rounded-lg">
            <div className="w-12 h-8 bg-surface-container-highest rounded flex items-center justify-center font-bold text-on-surface-variant">
              BANK
            </div>
            <div>
              <p className="font-label-bold text-label-bold text-primary">
                Chase Checking
              </p>
              <p className="font-caption text-caption text-on-surface-variant">
                •••• 4242
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full mt-lg border-2 border-dashed border-outline-variant/40 py-sm rounded-lg text-on-surface-variant font-label-bold text-label-bold hover:bg-surface-container-low transition-colors"
          >
            + Add New Method
          </button>
        </div>
      </div>
      <section className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/10 overflow-hidden">
        <div className="p-lg border-b border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-md">
          <h4 className="font-h3 text-h3 text-primary">Transaction History</h4>
          <div className="flex gap-sm">
            <div className="relative">
              <input
                className="pl-10 pr-md py-sm border border-outline-variant bg-surface rounded-lg font-body-small text-body-small focus:border-primary focus:ring-0 outline-none w-full md:w-64"
                placeholder="Search transactions..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-md">
                search
              </span>
            </div>
            <button
              type="button"
              className="px-md py-sm bg-surface-container-high rounded-lg font-label-bold text-label-bold text-primary hover:bg-surface-container-highest transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
                  Date
                </th>
                <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
                  Description
                </th>
                <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant">
                  Status
                </th>
                <th className="px-lg py-md font-label-bold text-label-bold text-on-surface-variant text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-md font-body-small text-body-small text-on-surface">
                  Oct 24, 2023
                </td>
                <td className="px-lg py-md">
                  <p className="font-label-bold text-label-bold text-primary">
                    Appointment - Sarah Jenkins
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Deep Tissue Massage (60 min)
                  </p>
                </td>
                <td className="px-lg py-md">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-accent/20 text-on-tertiary-container">
                    Completed
                  </span>
                </td>
                <td className="px-lg py-md font-label-bold text-label-bold text-brand-accent text-right">
                  +$125.00
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-md font-body-small text-body-small text-on-surface">
                  Oct 23, 2023
                </td>
                <td className="px-lg py-md">
                  <p className="font-label-bold text-label-bold text-primary">
                    Payout to Bank
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Transfer to Chase (•••• 4242)
                  </p>
                </td>
                <td className="px-lg py-md">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant">
                    Pending
                  </span>
                </td>
                <td className="px-lg py-md font-label-bold text-label-bold text-primary text-right">
                  -$2,100.00
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-md font-body-small text-body-small text-on-surface">
                  Oct 22, 2023
                </td>
                <td className="px-lg py-md">
                  <p className="font-label-bold text-label-bold text-primary">
                    Appointment - Michael Chen
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Consultation Session
                  </p>
                </td>
                <td className="px-lg py-md">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-accent/20 text-on-tertiary-container">
                    Completed
                  </span>
                </td>
                <td className="px-lg py-md font-label-bold text-label-bold text-brand-accent text-right">
                  +$85.00
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-md font-body-small text-body-small text-on-surface">
                  Oct 21, 2023
                </td>
                <td className="px-lg py-md">
                  <p className="font-label-bold text-label-bold text-primary">
                    Appointment - Elena Rodriguez
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Standard Service Pack
                  </p>
                </td>
                <td className="px-lg py-md">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-accent/20 text-on-tertiary-container">
                    Completed
                  </span>
                </td>
                <td className="px-lg py-md font-label-bold text-label-bold text-brand-accent text-right">
                  +$210.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-lg flex justify-center bg-surface-container-lowest">
          <button
            type="button"
            className="font-label-bold text-label-bold text-brand-secondary hover:bg-brand-secondary/10 px-xl py-sm rounded-lg transition-colors"
          >
            View More Transactions
          </button>
        </div>
      </section>
    </div>
  );
};

export default WalletPage;
