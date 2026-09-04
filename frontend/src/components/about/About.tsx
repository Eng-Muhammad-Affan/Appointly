import React, { useState } from 'react';
import {
    ShieldCheck,
    Cpu,
    Users,
    Wrench,
    Wifi,
    Cloud,
    Shield,
    Video,
    Code2,
    Server,
    BarChart3,
    ChevronDown,
} from 'lucide-react';
import Header from '../user/Header';
import Footer from '../user/Footer';

// --- Data ---
const values = [
    {
        title: 'Trust & Reliability',
        description: 'We build trust by offering only authentic, high-quality tech products and reliable services.',
        icon: ShieldCheck,
    },
    {
        title: 'Performance & Innovation',
        description: 'We stay ahead of the curve, providing the latest technology to boost your performance.',
        icon: Cpu,
    },
    {
        title: 'Customer Success',
        description: 'Your success is our goal. We offer expert support to help you get the most from your tech.',
        icon: Users,
    },
];

const services = [
    {
        title: 'IT Support Services',
        description: 'Reliable support including software installation, troubleshooting, and system maintenance for smooth operations.',
        icon: Wrench,
    },
    {
        title: 'Network Solutions',
        description: 'Expert WiFi setup, router configuration, and LAN/WAN management for stable, high-speed connectivity.',
        icon: Wifi,
    },
    {
        title: 'Cloud & Email Services',
        description: 'Professional cloud solutions and business email setup (Microsoft 365, Google Workspace) with migration support.',
        icon: Cloud,
    },
    {
        title: 'Cybersecurity Services',
        description: 'Advanced security solutions including antivirus, firewall setup, and monitoring to protect your business data.',
        icon: Shield,
    },
    {
        title: 'CCTV & Surveillance',
        description: 'Complete surveillance solutions with camera installation and remote monitoring for homes and offices.',
        icon: Video,
    },
    {
        title: 'Web Development',
        description: 'Modern, responsive, and user-friendly websites, from business sites to eCommerce stores, designed for growth.',
        icon: Code2,
    },
    {
        title: 'Data Center & Hosting',
        description: 'Secure and high-performance hosting, domain registration, and server management services.',
        icon: Server,
    },
    {
        title: 'IT Consultancy & GRC',
        description: 'Expert technology consulting and GRC services to align IT with business goals and industry standards.',
        icon: BarChart3,
    },
];

const faqs = [
    {
        question: 'How do I place an order?',
        answer: 'Click on the product which you are interested in. You can also change the color of the product (if available) by clicking on the chosen thumbnails. Click "ADD TO CART" button on the right. If you are a registered customer, please sign in. Enter your shipping details by filling in all fields marked with an "*". Ensure that your shipping information is correct and then select your preferred shipping method. Check your mailbox – you should receive an order confirmation email.'
    },
    {
        question: 'Can I pay from Overseas?',
        answer: 'If you want to gift or pay from overseas and need delivery in Pakistan, you have to send a purchase order through email. The purchase order should be signed by the remitter from overseas and attach the payment copy along with a native ID. In case payment is sent by company, the purchase order should be properly signed and stamped by the company.'
    },
    {
        question: 'How much shipping cost will be charged?',
        answer: 'The shipping cost may vary subject to your location and volume of the package. Within Karachi Rs. 300 will be charged. Countrywide charges may be seen upon selection of your shipping location. For high-value orders above Rs. 10,000, advance payment is required.'
    },
    {
        question: 'How could I contact for a query?',
        answer: 'For your convenience we offer 2 methods of contact:\n\n📱 WhatsApp: [Your WhatsApp Number]\n📧 Email: [Your Email Address]\n\nOur support team is available Monday to Saturday, 9:00 AM to 6:00 PM.'
    },
];

// --- FAQ Accordion Component ---
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border last:border-b-0">
            <button
                className="flex w-full items-center justify-between py-4 text-left transition-all hover:text-blue-main"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-base font-semibold">{question}</span>
                <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
            >
                <p className="text-muted-foreground whitespace-pre-line">{answer}</p>
            </div>
        </div>
    );
};

// --- Main Component ---
const About = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background text-foreground mt-12">
                {/* --- HERO SECTION --- */}
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-main/10 to-background py-16 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
                            {/* Left Side - Text Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="font-audio-wide text-4xl font-bold tracking-tight text-blue-main sm:text-5xl md:text-6xl lg:text-7xl">
                                    Empowering Pakistan <br />
                                    <span className="text-foreground">Through Technology</span>
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:mx-0 md:text-xl">
                                    We are more than an online computer store. We are your trusted partner, providing top-tier technology products and comprehensive IT solutions to help you succeed.
                                </p>
                                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                                    <a
                                        href="#services"
                                        className="inline-flex items-center rounded-md bg-blue-main px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-main/80 hover:shadow-custom-white"
                                    >
                                        Explore Our Services
                                    </a>
                                    <a
                                        href="/products?category=laptops"
                                        className="inline-flex items-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-all hover:bg-muted"
                                    >
                                        Visit Store
                                    </a>
                                </div>
                            </div>

                            {/* Right Side - Illustration */}
                            <div className="flex-1 flex justify-center md:justify-end">
                                <div className="relative w-full max-w-md lg:max-w-lg">
                                    {/* Replace the src with your illustration */}
                                    <img
                                        src="/about-illustration.svg"
                                        alt="Technology illustration showing computers, network, and IT solutions"
                                        className="w-full h-auto"
                                        width={500}
                                        height={400}
                                    />
                                    <div className="absolute -z-10 -bottom-4 -right-4 h-32 w-32 rounded-full bg-blue-main/20 blur-2xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- STORY SECTION --- */}
                <section className="py-12 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Our <span className="text-blue-main">Story</span>
                            </h2>
                            <div className="mt-4 h-1 w-20 bg-blue-main mx-auto"></div>
                            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
                                TechWagera was born from a simple idea: to make high-quality technology accessible and understandable for everyone in Pakistan. We started as a small online store with a passion for computers and a commitment to exceptional customer service. Today, we have evolved into a comprehensive technology partner, offering not just products but a full suite of IT solutions designed to help businesses and individuals thrive in the digital age.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- VALUES SECTION --- */}
                <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Our <span className="text-blue-main">Values</span>
                            </h2>
                            <div className="mt-4 h-1 w-20 bg-blue-main mx-auto"></div>
                            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                                The principles that guide everything we do at TechWagera.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-lg border bg-card p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-main/10 text-blue-main">
                                        <value.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- SERVICES SECTION --- */}
                <section id="services" className="py-12 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Our <span className="text-blue-main">Services</span>
                            </h2>
                            <div className="mt-4 h-1 w-20 bg-blue-main mx-auto"></div>
                            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                                Your Technology Partner – comprehensive IT solutions for businesses and individuals.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service) => (
                                <div
                                    key={service.title}
                                    className="rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-blue-main/50"
                                >
                                    <div className="mb-4 inline-flex rounded-md bg-blue-main/10 p-3 text-blue-main">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{service.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FAQ SECTION --- */}
                <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Frequently Asked <span className="text-blue-main">Questions</span>
                            </h2>
                            <div className="mt-4 h-1 w-20 bg-blue-main mx-auto"></div>
                            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                                Find answers to the most common questions about ordering, shipping, and more.
                            </p>
                        </div>

                        <div className="mx-auto mt-12 max-w-3xl rounded-lg border bg-card p-6 md:p-8">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FINAL CTA SECTION --- */}
                <section className="py-12 md:py-16 lg:py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                            Ready to Elevate Your <span className="text-blue-main">Tech Experience</span>?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                            Visit our store or contact us today. We are here to help you find the perfect solution.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                href="/products?category=desktop-pcs"
                                className="inline-flex items-center rounded-md bg-blue-main px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-main/80 hover:shadow-custom-white"
                            >
                                Visit Our Store
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-all hover:bg-muted"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;