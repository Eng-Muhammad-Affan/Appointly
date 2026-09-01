// ____ Components ...
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/common";
import { User, ClipboardClock, AlertCircle } from "lucide-react";

// ____ Hooks ...
import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// ____ Libs ...
import axios from "axios";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from "../validations";
import { useServiceDetails } from "../stores/use-service-details";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import dayjs from "@/lib/dayjs";
import { toast } from "sonner";

type FormData = z.infer<typeof BookingSchema>;

export const BookingButton = ({ serviceName }: { serviceName: string }) => {
  const router = useRouter();
  const { selectedSlot } = useServiceDetails();

  const timings = useMemo(() => {
    return selectedSlot
      ? {
          start_time: formatDate(
            dayjs(selectedSlot.start_time).toDate(),
            "hh:mm A",
          ),
          end_time: formatDate(
            dayjs(selectedSlot.end_time).toDate(),
            "hh:mm A",
          ),
        }
      : {
          start_time: "",
          end_time: "",
        };
  }, [selectedSlot]);

  const [userData, setUserData] = useState<{
    customer_name: string;
    customer_email: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ____ For Controlling dialog toggle ...
  const [isOpen, setIsOpen] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          setIsAuthenticated(true);
          setUserData({
            customer_name: data.user.name,
            customer_email: data.user.email,
          });
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  // Form setup with empty default values initially
  const formMethods = useForm<FormData>({
    resolver: zodResolver(BookingSchema),
    mode: "onChange",
    defaultValues: {
      customer_name: "",
      customer_email: "",
      id: "",
      service_id: "",
    },
  });

  // Update ALL form values when data changes
  useEffect(() => {
    if (userData) {
      formMethods.setValue("customer_name", userData.customer_name, {
        shouldValidate: true,
      });
      formMethods.setValue("customer_email", userData.customer_email, {
        shouldValidate: true,
      });
    }
  }, [userData, formMethods]);

  //  Add separate effect for slot data
  useEffect(() => {
    if (selectedSlot) {
      formMethods.setValue("id", selectedSlot.id, {
        shouldValidate: true,
      });
      formMethods.setValue("service_id", selectedSlot.service_id, {
        shouldValidate: true,
      });
    }
  }, [selectedSlot, formMethods]);

  // Handle dialog open
  const handleDialogOpen = (open: boolean) => {
    if (open && !isAuthenticated) {
      setShowVerification(true);
      return;
    }
    setIsOpen(open);
    if (!open) {
      setShowVerification(false);
      setSubmitError(null);
    }
  };

  // Handle booking submission
  const submitForm = async (formData: FormData) => {
    try {
      setIsLoading(true);
      setSubmitError(null);

      //  Explicitly ensure slot data is included
      const bookingData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        id: selectedSlot?.id || formData.id,
        service_id: selectedSlot?.service_id || formData.service_id,
      };

      const response = await axios.post(
        "/api/bookings/book-appointment",
        bookingData,
      );

      toast.success(response.data.message);

      // Reset form and close dialog
      formMethods.reset();
      setIsOpen(false);
      setShowVerification(false);

      // Redirect to bookings page
      location.href = response.data.url;
    } catch (error) {
      console.error("Booking failed:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong. Please try again.";
        setSubmitError(errorMessage);
        console.error("Response data:", error.response?.data);
        console.error("Status:", error.response?.status);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login redirect
  const handleLogin = () => {
    setShowVerification(false);
    router.push("/login-user");
  };

  // ✅ Debug: Watch form values
  const _watchedValues = formMethods.watch();
  const formErrors = formMethods.formState.errors;

  // Debug log for development
  // useEffect(() => {
  //   // console.log("Form values:", watchedValues);
  //   // console.log("Form errors:", formErrors);
  // }, [watchedValues, formErrors]);

  const _isFormValid = formMethods.formState.isValid;

  return (
    <>
      {/* Main Booking Dialog */}
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-accent hover:bg-accent/80 text-black py-6 rounded-lg font-semibold text-base transition-all transform active:scale-[0.98] shadow-sm h-auto"
            disabled={!selectedSlot}
          >
            {selectedSlot ? "Book My Slot" : "Select a Slot First"}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
          {/* Custom Header */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-border/20">
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-xl font-bold">
                Book Appointment
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Confirm your booking details
              </DialogDescription>
            </DialogHeader>
          </div>

          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(submitForm)}
              className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-6"
              noValidate
            >
              {/* Client Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="stroke-accent" size={20} />
                  <h3 className="text-xs font-semibold uppercase tracking-wider">
                    Client Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="customer_name"
                    label="Name"
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-muted/30 border-border rounded-lg px-4 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    disabled={!!userData}
                  />

                  <Input
                    type="email"
                    name="customer_email"
                    label="Email"
                    placeholder="jane@example.com"
                    className="w-full bg-muted/30 border-border rounded-lg px-4 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    disabled={!!userData}
                  />
                </div>

                {userData && (
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Logged in as {userData.customer_name}
                  </div>
                )}
              </section>

              {/* Slot Information */}
              {selectedSlot && (
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
                        <p className="text-sm font-medium">{serviceName}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedSlot.slot_date}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {timings.start_time} - {timings.end_time}
                      </span>
                    </div>
                    {/* ✅ Debug: Show slot IDs */}
                    <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground">
                      Slot ID: {selectedSlot.id} | Service ID:{" "}
                      {selectedSlot.service_id}
                    </div>
                  </div>
                </section>
              )}

              {/* Verification Checkbox */}
              {/* <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                <input
                  type="checkbox"
                  id="verification"
                  className="mt-1 w-4 h-4 accent-amber-500 cursor-pointer"
                  {...formMethods.register("verification")}
                />
                <label
                  htmlFor="verification"
                  className="text-sm text-amber-700 dark:text-amber-300 cursor-pointer"
                >
                  I confirm that all the information provided is correct and I
                  understand that this booking is final.
                </label>
              </div> */}

              {/* ✅ Show form validation errors */}
              {Object.keys(formErrors).length > 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-2">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">
                      Please fix the following errors:
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-red-600 dark:text-red-400 space-y-1">
                    {formErrors.customer_name && (
                      <li>{formErrors.customer_name.message}</li>
                    )}
                    {formErrors.customer_email && (
                      <li>{formErrors.customer_email.message}</li>
                    )}
                    {formErrors.id && <li>{formErrors.id.message}</li>}
                    {formErrors.service_id && (
                      <li>{formErrors.service_id.message}</li>
                    )}
                    {/* {formErrors.verification && (
                      <li>{formErrors.verification.message}</li>
                    )} */}
                  </ul>
                </div>
              )}

              {/* ✅ Show submission error */}
              {submitError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle size={16} />
                    <span className="text-sm">{submitError}</span>
                  </div>
                </div>
              )}

              {/* Footer */}
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border/20">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto hover:bg-muted"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-pink text-black hover:bg-tertiary font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !selectedSlot}
                >
                  {isLoading ? "Booking..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      {/* Login Required Dialog */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Login Required
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Please log in to book an appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
              <span className="text-2xl">🔒</span>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                You need to be logged in to book an appointment. Please log in
                or create an account to continue.
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
