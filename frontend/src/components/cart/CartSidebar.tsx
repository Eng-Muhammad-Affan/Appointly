import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { useCartStore } from "@/stores/use-cart"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

interface CartSheetProps {
    children?: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
    const {
        items,
        isOpen,
        setIsOpen,
        removeItem,
        updateQuantity,
    } = useCartStore()

    const total = items.reduce((sum, item) => {
        return sum + (Number(item.product.price) * item.quantity)
    }, 0)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {children && (
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
            )}

            {/* Set up a strict flex container with full viewport constraints */}
            <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0 gap-0">
                
                {/* Header Container */}
                <div className="p-3 border-b">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <ShoppingCart className="h-5 w-5 text-gray-900" />
                            Shopping Cart ({items.length})
                        </SheetTitle>
                        <SheetDescription className="text-xs sm:text-sm">
                            {items.length === 0
                                ? "Your cart is empty"
                                : "Review your items before checkout"}
                        </SheetDescription>
                    </SheetHeader>
                </div>

                {/* Core Scroll Area with fixed height restrictions */}
                <div className="cart-sidebar-vertical-scroll-area flex-1 overflow-y-auto min-h-0">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                            <ShoppingCart className="h-12 w-12 mb-3 stroke-[1.5]" />
                            <p className="text-base font-semibold text-gray-900">Your cart is empty</p>
                            <p className="text-xs text-gray-500 mt-0.5">Add some items to get started</p>
                        </div>
                    ) : (
                        <div>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 px-3 py-7 bg-white items-center transition-all"
                                >
                                    {/* Mini Product Image Aspect Scaling */}
                                    {item.product.productImages?.[0] && (
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                                            <img
                                                src={item.product.productImages[0].imageFile}
                                                alt={item.product.productName}
                                                className="w-full h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                    )}

                                    {/* Responsive Text & Controls Panel */}
                                    <div className="flex-1 min-w-0 pr-1">
                                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 leading-tight mb-0.5">
                                            {item.product.productName}
                                        </h4>
                                        <p className="text-xs font-semibold text-gray-500 mb-2">
                                            Rs {Number(item.product.price).toLocaleString()}
                                        </p>

                                        {/* Inline Responsive Quantity Adjusters */}
                                        <div className="flex items-center gap-1.5">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 rounded-md border-gray-200"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3 text-gray-600" />
                                            </Button>
                                            <span className="w-6 text-center text-xs font-bold text-gray-900">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 rounded-md border-gray-200"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3 text-gray-600" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Actions Anchor Block - Safe tracking layout prevents horizontal bleeding */}
                                    <div className="flex flex-col items-end justify-between h-16 sm:h-20 flex-shrink-0 pl-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            onClick={() => removeItem(item.product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                                            Rs {Math.round(Number(item.product.price) * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Fixed Footer Area Container */}
                {items.length > 0 && (
                    <div className="border-t bg-white">
                        <SheetFooter className="flex-col gap-4 w-full sm:flex-col">
                            <div className="flex justify-between items-center w-full mb-2">
                                <span className="text-sm sm:text-md font-medium text-gray-600">Subtotal:</span>
                                <span className="text-lg sm:text-xl font-extrabold text-gray-900">
                                    Rs {Math.round(total).toLocaleString()}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full">
                                <SheetClose asChild>
                                    <Link to="/cart" className="w-full">
                                       <Button className="w-full font-medium text-md p-5 bg-blue-main text-white">
                                            View cart
                                        </Button>
                                    </Link>
                                </SheetClose>
                                
                                <SheetClose asChild>
                                    <Link to="/checkout" className="w-full">
                                        <Button className="text-md w-full font-medium p-5 bg-blue-main text-white">
                                            Checkout
                                        </Button>
                                    </Link>
                                </SheetClose>
                                
                                <SheetClose asChild>
                                    <Button 
                                        variant="ghost" 
                                        className="text-md w-full text-gray-400 hover:text-gray-600 font-medium mt-1"
                                    >
                                        Continue Shopping
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}