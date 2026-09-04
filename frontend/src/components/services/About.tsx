// components/AboutSection.tsx
import React from 'react';

interface AboutSectionProps {
    title?: string;
    description?: string;
    stats?: Array<{
        value: string;
        label: string;
    }>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
    title = "About Techwagera",
    description = "Techwagera has been Pakistan's trusted tech partner since 2018. While thousands buy from our store, businesses and homeowners rely on us for professional installation, maintenance, and IT support. We combine quality products with expert services to deliver complete tech solutions.",
    stats = [
        { value: "500+", label: "CCTV Cameras Installed" },
        { value: "200+", label: "Maintenance Contracts" },
        { value: "98%", label: "Customer Satisfaction" },
        { value: "24/7", label: "Technical Support" }
    ]
}) => {
    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;