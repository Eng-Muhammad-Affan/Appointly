import { Home, Info, Phone, BookOpen, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';


const HeaderTop = () => {
    const topNavLinks = [
        {
            text: "Home",
            icon: Home,
            href: "/"
        },
        {
            text: "Services",
            icon: Briefcase,
            href: "/about#services"
        },
        {
            text: "Contact",
            icon: Phone,
            href: "/contact"
        },
        {
            text: "About us",
            icon: Info,
            href: "/about"
        },
        {
            text: "Blog",
            icon: BookOpen,
            href: "/blogs"
        },

    ]
    return (
        <div className='w-full bg-gray-50 border-b border-gray-200'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end h-7 text-xs">
                    <div className="flex items-center gap-5">
                        {topNavLinks.map((link) => (
                            <>
                                <Link to={link.href} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5" key={link.text}>
                                    {/* <link.icon className="h-3 w-3" /> */}
                                    <span>{link.text}</span>
                                </Link>
                                {/* <span className="text-gray-300">|</span> */}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop