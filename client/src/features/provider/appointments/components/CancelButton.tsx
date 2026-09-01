import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, ClipboardClock } from "lucide-react";
import type { AppointmentDashboard } from "../../dashboard-service";
import { formatDate } from "@/utils/format-date";

export const CancelButton = ({
  appointment,
}: {
  appointment: AppointmentDashboard;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 bg-white hover:bg-red-50 text-red-600 rounded-lg transition-all">
          <XCircle size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
        {/* Custom Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-border/20">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-xl font-bold">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Remember, all the collected funds should be refunded. However
              you'll be able to reschedule any other slot during this time.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Client Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="stroke-accent" size={20} />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Client Information
              </h3>
            </div>

            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Customer Name</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {appointment.customer_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Customer Email</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {appointment.customer_email}
                </span>
              </div>
            </div>
          </section>

          {/* Slot Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClipboardClock className="stroke-accent" size={20} />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Slot Details
              </h3>
            </div>

            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">lksald klaskdl</p>
                  <p className="text-xs text-muted-foreground">
                    {appointment.slot_date}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {formatDate(appointment.start_time, "hh:mm a")} -{" "}
                  {formatDate(appointment.end_time, "hh:mm a")}
                </span>
              </div>
              {/* ✅ Debug: Show slot IDs */}
              <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground">
                Slot ID: {appointment.id}
                <br />
                Service ID:{appointment.service_id}
              </div>
            </div>
          </section>

          {/* Footer */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border/20">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto hover:bg-muted"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full sm:w-auto hover:bg-pink text-red-500 bg-tertiary font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel Appointment
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
