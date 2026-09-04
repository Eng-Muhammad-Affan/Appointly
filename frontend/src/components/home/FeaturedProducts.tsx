import type { UserProduct } from "@/types/user"
import { UserProductCard } from "./UserProductCards"
import { useEffect, useState, useRef } from "react"
import api from "@/lib/api"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export const FeaturedProducts = () => {
    const [displayProducts, setDisplayProducts] = useState<UserProduct[]>([])
    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getFeaturedProducts = async () => {
            try {
                const response = await api.get("/products/featured")
                const data = response.data.data
                setDisplayProducts(data)
            } catch (err) {
                console.error("Failed to fetch featured products:", err)
            }
        }

        getFeaturedProducts()
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current
            const scrollAmount = direction === "left" ? -clientWidth : clientWidth
            carouselRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Section */}
            <div className="flex items-end justify-between mb-10">
                <div>
                    <span className="text-blue-main font-bold text-sm uppercase tracking-widest">Handpicked For You</span>
                    <h2 className="text-4xl font-audio-wide font-black text-gray-900 mt-1" style={{ letterSpacing: '-0.02em' }}>
                        Featured Products
                    </h2>
                </div>
                
                <Link to="/products"
                    className="hidden sm:inline-flex items-center gap-2 text-blue-main font-bold hover:text-blue-main transition-colors text-sm border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50">
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Carousel Wrapper Context */}
            <div className="relative px-4 sm:px-0">
                
                {/* Left Caret Button */}
                {displayProducts.length > 0 && (
                    <button 
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all hidden sm:flex items-center justify-center"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Carousel Container */}
                <div 
                    ref={carouselRef}
                    className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayProducts.map((product: UserProduct) => (
                        <div 
                            key={product.id} 
                            className="shrink-0 snap-start w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
                        >
                            <UserProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Right Caret Button */}
                {displayProducts.length > 0 && (
                    <button 
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all hidden sm:flex items-center justify-center"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Mobile View All Button */}
            <div className="text-center mt-10 sm:hidden">
                <Link to="/products?category=desktop-pcs"
                    className="inline-flex items-center gap-2 bg-blue-main text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-main transition-colors shadow-lg">
                    View All Products <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    )
}