CREATE TABLE "otp_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"otp" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "buffer_time" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "cancellation_policy" text NOT NULL;