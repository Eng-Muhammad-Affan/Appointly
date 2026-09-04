import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../user/Footer';
import Header from '../user/Header';

const PoliciesPage: React.FC = () => {
  const location = useLocation();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const sections = [
    { id: 'terms-of-service', title: 'Terms of Service' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'warranty-policy', title: 'Warranty Policy' },
    { id: 'cancellation-policy', title: 'Cancellation Policy' },
    { id: 'shipping-policy', title: 'Shipping Policy' },
    { id: 'return-exchange', title: 'Return & Exchange Policy' },
    { id: 'contact', title: 'Contact Information' },
  ];

  useEffect(() => {
    // Handle hash navigation from URL
    const hash = location.hash.replace('#', '');
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [location.hash]);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 mt-24">
        {/* Main Content */}
        <div>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
            </div>

            {/* Terms of Service */}
            <section
              ref={setRef('terms-of-service')}
              id="terms-of-service"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                Terms of Service
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  This website is operated by <strong>Tech Wagera</strong>. Throughout the site, the terms "we", "us" and "our" refer to Tech Wagera. Tech Wagera offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
                </p>

                <p>
                  Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Any new features or tools that are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                  </p>
                </div>

                <p>
                  We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                </p>

                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
                <p>
                  We are not responsible if the information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this site is at your own risk.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">MODIFICATIONS TO THE SERVICE AND PRICES</h3>
                <p>
                  Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">PRODUCTS OR SERVICES</h3>
                <p>
                  Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We reserve the right to limit the quantities of any products or services that we offer.
                </p>
              </div>
            </section>

            {/* Privacy Policy */}
            <section
              ref={setRef('privacy-policy')}
              id="privacy-policy"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                Privacy Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 font-medium">Your data is safe with us.</p>
                </div>

                <p>
                  This privacy policy outlines how this website (hereafter "the Store") uses and protects any information you provide while using this website. The Store is committed to ensuring that your privacy is protected. We ask you to provide certain information so that you can be identified when using this website.
                </p>

                <p>
                  It will only be used in accordance with this privacy statement. The Store may change this policy from time to time. It is advisable to check this page periodically to ensure you are happy with any changes.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Using Cookies</h3>
                <p>
                  We use cookies to analyze web traffic, improve our website, and understand which pages you find helpful. This data is only used for statistics and is removed afterward. Cookies help us enhance your website experience, but they don't provide access to your computer or personal information unless you choose to share it. You can accept or decline cookies; adjusting your browser settings may impact your site experience.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Do we have control over your personal information?</h3>
                <p>
                  You can control how we use your personal information in few ways: When filling out forms on our website, look for an option to opt out of your information being used for direct marketing. If you previously agreed to us using your info for marketing, you can change your preference anytime by contacting us.
                </p>

                <p>
                  We won't sell, distribute, or lease your info unless you give us permission or it's required by law. If you want a copy or believe the info we have is incorrect, email us through our Contact Us info, and we'll promptly address it.
                </p>
              </div>
            </section>

            {/* Warranty Policy */}
            <section
              ref={setRef('warranty-policy')}
              id="warranty-policy"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                Warranty Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  The standard warranty policy will be applied in accordance with the guidelines set by manufacturers, importers, distributors, and vendors. The Company assumes limited liability in providing a warranty, especially in cases involving damages due to transit, misuse, power failures, unauthorized modifications, improper installation, or any external factors not covered by the manufacturer's warranty.
                </p>

                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Official Warranty</h4>
                    <p className="text-purple-800 text-sm mt-1">
                      For products labeled with "Official Warranty," the warranty is provided by a local channel appointed by the manufacturer. The seller holds no liability or responsibility to support warranty claims or matters related to these products.
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-900">International Warranty</h4>
                    <p className="text-indigo-800 text-sm mt-1">
                      For products labeled with "International Warranty," the customer acknowledges that the seller in Pakistan holds no warranty liability. Should the laptop require service, replacement, or repair, the customer will be responsible for sending the unit to the region where the warranty applies (e.g., US, UAE, etc.). Our role will be limited to providing troubleshooting support.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">Checking Warranty</h4>
                    <p className="text-orange-800 text-sm mt-1">
                      For products labeled with "Checking Warranty," a 3-day warranty period from the date of purchase will be provided. This warranty covers basic functionality but does not extend to issues resulting from misuse, mishandling, or external damage after purchase.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Warranty does NOT cover:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Damage caused by improper use, accidents, abuse, or negligence</li>
                  <li>Products that have been modified, repaired, or tampered with by unauthorized personnel</li>
                  <li>Damage due to power surges, natural disasters, or any environmental conditions</li>
                  <li>Consumables such as batteries, cables, or accessories unless otherwise stated by the manufacturer</li>
                </ul>

                <p className="mt-4">
                  Customers must retain their proof of purchase (receipt or invoice) to make a warranty claim. Any defective product must be returned to us with the original packaging. The Company reserves the right to repair, replace, or offer a refund at its discretion, subject to the warranty terms.
                </p>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mt-4">
                  <p className="text-red-800 text-sm">
                    <strong>Important:</strong> Please check your ordering items while receiving the shipment/delivery. No damage claim will be accepted. For more details: 0321 324 0204
                  </p>
                </div>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section
              ref={setRef('cancellation-policy')}
              id="cancellation-policy"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-red-500 rounded-full mr-3"></span>
                Cancellation Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Cancellation requests of the online orders may be accepted before delivery/pickup. Request may submitted by phone, email, online, or in person.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium">
                    If you have any questions or concerns about our cancellation policy, please contact us at:
                  </p>
                  <p className="text-blue-600 font-semibold mt-2">0333 3520204 - 03243240204</p>
                </div>
              </div>
            </section>

            {/* Shipping Policy */}
            <section
              ref={setRef('shipping-policy')}
              id="shipping-policy"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-teal-500 rounded-full mr-3"></span>
                Shipping Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Your order tentatively arrives within <strong>3 to 6 working days</strong> (excluding Sundays) from the order date. However, delivery may extend to over 7 working days during busy holiday seasons or our mega sale events.
                </p>

                <p>
                  If you don't receive your order within 7 days, please email us at <a href="mailto:cs@techwagera.pk" className="text-blue-600 hover:underline">cs@techwagera.pk</a> and we will track the status of your order.
                </p>

                <div className="bg-teal-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-teal-900">Shipping Costs</h4>
                  <ul className="text-teal-800 text-sm mt-2 space-y-1">
                    <li>Within Karachi: Rs. 300</li>
                    <li>Country-wide charges may vary based on location and package volume</li>
                    <li>For high-value orders above Rs. 10,000, advance payment is required</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Exchange Policy */}
            <section
              ref={setRef('return-exchange')}
              id="return-exchange"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-pink-500 rounded-full mr-3"></span>
                Return & Exchange Policy
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Don't like the product? Wrong or defective product delivered? Don't worry! Tech Wagera offers a <strong>3-day hassle-free return policy</strong> on used product or accessories.
                </p>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="font-medium text-pink-900">Return Address: Office Address</p>
                  <p className="text-pink-800 text-sm mt-1">
                    For inquiries, email us at <a href="mailto:cs@techwagera.pk" className="text-blue-600 hover:underline">cs@techwagera.pk</a> or message us on WhatsApp at <strong>03213240204</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section
              ref={setRef('contact')}
              id="contact"
              className="mb-12 bg-white rounded-2xl shadow-sm p-6 sm:p-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
                Contact Information
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:cs@techwagera.pk" className="text-blue-600 hover:underline">
                        cs@techwagera.pk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-gray-700">0321 324 0204</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-700">0333 3520204</p>
                      <p className="text-gray-700">0324 3240204</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm mt-8 pb-8">
              <p>© {new Date().getFullYear()} Tech Wagera. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PoliciesPage;