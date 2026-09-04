// components/ServicesSection.tsx
import React from 'react';

interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  price?: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  onRequestQuote?: (serviceId: number) => void;
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "IT Maintenance",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 11h14M5 15h14M5 19h14M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
    description: "Comprehensive IT maintenance for businesses and individuals",
    features: ["PC Cleanup & Optimization", "Virus & Malware Removal", "Network Setup & Security", "Monthly Maintenance Plans"],
    price: "From Rs. 5,000/month"
  },
  {
    id: 2,
    title: "CCTV Installation",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    description: "Professional CCTV camera installation for homes and offices",
    features: ["Free Site Survey", "Camera Placement Planning", "DVR/NVR Configuration", "Remote Viewing Setup"],
    price: "From Rs. 3,500/camera"
  },
  {
    id: 3,
    title: "Technical Assistance",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: "On-site and remote technical support when you need it",
    features: ["On-site Support (24-48hr response)", "Remote Troubleshooting", "Printer & Peripheral Setup", "Data Recovery Services"],
    price: "From Rs. 1,500/visit"
  },
  {
    id: 4,
    title: "Hardware Repair",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    description: "Expert hardware diagnostics and repairs",
    features: ["Laptop Screen Replacement", "Battery Replacement", "Charging Port Repair", "Diagnostic Services"],
    price: "Call for quote"
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "Services We Offer",
  subtitle = "Professional tech solutions tailored to your needs",
  services = defaultServices,
  onRequestQuote
}) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {service.description}
                </p>
                <div className="w-full border-t border-gray-200 dark:border-gray-700 my-3"></div>
                <ul className="space-y-2 mb-4 w-full">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.price && (
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    {service.price}
                  </p>
                )}
                <button
                  onClick={() => onRequestQuote?.(service.id)}
                  className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;