import { ArrowRight, Laptop, Cpu, ShieldCheck, Code } from "lucide-react"
import { Link } from "react-router-dom"

export const PromoCards = () => {
    return (
        <section className="my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Banner 1: Premium Products Card */}
                <div className="relative overflow-hidden rounded-3xl bg-[#0a0f18] p-8 text-white shadow-xl border border-white/5 group">
                    
                    {/* Background Glow Overlay - Sapphire/Blue Theme */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-blue-500/10 transition-opacity duration-300 group-hover:to-blue-500/20" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl" />
                    
                    {/* Floating Decorative Graphic Component */}
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Laptop size={260} strokeWidth={1} className="text-blue-400" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 h-full flex flex-col justify-between min-h-[260px]">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <Cpu className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">Hardware & Tech</span>
                            </div>
                            
                            <h3 className="text-2xl font-black leading-tight mb-2">
                                Enterprise Hardware
                                <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Certified Tech & Products</span>
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-6 max-w-[70%] sm:max-w-[60%]">
                                From premium workstations to secure CCTV systems. Upgrade your infrastructure with certified warranty.
                            </p>
                        </div>

                        <div>
                            <Link to="/products"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-600/20">
                                Explore Products <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Banner 2: Premium Services Card */}
                <div className="relative overflow-hidden rounded-3xl bg-[#090d16] p-8 text-white shadow-xl border border-white/5 group">
                    
                    {/* Background Glow Overlay - Emerald/Cyan Theme */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-cyan-500/10 transition-opacity duration-300 group-hover:to-cyan-500/20" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyan-600/10 blur-3xl" />
                    
                    {/* Floating Decorative Graphic Component */}
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                        <Code size={260} strokeWidth={1} className="text-cyan-400" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 h-full flex flex-col justify-between min-h-[260px]">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">IT Consultancy</span>
                            </div>
                            
                            <h3 className="text-2xl font-black leading-tight mb-2">
                                Expert IT Services
                                <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Software & Installations</span>
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-6 max-w-[70%] sm:max-w-[60%]">
                                Professional software development, network setups, and smart CCTV security integrations.
                            </p>
                        </div>

                        <div>
                            <Link to="/contact"
                                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/40 hover:shadow-cyan-600/20">
                                Book Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}