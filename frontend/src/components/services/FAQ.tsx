// components/FAQSection.tsx
import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    question: "Do you offer on-site service in my city?",
    answer: "Yes, we currently provide on-site services in Lahore, Islamabad, Rawalpindi, and Karachi. For other cities, please contact us to check availability. Remote support is available nationwide."
  },
  {
    id: 2,
    question: "Is there a warranty on CCTV installation?",
    answer: "Yes, all our CCTV installations come with a 7-day workmanship warranty. Hardware warranty depends on the manufacturer, typically ranging from 6 months to 1 year. We also offer extended warranty plans."
  },
  {
    id: 3,
    question: "Can I buy a camera from you AND get installation?",
    answer: "Absolutely! You can either purchase cameras directly from our store and get discounted installation, or you can buy from elsewhere and we'll install them for a standard service fee. Both options are available."
  },
  {
    id: 4,
    question: "Do you offer monthly IT maintenance contracts for offices?",
    answer: "Yes, we offer flexible monthly maintenance contracts for businesses of all sizes. Plans start from Rs. 5,000/month and include regular checkups, priority support, and discounted rates for additional services."
  },
  {
    id: 5,
    question: "How fast can a technician arrive?",
    answer: "For on-site support in major cities, we typically dispatch a technician within 24-48 hours. Emergency services are available with 4-6 hour response time for an additional fee. Remote support is usually available within 2-4 hours."
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept cash, bank transfers, Easypaisa, JazzCash, and all major credit/debit cards. For maintenance contracts and large installations, we also offer installment plans."
  }
];

const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Got questions? We've got answers.",
  faqs = defaultFaqs
}) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openId === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openId === faq.id ? 'max-h-96 p-5' : 'max-h-0 p-0'
                  } overflow-hidden bg-white dark:bg-gray-900`}
                >
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schema markup for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
};

export default FAQSection;