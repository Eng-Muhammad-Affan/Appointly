"use client";
import { ChevronRight, Star, CheckCircle, ChevronLeft } from "lucide-react";
import { Calendar } from "./Calender";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useService } from "@/features/user/services";
import dayjs from "@/lib/dayjs";

import Image from "next/image";
import {
  BookingButton,
  useServiceDetails,
} from "@/features/user/service-details";
import { formatDate } from "@/utils/format-date";

const ServiceDetails = () => {
  const { id } = useParams() as { id: string };

  const { services, loading } = useService();

  const {
    selectedDate,
    getSlots,
    fetchClientService,
    slots,
    service,
    setService,
    setSelectedSlot,
    selectedSlot,
  } = useServiceDetails();

  useEffect(() => {
    if (id) {
      const result = services.find((service) => service.id === id);

      if (!result) {
        fetchClientService(id);
      } else {
        setService(result);
        getSlots(result);
      }
    }
  }, [id, fetchClientService, getSlots, services.find, setService]);

  const filteredSlots = useMemo(() => {
    // Log the actual type and value of slots
    // console.log('🔍 slots type:', typeof slots);
    // console.log('🔍 is slots an array?', Array.isArray(slots));
    // console.log('🔍 slots value:', slots);
    // console.log('🔍 slots constructor:', slots?.constructor?.name);

    // This will throw the error if slots is not an array
    // if (!Array.isArray(slots)) {
    //   console.error('❌ SLOTS IS NOT AN ARRAY!', slots);
    //   return [];
    // }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    return slots.filter((slot) => slot.slot_date === dateString);
  }, [selectedDate, slots]);

  if (!service && loading) {
    return "Loading";
  } else if (!service && !loading) {
    return "Error";
  } else if (service) {
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-15">
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
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                WELLNESS
              </span>
              <h1 className="text-3xl font-bold text-on-surface mb-2">
                {service.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-base font-medium">
                  by {service.userName}
                </span>
                <div className="flex items-center gap-0.5 text-secondary">
                  <Star size={16} className="fill-secondary" />
                  <Star size={16} className="fill-secondary" />
                  <Star size={16} className="fill-secondary" />
                  <Star size={16} className="fill-secondary" />
                  <Star size={16} className="fill-secondary" />
                  <span className="text-on-surface-variant text-sm ml-1">
                    4.9 (128 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-[#2D5A27] rounded-lg text-xs font-semibold">
                  <CheckCircle size={16} />
                  <span>{slots.length} Appointments</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-primary">
                  {service.currency.toUpperCase()} {service.price}
                  <span className="text-base font-normal text-on-surface-variant">
                    / session
                  </span>
                </span>
              </div>
            </div>

            <div className="h-[400px] rounded-xl overflow-hidden shadow-sm">
              <Image
                alt="Swedish Massage"
                className="w-full h-full object-cover"
                src={service.image}
                width={400}
                height={400}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">About This Service</h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">What's Included</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.details.map((detail, idx) => (
                  <li className="flex items-center gap-3" key={idx}>
                    <CheckCircle
                      size={20}
                      className="text-accent fill-accent"
                    />
                    <span className="text-base">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Availability</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">
                  Mon 9:00 - 18:00
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">
                  Tue 9:00 - 18:00
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">
                  Wed 9:00 - 18:00
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">
                  Fri 10:00 - 19:00
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm font-semibold text-on-surface">
                  Sat 10:00 - 15:00
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Reviews</h3>
                <button
                  type="button"
                  className="text-secondary font-semibold text-sm hover:underline"
                >
                  See All Reviews →
                </button>
              </div>
              <div className="grid gap-4">
                {/* Review Card 1 */}
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                      JD
                    </div>
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
                  <p className="text-sm text-on-surface-variant">
                    Absolutely wonderful session. Elena has magic hands and the
                    environment was incredibly relaxing. Will definitely be
                    back!
                  </p>
                </div>

                {/* Review Card 2 */}
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                      MS
                    </div>
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
                  <p className="text-sm text-on-surface-variant">
                    Highly professional. The deep tissue work really helped my
                    back pain. The booking process was so fast too.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Booking Panel */}
          <aside className="sticky top-[88px] bg-surface-container-lowest p-6 rounded-xl shadow-lg border border-outline-variant/10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Book This Service</h3>

              <div className="flex justify-center items-center gap-6">
                <ChevronLeft size={20} />
                <ChevronRight size={20} />
              </div>
            </div>
            <br />
            <br />
            {/* Calendar Component */}
            <Calendar />

            {/* Available Slots */}
            <div className="space-y-4 mb-8">
              {filteredSlots.length <= 0 ? (
                <h4 className="text-base font-bold">No Slots found</h4>
              ) : (
                <>
                  <h4 className="text-base font-bold">Available Slots</h4>
                  <div className="space-y-2">
                    {filteredSlots.map((slot) => {
                      const start_time = formatDate(
                        dayjs(slot.start_time).toDate(),
                        "hh:mm A",
                      );
                      const end_time = formatDate(
                        dayjs(slot.end_time).toDate(),
                        "hh:mm A",
                      );

                      return (
                        <div
                          onClick={() => setSelectedSlot(slot)}
                          className={`${selectedSlot && selectedSlot.id === slot.id ? "bg-accent" : "bg-surface-container-low"} cursor-pointer flex items-center justify-between p-4 border-l-4 border-accent  rounded-lg`}
                          key={slot.id}
                        >
                          <div>
                            <div className="font-semibold">
                              {start_time} - {end_time}
                            </div>
                            {/* <span className="text-[10px] bg-accent text-[#2D5A27] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <TrendingDown size={10} /> 20% Off
                        </span> */}
                          </div>
                          <span className="text-sm font-bold text-[#2D5A27]">
                            {service.currency.toUpperCase()} {service.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <BookingButton serviceName={service.name} />
            <p className="text-center text-xs text-outline mt-4">
              No payment required until after service.
            </p>
          </aside>
        </div>
      </main>
    );
  }
};

export default ServiceDetails;
