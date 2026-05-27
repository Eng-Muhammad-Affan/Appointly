import {ServiceDetailsPage} from "@/features/service-details"
import { 
  ChevronRight, 
  Star, 
  CheckCircle, 
  ChevronLeft,
  Calendar,
  Clock,
  TrendingDown
} from 'lucide-react';

const ServiceDetails = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
  {/* Breadcrumb */}
  <nav className="flex items-center gap-2 mb-6 text-sm text-outline">
    <span>Services</span>
    <ChevronRight size={16} />
    <span>Wellness</span>
    <ChevronRight size={16} />
    <span className="text-on-surface font-medium">Swedish Massage</span>
  </nav>
  
  <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 items-start">
    {/* Left Column */}
    <section className="space-y-8">
      <div>
        <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">WELLNESS</span>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Swedish Massage</h1>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-base font-medium">by Elena Rodriguez</span>
          <div className="flex items-center gap-0.5 text-secondary">
            <Star size={16} className="fill-secondary" />
            <Star size={16} className="fill-secondary" />
            <Star size={16} className="fill-secondary" />
            <Star size={16} className="fill-secondary" />
            <Star size={16} className="fill-secondary" />
            <span className="text-on-surface-variant text-sm ml-1">4.9 (128 reviews)</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-[#2D5A27] rounded-lg text-xs font-semibold">
            <CheckCircle size={16} />
            <span>250+ Appointments</span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold text-primary">$85 <span className="text-base font-normal text-on-surface-variant">/ session</span></span>
        </div>
      </div>

      <div className="h-[400px] rounded-xl overflow-hidden shadow-sm">
        <img 
          alt="Swedish Massage" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJb2IQPIGd5eSkOipeoVd-HwGVjjODnxlS4xMpvD5FnhYuTQ_gEJ-5DqyYdpAjLwNxzxnDBH9Ar0nTZvabm3gsl_GMczJanTPoOkOvPFMhuWdMGBJ7RYT9-M29tYF4a-3icN9MWXb4grzCLCeUOmu_00GCQ3TGh2eEJll1FieddHrkyeH1LNaibdyCWmiW6_E2Ms8NVDtpfcGkgQujGBmLxwisYSFscfOsUlE1BAk6IPNjZuMjDNpSYv4G3_BzrnoVHBX1upP7ZfdH"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">About This Service</h3>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Indulge in a classic Swedish Massage designed to melt away stress and tension. This therapeutic technique uses long, gliding strokes and gentle kneading to improve circulation, ease muscle stiffness, and promote total body relaxation.
        </p>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Whether you're looking to recover from a long week or simply want to treat yourself to some much-needed self-care, this session is tailored to your comfort level and specific areas of tension.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">What's Included</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent fill-accent" />
            <span className="text-base">60-minute full body session</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent fill-accent" />
            <span className="text-base">Organic essential oils</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent fill-accent" />
            <span className="text-base">Heated massage table</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent fill-accent" />
            <span className="text-base">Post-treatment herbal tea</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Availability</h3>
        <div className="flex flex-wrap gap-2">
          <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">Mon 9:00 - 18:00</div>
          <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">Tue 9:00 - 18:00</div>
          <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">Wed 9:00 - 18:00</div>
          <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">Fri 10:00 - 19:00</div>
          <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">Sat 10:00 - 15:00</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Reviews</h3>
          <button className="text-secondary font-semibold text-sm hover:underline">See All Reviews →</button>
        </div>
        <div className="grid gap-4">
          {/* Review Card 1 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">JD</div>
              <div>
                <div className="font-semibold">Jane Doe</div>
                <div className="flex text-secondary">
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                </div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant">Absolutely wonderful session. Elena has magic hands and the environment was incredibly relaxing. Will definitely be back!</p>
          </div>
          
          {/* Review Card 2 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">MS</div>
              <div>
                <div className="font-semibold">Mark Smith</div>
                <div className="flex text-secondary">
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                  <Star size={14} className="fill-secondary" />
                </div>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant">Highly professional. The deep tissue work really helped my back pain. The booking process was so fast too.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Right Column: Booking Panel */}
    <aside className="sticky top-[88px] bg-surface-container-lowest p-6 rounded-xl shadow-lg border border-outline-variant/10">
      <h3 className="text-xl font-bold mb-6">Book This Service</h3>
      
      {/* Calendar Component */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">October 2026</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-outline mb-2">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {/* Days */}
          <button className="h-10 w-10 flex items-center justify-center rounded-lg text-outline">27</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg text-outline">28</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg text-outline">29</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg text-outline">30</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">1</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high relative">
            2
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></span>
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">3</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">4</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">5</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary/20 font-bold border border-secondary/30">6</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">7</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high relative">
            8
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></span>
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-black font-bold">9</button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high">10</button>
        </div>
      </div>
      
      {/* Available Slots */}
      <div className="space-y-4 mb-8">
        <h4 className="text-base font-bold">Available Slots</h4>
        <div className="space-y-2">
          {/* Slot 1 */}
          <div className="flex items-center justify-between p-4 border-l-4 border-accent bg-surface-container-low rounded-lg">
            <div>
              <div className="font-semibold">09:00 AM - 10:00 AM</div>
              <span className="text-[10px] bg-accent text-[#2D5A27] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <TrendingDown size={10} /> 20% Off
              </span>
            </div>
            <span className="text-sm font-bold text-[#2D5A27]">$68</span>
          </div>
          
          {/* Slot 2 */}
          <div className="flex items-center justify-between p-4 border border-outline-variant/10 hover:border-secondary transition-colors rounded-lg cursor-pointer">
            <div className="font-semibold">11:30 AM - 12:30 PM</div>
            <span className="text-sm font-bold">$85</span>
          </div>
          
          {/* Slot 3 */}
          <div className="flex items-center justify-between p-4 border border-outline-variant/10 hover:border-secondary transition-colors rounded-lg cursor-pointer">
            <div className="font-semibold">02:00 PM - 03:00 PM</div>
            <span className="text-sm font-bold">$85</span>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-accent hover:bg-accent/80 text-black py-4 rounded-lg font-semibold text-base transition-all transform active:scale-[0.98] shadow-sm">
        Book My Slot
      </button>
      <p className="text-center text-xs text-outline mt-4">No payment required until after service.</p>
    </aside>
  </div>
</main>
  )
};

export default ServiceDetails;
