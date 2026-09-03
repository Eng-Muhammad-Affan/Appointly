import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useProfile } from "@/features/user/account";
import { formatDate } from "@/utils/format-date";
import dayjs from "@/lib/dayjs";

const statusmap = {
  "PENDING": "upcoming",
  "PAID": "upcoming",
  "COMPLETED": "completed",
  "CANCELLED": "cancelled",
  "REQUESTED-RESCHEDULE": "requested reschedule"
}
const RecentAppointments = () => {
  const { appointments } = useProfile()

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      paid: "bg-[var(--color-accent-success)] text-[var(--color-on-primary)]",
      pending: "bg-[var(--color-warning)] text-[var(--color-on-primary)]",
      cancelled: "bg-[var(--color-error)] text-[var(--color-on-primary)]",
      completed: "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]",
    };
    return statusMap[status.toLowerCase()] || "bg-[var(--color-muted)] text-[var(--color-on-primary)]";
  };

  return (
    <Card className="shadow-md transition-all duration-300 border-[var(--color-secondary)] hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-h2 text-[var(--color-on-surface)] flex items-center">
            {/* <span className="w-1 h-6 bg-[var(--color-secondary)] rounded-full mr-3"></span> */}
            Recent Activity
          </h2>
          {/* <Link href="/profile/orders">
            <Button className="bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent)]/80 transition-all duration-300 rounded-lg">
              View All
            </Button>
          </Link> */}
        </div>
      </div>
      <div className="px-6">
        <div className="flex flex-col gap-2">
          {appointments.slice(0, 2).map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-secondary)] transition-all duration-300 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[var(--color-secondary)]/20">
                  <Image
                    width={64}
                    height={64}
                    src={appointment.service.image}
                    alt={appointment.service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--color-on-surface)] text-body-base truncate">
                      Appointment #{appointment.token}
                    </h3>
                    <p className="text-body-small text-[var(--color-on-surface-variant)] truncate">
                      {appointment.service.name}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(appointment.status)} whitespace-nowrap bg-green-400/90 text-black`}>
                    {statusmap[appointment.status]}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                  <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(new Date(appointment.slot_date), 'D MMMM, YYYY')}
                  </div>
                  {appointment.slot_date && (
                    <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
                      <Clock className="w-3 h-3 mr-1" />
                      {dayjs(appointment.start_time,"HH:mm").format("HH:mm A")}
                    </div>
                  )}
                  <div className="flex items-center text-caption font-semibold text-[var(--color-secondary-dark)] ml-auto">
                    {appointment.service.currency.toUpperCase()}{" "}
                    {appointment.service.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-12 text-[var(--color-on-surface-variant)]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-container)] flex items-center justify-center">
                <Calendar className="w-8 h-8 text-[var(--color-outline)]" />
              </div>
              <p className="text-body-base">No recent appointments found</p>
              <p className="text-caption mt-1">Book your first appointment today</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecentAppointments;