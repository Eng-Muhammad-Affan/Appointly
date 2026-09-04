import { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

import api from "@/lib/api";
import Header from "../user/Header";

const ContactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .transform((name) => name.trim()),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .max(255, "Email is too long")
        .transform((email) => email.toLowerCase().trim()),
    subject: z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .max(200, "Subject is too long")
        .transform((subject) => subject.trim()),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message is too long")
        .transform((message) => message.trim()),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

interface ApiErrorResponse {
    message: string;
    code?: string;
}

const ContactComponent = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(ContactFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    useEffect(() => {
        setTimeout(() => setFocus("name"), 100);
    }, [setFocus]);

    const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const data = error.response?.data;

        switch (status) {
            case 429:
                toast.error(
                    "Too many messages sent. Please wait a moment before trying again."
                );
                break;

            case 400:
                toast.error(
                    data?.message || "Please check your information and try again."
                );
                break;

            default:
                toast.error(
                    data?.message || "An unexpected error occurred. Please try again."
                );
        }
    };

    const submitContactForm = async (data: ContactFormData) => {
        try {
            const response = await api.post("/contact", data);

            const { message } = response.data as {
                message: string;
            };

            toast.success(message || "Message sent successfully!");
            reset();
            navigate("/")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                handleApiError(error as AxiosError<ApiErrorResponse>);
            } else {
                toast.error(
                    "Network error. Please check your connection and try again."
                );
            }
        }
    };

    return (
        <>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="max-w-2xl mx-auto px-4 sm:px-0">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                            <FaEnvelope className="h-8 w-8 text-blue-main" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Get in Touch</h1>
                        <p className="text-gray-500 mt-2">
                            Have a question or feedback? We'd love to hear from you.
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaPhone className="h-4 w-4 text-blue-main" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500">Phone</p>
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    +92 333 3520204
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaEnvelope className="h-4 w-4 text-blue-main" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500">Email</p>
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    support@techwaghera.pk
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaMapMarkerAlt className="h-4 w-4 text-blue-main" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500">Address</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Flat No A2 Dawood Appartments Pechs block 2 Karachi
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(submitContactForm)} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    {...register("name")}
                                    type="text"
                                    id="name"
                                    autoComplete="name"
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.name
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 hover:border-gray-400"
                                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p
                                    id="name-error"
                                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                >
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 hover:border-gray-400"
                                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    placeholder="name@company.com"
                                />
                            </div>
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                >
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Subject
                            </label>
                            <div className="relative">
                                <input
                                    {...register("subject")}
                                    type="text"
                                    id="subject"
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? "subject-error" : undefined}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white ${errors.subject
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 hover:border-gray-400"
                                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    placeholder="How can we help you?"
                                />
                            </div>
                            {errors.subject && (
                                <p
                                    id="subject-error"
                                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                >
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                    {errors.subject.message}
                                </p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Message
                            </label>
                            <div className="relative">
                                <textarea
                                    {...register("message")}
                                    id="message"
                                    rows={5}
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-main focus:border-blue-main transition-all duration-200 outline-none bg-white resize-none ${errors.message
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 hover:border-gray-400"
                                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>
                            {errors.message && (
                                <p
                                    id="message-error"
                                    className="text-red-500 text-xs mt-2 flex items-center gap-1"
                                >
                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-main to-blue-600 text-white py-3.5 rounded-2xl font-semibold text-base hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-main focus:ring-offset-2 shadow-lg shadow-blue-main/25 hover:shadow-xl hover:shadow-blue-main/30"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                    <span>Sending Message...</span>
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane className="h-5 w-5" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 p-4 border-t border-gray-100">
                        <p className="text-center text-gray-500 text-sm">
                            We typically respond within 24 hours during business days.
                        </p>
                    </div>
                </div>

                {/* Additional Help Text */}
                <p className="text-center text-xs text-gray-400 my-6">
                    By sending a message, you agree to our{" "}
                    <span className="underline hover:text-gray-600 cursor-pointer">
                        Privacy Policy
                    </span>{" "}
                    and consent to us storing your information for support purposes.
                </p>
            </div>
        </>
    );
};

export default ContactComponent;