// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { Calendar, Clock } from "lucide-react";
// import { useProfile } from "@/features/user/account";
// import { formatDate } from "@/utils/format-date";
// import dayjs from "@/lib/dayjs";
// import { useMemo } from "react";

// const statusmap = {
//   "PENDING": "upcoming",
//   "PAID": "upcoming",
//   "COMPLETED": "completed",
//   "CANCELLED": "cancelled",
//   "REQUESTED-RESCHEDULE": "requested reschedule"
// }

// type Status = "PENDING" | "PAID" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE"

// const StatusBadge = ({status, startTime}:{status:Status, startTime:string}) => {
//   let className = ""
//   const today = dayjs();
//   const startDateTime = dayjs(startTime);
//   const hoursRemaining = today.diff(startDateTime, "hour");
//   const minutesRemaining = today.diff(startDateTime, "minute");

//   switch (status) {
//     case "PAID":
//       className = "bg-accent text-[var(--color-on-primary)]";
//       break;
//     case "CANCELLED":
//       className = "bg-[var(--color-error)] text-[var(--color-on-primary)]";
//       break;
//     case "COMPLETED":
//       className = "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]";
//       break;
//   }

//   // Format the remaining time
//   let displayText = statusmap[status];

//   // Only show remaining time for PAID status when 1 hour or less remains
//   if (status === "PAID" && hoursRemaining <= 1 && hoursRemaining >= 0) {
//     if (minutesRemaining <= 0) {
//       displayText = "Starting now";
//     } else if (minutesRemaining < 60) {
//       displayText = `${minutesRemaining}m remaining`;
//     } else {
//       displayText = `${hoursRemaining}h remaining`;
//     }
//   }

//   return (
//     <Badge className={`${hoursRemaining <= 1 && hoursRemaining >= 0 ? "bg-orange-300" : className} whitespace-nowrap text-black`}>
//       {displayText}
//     </Badge>
//   )
// }

// // const StatusBadge = ({status , startTime}:{status:Status, startTime:string}) => {

// //   let className = ""
// //   const today = dayjs();

// //   const hoursRemaining = today.diff(dayjs(startTime).toDate(),"hour");

// //   console.log(hoursRemaining)

// //   switch (status) {
// //     case "PAID":
// //       className = "bg-[var(--color-accent-success)] text-[var(--color-on-primary)]";
// //       break;
// //     case "CANCELLED":
// //       className = "bg-[var(--color-error)] text-[var(--color-on-primary)]";
// //       break;
// //     case "COMPLETED":
// //       className = "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]";
// //       break;

// //   }

// //   return (
// //     <Badge className={`${className} whitespace-nowrap bg-green-400/90 text-black`}>
// //       {hoursRemaining <=1? `${hoursRemaining}` : statusmap[status]}
// //     </Badge>
// //   )
// // }
// const RecentAppointments = () => {
//   const { appointments } = useProfile();

//   const sortedAppointments = useMemo(() => {
//     return appointments.sort((a,b) => {
//       const date1 = dayjs(a.start_time);
//       const date2 = dayjs(b.start_time);
//       return date1 - date2;
//     })
//   },[appointments])

//   // const getStatusColor = (status: string) => {
//   //   const statusMap: Record<string, string> = {
//   //     paid: "bg-[var(--color-accent-success)] text-[var(--color-on-primary)]",
//   //     pending: "bg-[var(--color-warning)] text-[var(--color-on-primary)]",
//   //     cancelled: "bg-[var(--color-error)] text-[var(--color-on-primary)]",
//   //     completed: "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]",
//   //   };
//   //   return statusMap[status.toLowerCase()] || "bg-[var(--color-muted)] text-[var(--color-on-primary)]";
//   // };

//   return (
//     <Card className="shadow-md transition-all duration-300 border-[var(--color-secondary)] hover:shadow-lg transition-all duration-300">
//       <div className="p-4 border-b">
//         <div className="flex justify-between items-center">
//           <h2 className="text-h2 text-[var(--color-on-surface)] flex items-center">
//             Recent Activity
//           </h2>
//         </div>
//       </div>
//       <div className="px-6">
//         <div className="flex flex-col gap-2">
//           {sortedAppointments.map((appointment) => (
//             <div
//               key={appointment.id}
//               className="flex items-start gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-secondary)] transition-all duration-300 hover:shadow-md"
//             >
//               <div className="flex-shrink-0">
//                 <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[var(--color-secondary)]/20">
//                   <Image
//                     width={64}
//                     height={64}
//                     src={appointment.service.image}
//                     alt={appointment.service.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
//                   <div className="min-w-0">
//                     <h3 className="font-semibold text-[var(--color-on-surface)] text-body-base truncate">
//                       Appointment #{appointment.token}
//                     </h3>
//                     <p className="text-body-small text-[var(--color-on-surface-variant)] truncate">
//                       {appointment.service.name}
//                     </p>
//                   </div>
//                   <StatusBadge status={appointment.status} startTime={appointment.start_time} />
//                 </div>
//                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
//                   <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
//                     <Calendar className="w-3 h-3 mr-1" />
//                     {formatDate(new Date(appointment.slot_date), 'D MMMM, YYYY')}
//                   </div>
//                   {appointment.slot_date && (
//                     <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
//                       <Clock className="w-3 h-3 mr-1" />
//                       {dayjs(appointment.start_time, "HH:mm").format("HH:mm A")} - 
//                        {dayjs(appointment.end_time, "HH:mm").format("HH:mm A")}
//                     </div>
//                   )}
//                   <div className="flex items-center text-caption font-semibold text-[var(--color-secondary-dark)] ml-auto">
//                     {appointment.service.currency.toUpperCase()}
//                     {appointment.service.price.toLocaleString()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {appointments.length === 0 && (
//             <div className="text-center py-12 text-[var(--color-on-surface-variant)]">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-container)] flex items-center justify-center">
//                 <Calendar className="w-8 h-8 text-[var(--color-outline)]" />
//               </div>
//               <p className="text-body-base">No recent appointments found</p>
//               <p className="text-caption mt-1">Book your first appointment today</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default RecentAppointments;

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";

import { Calendar, CheckCircle2, Clock } from "lucide-react";

import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

import { useProfile } from "@/features/user/account";
import { formatDate } from "@/utils/format-date";
import dayjs from "@/lib/dayjs";

const statusmap = {
  PENDING: "upcoming",
  PAID: "upcoming",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  "REQUESTED-RESCHEDULE": "requested reschedule",
} as const;

type Status =
  | "PENDING"
  | "PAID"
  | "COMPLETED"
  | "CANCELLED"
  | "REQUESTED-RESCHEDULE";

/**
 * ---------------------------------------------------------
 * Status Badge
 * ---------------------------------------------------------
 */
const StatusBadge = ({
  status,
  startTime,
}: {
  status: Status;
  startTime: string;
}) => {
  const now = dayjs();
  const startDateTime = dayjs(startTime);

  const hasStarted = now.isAfter(startDateTime);

  let className = "";
  let displayText = statusmap[status];

  switch (status) {
    case "PAID":
      className = "bg-accent text-[var(--color-on-primary)]";
      break;

    case "CANCELLED":
      className =
        "bg-[var(--color-error)] text-[var(--color-on-primary)]";
      break;

    case "COMPLETED":
      className =
        "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]";
      break;

    case "PENDING":
      className =
        "bg-[var(--color-muted)] text-[var(--color-on-primary)]";
      break;

    case "REQUESTED-RESCHEDULE":
      className =
        "bg-[var(--color-muted)] text-[var(--color-on-primary)]";
      break;
  }

  /**
   * Appointment has already started.
   *
   * Don't show "Ongoing" for appointments which have already
   * been completed or cancelled.
   */
  if (
    hasStarted &&
    status !== "COMPLETED" &&
    status !== "CANCELLED"
  ) {
    displayText = "Ongoing";
    className = "bg-orange-300 text-black";
  }

  /**
   * For upcoming PAID appointments, show remaining time.
   */
  if (status === "PAID" && !hasStarted) {
    const minutesRemaining = startDateTime.diff(now, "minute");

    if (minutesRemaining <= 0) {
      displayText = "Starting now";
    } else if (minutesRemaining < 60) {
      displayText = `${minutesRemaining}m remaining`;
    } else {
      const hoursRemaining = Math.floor(minutesRemaining / 60);

      displayText = `${hoursRemaining}h remaining`;
    }
  }

  return (
    <Badge
      className={`${className} whitespace-nowrap`}
    >
      {displayText}
    </Badge>
  );
};

/**
 * ---------------------------------------------------------
 * QR Scanner
 * ---------------------------------------------------------
 */
const QRScanner = ({
  onScan,
  onError,
}: {
  onScan: (payload: string) => void;
  onError: (message: string) => void;
}) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);

  useEffect(() => {
    const scannerId = "appointment-qr-reader";

    const scanner = new Html5Qrcode(scannerId, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });

    scannerRef.current = scanner;
    hasScannedRef.current = false;

    const startScanner = async () => {
      try {
        await scanner.start(
          {
            facingMode: "environment",
          },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            /**
             * html5-qrcode can detect the same QR code multiple
             * times very quickly. Make sure we process it only once.
             */
            if (hasScannedRef.current) {
              return;
            }

            hasScannedRef.current = true;

            console.log(
              "Scanned QR payload:",
              decodedText
            );

            onScan(decodedText);

            try {
              if (scanner.isScanning) {
                await scanner.stop();
              }
            } catch (error) {
              console.error(
                "Failed to stop QR scanner:",
                error
              );
            }
          },
          () => {
            /**
             * QR code wasn't found in this frame.
             *
             * Do nothing here because this callback executes
             * continuously while scanning.
             */
          }
        );
      } catch (error) {
        console.error(
          "Unable to start QR scanner:",
          error
        );

        onError(
          "Unable to access the camera. Please allow camera permission and try again."
        );
      }
    };

    startScanner();

    /**
     * Cleanup when the scanner component unmounts.
     *
     * This happens when the dialog closes.
     */
    return () => {
      const cleanup = async () => {
        try {
          if (scanner.isScanning) {
            await scanner.stop();
          }
        } catch (error) {
          console.error(
            "Failed to stop QR scanner during cleanup:",
            error
          );
        }

        try {
          scanner.clear();
        } catch (error) {
          console.error(
            "Failed to clear QR scanner:",
            error
          );
        }

        scannerRef.current = null;
      };

      cleanup();
    };
  }, [onScan, onError]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border bg-black">
        <div
          id="appointment-qr-reader"
          className="w-full"
        />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Point your camera at the appointment QR code.
      </p>
    </div>
  );
};

/**
 * ---------------------------------------------------------
 * Recent Appointments
 * ---------------------------------------------------------
 */
const RecentAppointments = () => {
  const { appointments } = useProfile();

  const [isScannerOpen, setIsScannerOpen] =
    useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string | number | null>(null);

  const [scannerError, setScannerError] =
    useState<string | null>(null);

  /**
   * -------------------------------------------------------
   * Sort appointments
   * -------------------------------------------------------
   *
   * Latest appointment first.
   *
   * [...appointments] is intentional because Array.sort()
   * mutates the original array.
   */
  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => {
      const date1 = dayjs(a.start_time);
      const date2 = dayjs(b.start_time);

      return date2.valueOf() - date1.valueOf();
    });
  }, [appointments]);

  /**
   * -------------------------------------------------------
   * Check whether appointment is ongoing
   * -------------------------------------------------------
   *
   * Based on your requirement:
   *
   * start_time has passed = appointment is ongoing.
   *
   * Completed/cancelled appointments are excluded.
   */
  const isAppointmentOngoing = useCallback(
    (appointment: {
      status: Status;
      start_time: string;
    }) => {
      const hasStarted = dayjs().isAfter(
        dayjs(appointment.start_time)
      );

      return (
        hasStarted &&
        appointment.status !== "COMPLETED" &&
        appointment.status !== "CANCELLED"
      );
    },
    []
  );

  /**
   * -------------------------------------------------------
   * Open scanner
   * -------------------------------------------------------
   */
  const handleCompleteAppointment = useCallback(
    (appointmentId: string | number) => {
      setSelectedAppointmentId(appointmentId);
      setScannerError(null);
      setIsScannerOpen(true);
    },
    []
  );

  /**
   * -------------------------------------------------------
   * QR scan success
   * -------------------------------------------------------
   */
  const handleQRScan = useCallback(
    (payload: string) => {
      console.log("================================");
      console.log("Appointment QR scanned");
      console.log("Appointment ID:", selectedAppointmentId);
      console.log("QR Payload:", payload);
      console.log("================================");

      /**
       * IMPORTANT:
       *
       * This is where you can call your backend API.
       *
       * Example:
       *
       * await completeAppointment({
       *   appointmentId: selectedAppointmentId,
       *   qrPayload: payload,
       * });
       */

      setIsScannerOpen(false);
      setSelectedAppointmentId(null);
      setScannerError(null);
    },
    [selectedAppointmentId]
  );

  /**
   * -------------------------------------------------------
   * QR scanner error
   * -------------------------------------------------------
   */
  const handleScannerError = useCallback(
    (message: string) => {
      setScannerError(message);
    },
    []
  );

  /**
   * -------------------------------------------------------
   * Dialog close
   * -------------------------------------------------------
   */
  const handleScannerDialogChange = useCallback(
    (open: boolean) => {
      setIsScannerOpen(open);

      if (!open) {
        setSelectedAppointmentId(null);
        setScannerError(null);
      }
    },
    []
  );

  return (
    <>
      <Card className="border-[var(--color-secondary)] shadow-md transition-all duration-300 hover:shadow-lg">
        {/* ------------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------------ */}

        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-h2 flex items-center text-[var(--color-on-surface)]">
              Recent Activity
            </h2>
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* Appointments */}
        {/* ------------------------------------------------ */}

        <div className="px-6">
          <div className="flex flex-col gap-2">
            {sortedAppointments.map((appointment) => {
              const isOngoing =
                isAppointmentOngoing(appointment);

              return (
                <div
                  key={appointment.id}
                  className="flex items-start gap-4 rounded-xl border border-[var(--color-secondary)] bg-[var(--color-surface)] p-4 transition-all duration-300 hover:shadow-md"
                >
                  {/* -------------------------------------- */}
                  {/* Service Image */}
                  {/* -------------------------------------- */}

                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 overflow-hidden rounded-xl border-2 border-[var(--color-secondary)]/20">
                      <Image
                        width={64}
                        height={64}
                        src={appointment.service.image}
                        alt={appointment.service.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* -------------------------------------- */}
                  {/* Appointment Details */}
                  {/* -------------------------------------- */}

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-body-base font-semibold text-[var(--color-on-surface)]">
                          Appointment #
                          {appointment.token}
                        </h3>

                        <p className="truncate text-body-small text-[var(--color-on-surface-variant)]">
                          {appointment.service.name}
                        </p>
                      </div>

                      <StatusBadge
                        status={appointment.status}
                        startTime={
                          appointment.start_time
                        }
                      />
                    </div>

                    {/* ------------------------------------ */}
                    {/* Date / Time / Price */}
                    {/* ------------------------------------ */}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {/* Date */}

                      <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
                        <Calendar className="mr-1 h-3 w-3" />

                        {formatDate(
                          new Date(
                            appointment.slot_date
                          ),
                          "D MMMM, YYYY"
                        )}
                      </div>

                      {/* Time */}

                      {appointment.slot_date && (
                        <div className="flex items-center text-caption text-[var(--color-on-surface-variant)]">
                          <Clock className="mr-1 h-3 w-3" />

                          {dayjs(
                            appointment.start_time
                          ).format("HH:mm A")}

                          {" - "}

                          {dayjs(
                            appointment.end_time
                          ).format("HH:mm A")}
                        </div>
                      )}

                      {/* Price */}

                      <div className="ml-auto flex items-center text-caption font-semibold text-[var(--color-secondary-dark)]">
                        {appointment.service.currency.toUpperCase()}
                        {appointment.service.price.toLocaleString()}
                      </div>
                    </div>

                    {/* ------------------------------------ */}
                    {/* Complete Appointment */}
                    {/* ------------------------------------ */}

                    {isOngoing && (
                      <div className="mt-4">
                        <Button
                          type="button"
                          onClick={() =>
                            handleCompleteAppointment(
                              appointment.id
                            )
                          }
                          className="inline-flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />

                          Complete appointment
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ------------------------------------------------ */}
            {/* Empty State */}
            {/* ------------------------------------------------ */}

            {appointments.length === 0 && (
              <div className="py-12 text-center text-[var(--color-on-surface-variant)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-container)]">
                  <Calendar className="h-8 w-8 text-[var(--color-outline)]" />
                </div>

                <p className="text-body-base">
                  No recent appointments found
                </p>

                <p className="mt-1 text-caption">
                  Book your first appointment today
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ================================================== */}
      {/* QR Scanner Dialog */}
      {/* ================================================== */}

      <Dialog
        open={isScannerOpen}
        onOpenChange={handleScannerDialogChange}
      >
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
          {/* ------------------------------------------------ */}
          {/* Dialog Header */}
          {/* ------------------------------------------------ */}

          <div className="px-6 py-4 border-b border-border/20">
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-xl font-bold">
                Complete Appointment
              </DialogTitle>

              <DialogDescription className="text-sm text-muted-foreground">
                Scan the appointment QR code to complete
                this appointment.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* ------------------------------------------------ */}
          {/* Scanner */}
          {/* ------------------------------------------------ */}

          <div className="px-6 py-6">
            {scannerError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm font-medium text-red-600">
                  {scannerError}
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setScannerError(null);
                  }}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <QRScanner
                onScan={handleQRScan}
                onError={handleScannerError}
              />
            )}
          </div>

          {/* ------------------------------------------------ */}
          {/* Dialog Footer */}
          {/* ------------------------------------------------ */}

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 px-6 py-4 border-t border-border/20">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecentAppointments;

