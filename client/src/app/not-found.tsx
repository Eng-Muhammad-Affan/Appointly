export default function NotFoundPage() {
    return (
        <main className="flex-grow"><div className="flex flex-col w-full items-center px-margin-mobile md:px-margin-desktop py-12 md:py-16">
            <section className="max-w-3xl w-full flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-label-bold text-caption uppercase tracking-wider">Error 404 • Page Not Found</span>
                </div>
                <div className="relative w-full max-w-md aspect-[4/3] mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary-fixed/40 via-surface-container-lowest/80 to-tertiary-fixed/30 rounded-full blur-2xl -z-10 transform scale-90"></div>
                    <div className="relative w-full h-full rounded-2xl bg-surface-container-lowest shadow-md flex items-center justify-center p-6 transition-transform duration-300 hover:scale-[1.01]">
                        <img alt="404 Calendar Illustration" className="w-full h-full object-contain drop-shadow-sm select-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuHrAWXScgExiQXCVVY79-9B6LtrX7VfjTChMBazpOmDxIIejjhES2xq8guf5ZiufCIJbB3viL4qNHR8yKpJJjYyp0KH6g0JQU0uPxXObbKbW_RX34W9TkAbNQrVZqC6fizw5dHnSxt8_XtY3I8J6ObUBqV4XfEDTE3je9mbxnUAmv7Es90ft64WSWP9z29ITcKADXYg_5PfYCof8T80YM6xlu5lHPnDqbNRUL6DwnGcqIaRkYISH73A" />
                    </div>
                </div>
                <h1 className="font-h1 text-h1 text-primary tracking-tight mb-3">
                    Oops! We couldn't book this page.
                </h1>
                <p className="font-body-base text-body-base text-on-surface-variant max-w-xl mx-auto mb-8">
                    The link you followed may be broken, expired, or the service appointment might have been moved or removed from our schedule.
                </p>
                <div className="w-full max-w-lg mb-8">
                    <form className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-sm p-1.5 focus-within:shadow-md transition-shadow">
                        <span className="material-symbols-outlined text-outline ml-3 select-none">search</span>
                        <input className="w-full bg-transparent border-0 focus:ring-0 text-on-surface placeholder:text-outline font-body-base text-body-small px-3 py-2 outline-none" placeholder="Search services, providers, or help topics..." type="text" />
                        <button className="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5" type="submit">
                            <span>Search</span>
                        </button>
                    </form>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                    <a className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-5 py-3 rounded-lg shadow-sm transition-all hover:shadow" href="#">
                        <span className="material-symbols-outlined text-body-base">home</span>
                        <span>Return to Homepage</span>
                    </a>
                    <a className="flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-bold text-label-bold px-5 py-3 rounded-lg shadow-sm transition-all" href="#">
                        <span className="material-symbols-outlined text-body-base">explore</span>
                        <span>Browse Services</span>
                    </a>
                    <a className="flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-bold text-label-bold px-5 py-3 rounded-lg shadow-sm transition-all" href="#">
                        <span className="material-symbols-outlined text-body-base">help</span>
                        <span>Help & Support</span>
                    </a>
                </div>
            </section>
            <section className="max-w-5xl w-full mt-16 pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4">
                    <div>
                        <p className="font-label-bold text-caption text-secondary uppercase tracking-wider mb-1">Quick Navigation</p>
                        <h2 className="font-h3 text-h3 text-primary">Popular destinations to get you back on track</h2>
                    </div>
                    <p className="font-body-small text-body-small text-on-surface-variant mt-1 md:mt-0">
                        Choose a path below or contact our team if you need immediate assistance.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a className="group relative flex flex-col justify-between bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5" href="#">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-4 group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <h3 className="font-h4 text-h4 text-primary group-hover:text-secondary transition-colors mb-2">
                                Book a Service
                            </h3>
                            <p className="font-body-small text-body-small text-on-surface-variant">
                                Explore hair styling, wellness, coaching, tutoring, and more near you.
                            </p>
                        </div>
                        <div className="flex items-center gap-1 font-label-bold text-caption text-primary mt-6 pt-4">
                            <span>Find appointments</span>
                            <span className="material-symbols-outlined text-caption group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </a>
                    <a className="group relative flex flex-col justify-between bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5" href="#">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-4 group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <h3 className="font-h4 text-h4 text-primary group-hover:text-secondary transition-colors mb-2">
                                Provider Portal
                            </h3>
                            <p className="font-body-small text-body-small text-on-surface-variant">
                                Access your calendar, set availability, and manage client bookings seamlessly.
                            </p>
                        </div>
                        <div className="flex items-center gap-1 font-label-bold text-caption text-primary mt-6 pt-4">
                            <span>Provider login</span>
                            <span className="material-symbols-outlined text-caption group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </a>
                    <a className="group relative flex flex-col justify-between bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5" href="#">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface mb-4 group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined">account_circle</span>
                            </div>
                            <h3 className="font-h4 text-h4 text-primary group-hover:text-secondary transition-colors mb-2">
                                Your Bookings
                            </h3>
                            <p className="font-body-small text-body-small text-on-surface-variant">
                                Check upcoming visits, reschedule times, or review receipts and details.
                            </p>
                        </div>
                        <div className="flex items-center gap-1 font-label-bold text-caption text-primary mt-6 pt-4">
                            <span>Manage visits</span>
                            <span className="material-symbols-outlined text-caption group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </a>
                    <a className="group relative flex flex-col justify-between bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:bg-surface-container-low hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5" href="#">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container mb-4 group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <h3 className="font-h4 text-h4 text-primary group-hover:text-secondary transition-colors mb-2">
                                Customer Care
                            </h3>
                            <p className="font-body-small text-body-small text-on-surface-variant">
                                Reach out to our 24/7 dedicated support desk for reservation inquiries.
                            </p>
                        </div>
                        <div className="flex items-center gap-1 font-label-bold text-caption text-primary mt-6 pt-4">
                            <span>Get live help</span>
                            <span className="material-symbols-outlined text-caption group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </a>
                </div>
            </section>
            <aside className="mt-16 flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-lowest/80 text-on-surface-variant text-caption font-caption shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span>All Appointly scheduling services are running normally</span>
                <span className="text-outline-variant">•</span>
                <a className="font-label-bold text-primary hover:underline" href="#">System Status</a>
            </aside>
        </div></main>
    )
}