"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDashboard } from "@/features/provider/dashboard-service";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Info,
  Verified,
  CalendarClock,
  SlidersHorizontal,
  Plus,
  X,
  CheckCircle,
  Circle,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  FormProvider,
  useForm
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { AddServiceAPISchema , FormValues , SelectBoxCreateService , DaySelect} from "@/features/provider/create-service";
import { serviceCategories } from "@/shared/constants";
import Image from "next/image";
import { Input } from "@/components/common";

// Main Service Creation Page
const ServiceCreationPage: React.FC = () => {
  const router = useRouter();
  const { addService } = useDashboard();
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null,
  );

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(AddServiceAPISchema),
    mode: "onChange",
    defaultValues: {
      working_days: [],
      details: [],
      user_id: "",
      currency: "",
      max_capacity: 1,
      name: "",
      category: "",
      price: 0,
      description: "",
      duration: 60,
      buffer_time_min: 0,
      cancellation_policy_hrs: 0,
    },
  });

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  // Watch form values for preview
  const watchedValues = watch();

  // Fetch session and stripe account on mount
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await authClient.getSession();

        if (error || !data) {
          toast.error(error?.message || "Provider not authenticated.");
          router.push("/login-provider");
          return;
        }

        setValue("user_id", data.user.id);
        setValue("currency", data.user.currency);

        console.log(getValues());
      } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error(error);
      }
    };
    getData();
  }, [router, setValue, getValues]);

  // Add highlight
  const handleAddHighlight = () => {
    const trimmed = highlightInput.trim();
    if (trimmed && !highlights.includes(trimmed)) {
      const newHighlights = [...highlights, trimmed];
      setHighlights(newHighlights);
      setValue("details", newHighlights, { shouldValidate: true });
      setHighlightInput("");
    }
  };

  // Remove highlight
  const handleRemoveHighlight = (highlight: string) => {
    const newHighlights = highlights.filter((h) => h !== highlight);
    setHighlights(newHighlights);
    setValue("details", newHighlights, { shouldValidate: true });
  };

  // Handle key press for highlight input
  const handleHighlightKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddHighlight();
    }
  };

  // Submit handler
  const onSubmit = async (formData: FormValues) => {
    try {
      const data = new FormData();

      // Append image
      if (formData.image) {
        data.append("image", formData.image);
      } else {
        toast.error("Image is required");
        return;
      }

      // Append all other fields
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("currency", formData.currency);
      data.append("working_days", JSON.stringify(formData.working_days));
      data.append("start_time", formData.start_time);
      data.append("end_time", formData.end_time);
      data.append("duration", formData.duration.toString());
      data.append(
        "max_appointments_per_day",
        formData.max_appointments_per_day.toString(),
      );
      data.append("details", JSON.stringify(formData.details));
      data.append("max_capacity", formData.max_capacity.toString());
      data.append("buffer_time_min", formData.buffer_time_min.toString());
      data.append(
        "cancellation_policy_hrs",
        formData.cancellation_policy_hrs.toString(),
      );
      data.append("user_id", formData.user_id);

      // ✅ fetch will automatically set Content-Type with boundary
      const response = await fetch("/api/dashboard/add-service", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        toast.error(result.message || "Failed to create service");
        return;
      }

      toast.success(result.message);
      addService(result.service);
      router.push("/dashboard/services");
    } catch (error) {
      toast.error("Failed to create service. Please try again.");
      console.error(error);
    }
  };

  // Checklist status
  const checklistItems = useMemo(() => {
    const vals = getValues();
    return [
      {
        label: "Basic Info",
        completed: !!(
          vals.name &&
          vals.category &&
          vals.price &&
          vals.description
        ),
      },
      {
        label: "Service Highlights",
        completed: vals.details && vals.details.length > 0,
      },
      {
        label: "Availability",
        completed: !!(
          vals.working_days &&
          vals.working_days.length > 0 &&
          vals.duration &&
          vals.start_time &&
          vals.end_time
        ),
      },
      {
        label: "Policy Settings",
        completed: !!(vals.buffer_time_min && vals.cancellation_policy_hrs),
      },
    ];
  }, [getValues]);

  const allCompleted = checklistItems.every((item) => item.completed);

  // useEffect(() => {
  //   console.log(errors)
  //   // console.log(getValues())
  // }, [errors])
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <main className="flex-1 flex flex-col min-w-0 bg-surface">
          <div className="flex-1 overflow-y-auto p-gutter lg:p-xl custom-scrollbar">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-xl">
              <div className="flex-1 space-y-xl">
                {/* Basic Information */}
                <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-sm mb-lg">
                    <Info size={20} className="text-secondary" />
                    <h4 className="font-h4 text-h4">Basic Information</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <Input
                      label="Service name"
                      name="name"
                      placeholder="e.g. Professional Deep Tissue Massage"
                    />

                    <SelectBoxCreateService
                      label="Category"
                      options={serviceCategories}
                      name="category"
                    />

                    <Input
                      label="Price"
                      name="price"
                      placeholder="0.00"
                      type="number"
                    />

                    <Input
                      label="Description"
                      name="description"
                      placeholder="Describe what clients can expect from this service..."
                      type="textarea"
                    />

                    <Input
                      label="Duration (minutes)"
                      name="duration"
                      type="number"
                    />
                  </div>
                </section>

                {/* Service Highlights */}
                <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-sm mb-lg">
                    <Verified size={20} className="text-secondary" />
                    <h4 className="font-h4 text-h4">Service Highlights</h4>
                  </div>
                  <p className="text-body-small text-on-surface-variant mb-md">
                    Add key features that make this service special.
                  </p>
                  <div className="flex gap-sm mb-md">
                    <input
                      className="flex-1 px-md py-sm bg-surface-container-lowest border border-outline-variant/40 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="e.g. Free Wi-Fi"
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={handleHighlightKeyDown}
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-md bg-primary text-on-primary rounded-lg font-label-bold text-label-bold flex items-center gap-xs active:scale-95 transition-transform"
                    >
                      <Plus size={18} /> Add
                    </button>
                  </div>
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-sm">
                      {highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-xs px-sm py-xs bg-secondary-container/30 text-secondary rounded-full font-label-bold text-body-small border border-secondary-container/50"
                        >
                          {highlight}
                          <X
                            size={16}
                            className="cursor-pointer hover:text-error transition-colors"
                            onClick={() => handleRemoveHighlight(highlight)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.details && (
                    <p className="mt-2 text-caption text-error">
                      {errors.details.message}
                    </p>
                  )}
                </section>

                {/* Availability & Capacity */}
                {/* timings */}
                <div className="flex items-center gap-sm mb-lg">
                  <CalendarClock size={20} className="text-secondary" />
                  <h4 className="font-h4 text-h4">Availability & Capacity</h4>
                </div>
                <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Start timings"
                      name="start_time"
                      type="time"
                    />
                    <Input label="End timings" name="end_time" type="time" />
                  </div>

                  <DaySelect />
                  {errors.working_days && (
                    <p className="mt-1 text-caption text-error">
                      {errors.working_days.message}
                    </p>
                  )}
                  <Input
                    label="Max appointments per day"
                    name="max_appointments_per_day"
                    type="number"
                  />
                </section>

                {/* Advanced Settings */}
                <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/10 shadow-sm">
                  <div className="flex items-center gap-sm mb-lg">
                    <SlidersHorizontal size={20} className="text-secondary" />
                    <h4 className="font-h4 text-h4">Advanced Settings</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <Input
                      label="Parallel handling capacity"
                      name="max_capacity"
                      type="number"
                    />
                    <Input
                      label="Buffer Time (minutes)"
                      name="buffer_time_min"
                      type="number"
                    />
                    <SelectBoxCreateService
                      label="Cancellation policy"
                      options={[
                        {
                          key: "2h notice",
                          value: 2,
                        },
                        {
                          key: "24h notice",
                          value: 24,
                        },
                        {
                          key: "48h notice",
                          value: 48,
                        },
                        {
                          key: "Non refundable",
                          value: 0,
                        },
                      ]}
                      name="cancellation_policy_hrs"
                    />
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-md pt-md pb-xl">
                  <button
                    type="button"
                    className="px-lg py-sm border border-outline-variant text-on-surface font-label-bold text-label-bold rounded-lg hover:bg-surface-container transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-xl py-sm bg-secondary text-on-secondary font-label-bold text-label-bold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating..." : "Create Service"}
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-80 shrink-0">
                <div className="sticky top-20 flex flex-col gap-md">
                  {/* Checklist */}
                  <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/10 shadow-lg">
                    <div className="flex justify-between items-center mb-md">
                      <h4 className="font-h4 text-h4">Service Status</h4>
                      <span
                        className={cn(
                          "px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          allCompleted
                            ? "bg-success-container text-on-success-container"
                            : "bg-error-container text-on-error-container",
                        )}
                      >
                        {allCompleted ? "Ready" : "Draft"}
                      </span>
                    </div>
                    <div className="space-y-md mb-lg">
                      {checklistItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-md">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              item.completed
                                ? "bg-secondary-container/30 text-secondary"
                                : "bg-surface-container text-outline",
                            )}
                          >
                            {item.completed ? (
                              <CheckCircle size={18} />
                            ) : (
                              <Circle size={18} />
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-body-small",
                              item.completed
                                ? "text-on-surface"
                                : "text-on-surface-variant font-medium",
                            )}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-md border-t border-outline-variant/20">
                      <div className="flex items-center justify-between mb-sm">
                        <span className="text-body-small font-label-bold text-on-surface-variant">
                          Active Status
                        </span>
                        <div
                          className={cn(
                            "relative inline-flex items-center",
                            allCompleted
                              ? "cursor-pointer"
                              : "cursor-not-allowed",
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-5 rounded-full transition-colors",
                              allCompleted
                                ? "bg-primary"
                                : "bg-surface-container-high",
                            )}
                          />
                          <div
                            className={cn(
                              "absolute w-3 h-3 rounded-full transition-all",
                              allCompleted
                                ? "left-5 bg-white"
                                : "left-1 bg-outline",
                            )}
                          />
                        </div>
                      </div>
                      {!allCompleted && (
                        <div className="flex items-start gap-sm p-sm bg-error-container/20 rounded-lg">
                          <AlertTriangle
                            size={16}
                            className="text-error mt-0.5"
                          />
                          <p className="text-[11px] text-on-error-container leading-tight">
                            Complete the checklist to enable this service for
                            bookings.
                          </p>
                        </div>
                      )}
                      {allCompleted && (
                        <div className="flex items-start gap-sm p-sm bg-success-container/20 rounded-lg">
                          <CheckCircle
                            size={16}
                            className="text-success mt-0.5"
                          />
                          <p className="text-[11px] text-on-success-container leading-tight">
                            Service is ready to be published!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="bg-primary-container text-on-primary-container p-lg rounded-xl border border-primary relative overflow-hidden group h-80">
                    <div className="w-full h-full bg-secondary relative">
                      {/* Image Preview - shows full size when image exists */}
                      {imagePreview && (
                        <div className="w-full h-full">
                          <Image
                            src={imagePreview}
                            alt={watchedValues.name || "Service image"}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}

                      {/* Placeholder Overlay - shows only when NO image */}
                      {!imagePreview && (
                        <div className="flex flex-col justify-center items-center h-full w-full bg-primary/85">
                          <ImageIcon size={40} className="stroke-gray-500" />
                          <p className="text-gray-500 text-sm">Upload image</p>
                        </div>
                      )}

                      {/* File Input - covers entire container */}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        {...register("image", {
                          onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          },
                        })}
                      />
                    </div>

                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-secondary opacity-20 rounded-full blur-2xl pointer-events-none" />
                  </div>
                  {errors.image && (
                    <p className="text-sm text-error mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </form>
    </FormProvider>
  );
};

export default ServiceCreationPage;
