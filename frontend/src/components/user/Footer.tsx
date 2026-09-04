import React from 'react';
import { Link } from 'react-router-dom';
import { useCategoryStore } from '@/stores/use-categories';
import Logo from "@/assets/logo.png";
import { FaInstagram, FaTiktok, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  // Use unique labels or IDs from categoriesHome to prevent duplicate keys or unintended re-renders

  const { categories } = useCategoryStore()
  const uniqueCategories = Array.from(new Map(categories.map(item => [item.name, item])).values());

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/Techwagera/', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/techwagera/?hl=en', label: 'Instagram' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@techwagera', label: 'Tiktok' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/techwagera/?trk=similar-pages&originalSubdomain=pk', label: 'Linkedin' },
    { icon: FaWhatsapp, href: 'https://wa.me/923213240204?text=""', label: 'Whatsapp' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Returns & Exchange', href: '/about#return-exchange' },
    { name: 'Terms Of Service', href: '/about#terms-of-service' },
    { name: 'Warranty Policy', href: '/about#warranty-policy' },
    { name: 'Order cancellation', href: '/about#cancellation-policy' },
    { name: 'Privacy Policy', href: '/about#privacy-policy' }
  ];

  return (
    <footer id="contact" className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0 relative right-4 mb-3">
              <img src={Logo} alt="Tech Waghera" className='h-16 w-40' />
            </Link>

            <p className="text-sm leading-relaxed text-gray-500">
              Pakistan's trusted electronics destination. Quality products, fair prices, and real support.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  aria-label={s.label}
                  className="group w-9 h-9 bg-white/5 hover:bg-blue-main rounded-xl transition-all duration-200 flex justify-center items-center"
                >
                  <s.icon className='size-6 text-blue-main group-hover:text-black transition-colors' />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {uniqueCategories.map((c) => {
                const categoryName = c.name.replace("-", " ")[0].toUpperCase() + c.name.replace("-", " ").slice(1).toLowerCase()
                return (
                  <li key={c.id || c.name}>
                    <Link to={`/products?category=${c.slug}`} className="hover:text-blue-400 transition-colors">
                      {categoryName}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><span className="text-blue-main"><Phone size={16} /></span> 0333 3520204</li>
              <li className="flex gap-2"><span className="text-blue-main"><Phone size={16} /></span> 0324 3240204</li>
              <li className="flex gap-2"><span className="text-blue-main"><Mail size={16} /></span>support@techwaghera.pk</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Tech Waghera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;