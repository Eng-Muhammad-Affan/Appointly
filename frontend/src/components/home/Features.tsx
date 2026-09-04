import React from 'react';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: <Truck className="w-5 h-5 lg:w-6 lg:h-6" />, label: 'Free Delivery', sub: 'Orders over Rs. 5,000' },
    { icon: <Shield className="w-5 h-5 lg:w-6 lg:h-6" />, label: 'Warranty Assured', sub: 'On all products' },
    { icon: <CreditCard className="w-5 h-5 lg:w-6 lg:h-6" />, label: 'Easy Financing', sub: '0% EMI available' },
    { icon: <Headphones className="w-5 h-5 lg:w-6 lg:h-6" />, label: '24/7 Support', sub: 'Expert tech help' },
  ];

  return (
    <section className="bg-white border-b border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {features.map((item) => (
            <div 
              key={item.label} 
              className="flex items-center xs:items-start sm:items-center gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all duration-200 border border-transparent hover:border-blue-100/50"
            >
              {/* Icon Container - responsive scaling */}
              <div className="bg-blue-50 text-blue-main p-2.5 sm:p-3 rounded-xl flex-shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              
              {/* Text Wrapper - optimized line height and word balancing */}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight truncate sm:whitespace-normal">
                  {item.label}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight sm:leading-normal">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;