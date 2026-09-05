import type { NextRequest } from "next/server";
import db from "@/db";
import { NextResponse } from "next/server";
import { service } from "@/db/schemas";
import { createClient } from "@supabase/supabase-js";
import { GenerateSlots } from "@/utils";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string, // Use service role key for server-side operations
);

export const POST = async (req: NextRequest) => {
  console.log(
    "--------------------- Running addServiceAction () ... -------------------------",
  );
  console.log(req.body)
  // try {
  //   // 1. Parse form data (including the image file)
  //   const formData = await req.formData();

  //   console.log("Formdata : ", formData);

  //   // Extract image file
  //   const imageFile = formData.get("image") as File | null;
  //   if (!imageFile) {
  //     return NextResponse.json(
  //       { message: "Image is required" },
  //       { status: 400 },
  //     );
  //   }

  //   // Validate file size and type before upload
  //   const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  //   const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

  //   if (imageFile.size > MAX_FILE_SIZE) {
  //     return NextResponse.json(
  //       { message: "Max file size is 5MB." },
  //       { status: 400 },
  //     );
  //   }

  //   if (!ALLOWED_MIME_TYPES.includes(imageFile.type)) {
  //     return NextResponse.json(
  //       { message: "Only .jpg, .png and .webp formats are supported." },
  //       { status: 400 },
  //     );
  //   }

  //   // Extract other fields from formData with proper type handling
  //   const serviceData = {
  //     name: formData.get("name") as string,
  //     category: formData.get("category") as string,
  //     description: formData.get("description") as string,
  //     price: Number(formData.get("price")),
  //     currency: formData.get("currency") as string,
  //     working_days: JSON.parse(formData.get("working_days") as string),
  //     start_time: formData.get("start_time") as string,
  //     end_time: formData.get("end_time") as string,
  //     duration: Number(formData.get("duration")),
  //     max_appointments_per_day: Number(
  //       formData.get("max_appointments_per_day"),
  //     ),
  //     details: JSON.parse(formData.get("details") as string),
  //     max_capacity: Number(formData.get("max_capacity")),
  //     buffer_time_min: Number(formData.get("buffer_time_min")),
  //     cancellation_policy_hrs: Number(formData.get("cancellation_policy_hrs")),
  //     user_id: formData.get("user_id") as string,
  //   };

  //   // Validate required fields
  //   if (!serviceData.user_id) {
  //     return NextResponse.json(
  //       { message: "User ID is required" },
  //       { status: 400 },
  //     );
  //   }

  //   // 2. Upload image to Supabase Storage
  //   const fileExtension = imageFile.name.split(".").pop() || "jpg";
  //   const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
  //   const filePath = `${serviceData.user_id}/${fileName}`;

  //   console.log(`Uploading image to: ${filePath}`);

  //   const { data: uploadData, error: uploadError } = await supabase.storage
  //     .from("service_banners")
  //     .upload(filePath, imageFile, {
  //       cacheControl: "3600",
  //       upsert: false,
  //       contentType: imageFile.type,
  //     });

  //   if (uploadError) {
  //     console.error("Image upload error:", uploadError);
  //     return NextResponse.json(
  //       {
  //         message: "Failed to upload image",
  //         details: uploadError.message,
  //       },
  //       { status: 500 },
  //     );
  //   }

  //   console.log("Image uploaded successfully:", uploadData);

  //   // 3. Get public URL of the uploaded image
  //   const { data: urlData } = supabase.storage
  //     .from("service_banners")
  //     .getPublicUrl(filePath);

  //   if (!urlData || !urlData.publicUrl) {
  //     // If we can't get the URL, delete the uploaded image
  //     await supabase.storage.from("service_banners").remove([filePath]);

  //     return NextResponse.json(
  //       { message: "Failed to generate image URL" },
  //       { status: 500 },
  //     );
  //   }

  //   const imageUrl = urlData.publicUrl;
  //   console.log("Image public URL:", imageUrl);

  //   // 4. Insert service with image URL
  //   const [newService] = await db
  //     .insert(service)
  //     .values({
  //       name: serviceData.name,
  //       category: serviceData.category,
  //       description: serviceData.description,
  //       price: serviceData.price,
  //       currency: serviceData.currency,
  //       working_days: serviceData.working_days,
  //       start_time: serviceData.start_time,
  //       end_time: serviceData.end_time,
  //       duration: serviceData.duration,
  //       max_appointments_per_day: serviceData.max_appointments_per_day,
  //       details: serviceData.details,
  //       maxCapacity: serviceData.max_capacity,
  //       buffer_time_in_min: serviceData.buffer_time_min,
  //       cancellation_policy_hrs: serviceData.cancellation_policy_hrs,
  //       user_id: serviceData.user_id,
  //       image: imageUrl, // Add the image URL
  //     })
  //     .returning();

  //   if (!newService) {
  //     // If service insertion fails, delete the uploaded image
  //     console.log("Service insertion failed, deleting uploaded image...");
  //     await supabase.storage.from("service_banners").remove([filePath]);

  //     return NextResponse.json(
  //       { message: "Failed to create service" },
  //       { status: 500 },
  //     );
  //   }

  //   console.log("Inserted a new service : ", newService);

  //   // 5. Generate slots
  //   console.log("Generating slots...");
  //   const slots = await GenerateSlots(
  //     { id: true },
  //     {
  //       id: newService.id,
  //       duration: newService.duration,
  //       working_days: newService.working_days,
  //       start_time: newService.start_time,
  //       end_time: newService.end_time,
  //     },
  //   );

  //   console.log(`Generated total ${slots.length} slots ...`);
  //   console.log(
  //     "----------------------------Operation completed successfully-----------------------------",
  //   );

  //   return NextResponse.json(
  //     {
  //       message: "Added a new service",
  //       service: newService,
  //       slots: slots,
  //     },
  //     { status: 201 },
  //   );
  // } catch (err) {
  //   console.error("Error in addServiceAction:", err);

  //   // Check if it's a Zod validation error
  //   if (err instanceof Error && err.name === "ZodError") {
  //     return NextResponse.json(
  //       {
  //         message: "Validation failed",
  //         details: err.message,
  //       },
  //       { status: 400 },
  //     );
  //   }

  //   if (err instanceof SyntaxError) {
  //     return NextResponse.json(
  //       { message: "Invalid JSON payload" },
  //       { status: 400 },
  //     );
  //   }

  //   if (err instanceof Error) {
  //     // Handle specific error types
  //     if (
  //       err.message.includes("authentication") ||
  //       err.message.includes("session")
  //     ) {
  //       return NextResponse.json(
  //         { message: "Authentication failed", details: err.message },
  //         { status: 401 },
  //       );
  //     }

  //     if (err.message.includes("database") || err.message.includes("db")) {
  //       return NextResponse.json(
  //         { message: "Database operation failed", details: err.message },
  //         { status: 500 },
  //       );
  //     }

  //     return NextResponse.json(
  //       { message: "An error occurred", details: err.message },
  //       { status: 500 },
  //     );
  //   }

  //   return NextResponse.json(
  //     { message: "An unknown error occurred" },
  //     { status: 500 },
  //   );
  // }
};
