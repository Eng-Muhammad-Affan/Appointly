import { useState } from "react"
import { Link } from "react-router-dom"
import { X, ShoppingCart, Heart, Minus, Plus, Link as IconLink, MessageCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
} from "@mui/material"

import { useCartStore } from "@/stores/use-cart"
import { useWishlistStore } from "@/stores/use-wishlist"
import { UserProduct } from "@/types/user"

export const UserProductCard = ({
    product,
}: {
    product: UserProduct
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)

    const { addItem } = useCartStore()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()

    const isWishlisted = isInWishlist(product.id)
    const firstImage = product.productImages?.[0]?.thumbnailFile || "/placeholder-image.png"
    const hasPrice = Number(product.price) > 0

    const handleQuickShop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setQuantity(1)
        setIsDialogOpen(true)
    }

    const handleAddToCart = async () => {
        try {
            setIsAdding(true)
            // 1. Close the dialog immediately so the backdrops don't conflict
            setIsDialogOpen(false)
            
            // 2. Add the item and trigger the global drawer state smoothly
            await addItem(product, quantity)
            setQuantity(1)
        } catch (error) {
            console.error("Failed to add item:", error)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <>
            <div
                className="group bg-white rounded-lg sm:rounded-2xl overflow-hidden sm:shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container - Fixed Aspect Ratio for Wide Products */}
                <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex items-center justify-center">
                    <Link to={`/products/${product.id}`} className="w-full h-full">
                        <img
                            src={firstImage}
                            alt={product.productName}
                            className="w-full h-full object-contain p-4 transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                    </Link>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating Quick Shop Button - Restored Animation */}
                    {hasPrice && (
                        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}>
                            <button
                                onClick={handleQuickShop}
                                className="relative overflow-hidden bg-white text-blue-main rounded-xl px-8 py-3 shadow-xl min-w-[140px] h-[44px] flex items-center justify-center group/button hover:bg-blue-main hover:text-white transition-all duration-300 border border-blue-main/10"
                            >
                                <span className="absolute transition-all duration-300 ease-in-out group-hover/button:-translate-y-10 group-hover/button:opacity-0 font-bold text-sm">
                                    Quick Shop
                                </span>
                                <ShoppingCart className="absolute h-5 w-5 translate-y-10 opacity-0 group-hover/button:translate-y-0 group-hover/button:opacity-100 transition-all duration-300 ease-in-out" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-grow">
                    <Link to={`/products/${product.id}`}>
                        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors h-10">
                            {product.productName}
                        </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-3 font-medium">{product.brand}</p>

                    <div className="mt-auto flex items-center justify-between gap-1 sm:gap-2">
                        <div>
                            {hasPrice ? (
                                <span className="text-xs sm:text-base font-bold text-blue-main">
                                    Rs {Math.round(Number(product.price)).toLocaleString()}
                                </span>
                            ) : (
                                <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                                    <MessageCircle size={16} fill="currentColor" className="text-green-600" />
                                    <span>Inquiry</span>
                                </div>
                            )}
                        </div>

                        <Link
                            to={`/products/${product.id}`}
                            className="bg-white sm:bg-blue-50 text-blue-main p-1 sm:p-2.5 rounded-xl hover:bg-blue-main hover:text-white transition-all sm:border border-blue-100"
                        >
                            <IconLink size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Shop Dialog */}
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="xs"
                fullWidth
                // PaperProps={{
                //     sx: { borderRadius: "20px" }
                // }}
            >
                <DialogContent sx={{ p: 2.5 }}>
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.1rem", p: 0 }}>
                            Quick Shop
                        </DialogTitle>
                        <IconButton onClick={() => setIsDialogOpen(false)} size="small">
                            <X size={20} />
                        </IconButton>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border">
                                <img
                                    src={firstImage}
                                    alt={product.productName}
                                    className="w-full h-full object-contain p-1"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                                    {product.productName}
                                </h3>
                                <p className="text-blue-main font-bold mt-1">
                                    Rs {Number(product.price).toLocaleString()}
                                </p>
                            </div>
                            <IconButton
                                onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                                sx={{
                                    alignSelf: 'flex-start',
                                    backgroundColor: isWishlisted ? "#fee2e2" : "#f3f4f6",
                                    '&:hover': { backgroundColor: isWishlisted ? "#fecaca" : "#e5e7eb" }
                                }}
                            >
                                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                            </IconButton>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Quantity</span>
                            <div className="flex items-center gap-6">
                                <IconButton
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    sx={{ border: "1px solid #e5e7eb", width: 36, height: 36 }}
                                >
                                    <Minus size={16} />
                                </IconButton>
                                <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                                <IconButton
                                    onClick={() => setQuantity(q => q + 1)}
                                    sx={{ border: "1px solid #2563eb", color: "#2563eb", width: 36, height: 36 }}
                                >
                                    <Plus size={16} />
                                </IconButton>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            sx={{
                                height: 54,
                                borderRadius: "16px",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "1rem",
                                backgroundColor: "#2563eb",
                                boxShadow: "none",
                                '&:hover': { backgroundColor: "#1d4ed8", boxShadow: "none" }
                            }}
                        >
                            {isAdding ? "Adding..." : "Add to Cart"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}