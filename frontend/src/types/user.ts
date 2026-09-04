// Product image type - Aligned with SQLAlchemy JSON field
interface ProductImage {
  imageFile: string;
  thumbnailFile: string;
  mediaType: string; 
}

// Specification type - Aligned with SQLAlchemy JSON field
interface Specification {
  specificationName: string;
  value: string;
}

// Main product type - Strictly mirroring the ACTIVE SQLAlchemy model fields
export interface UserProduct {
  // Primary Key
  id: string;

  // Identity & Content
  productName: string;
  productDesc: string;      // Default ""
  productHighlights: string | null;
  brand: string;
  category_id: string; 
  category_slug:string;
  
  // URLs & Media
  productURL: string;
  affiliateURL: string;     // Default ""
  productImages: ProductImage[]; // JSON Column
  manufacturerURL: string;  // Default ""

  // Price Fields (Only 'price' is active in your model)
  price: string; 

  // Stock Fieldsp
  stockStatus: string;      // Default ""
  availability: string;     // Default ""
  availableQuantity: string | null;
  soldQuantity: string | null;
  inventoryTracking: string; // Default "0"
  isNoStockSale: string;     // Default "0"

  // Ratings
  isRating: string;          // Default "0"
  rating: string;            // Default "0.0"
  ratingCount: string;       // Default "0"
  reviewCount: string | null;
  recommendedCount: string | null;

  // Extra Data
  sku: string;               // Default ""
  warranty: string;          // Default ""
  customFields: any[];       // JSON Column
  specifications: Specification[]; // JSON Column
  
  // Timestamps
  created_at: string; 
  updated_at: string;
}

export type CartItem = {
  id: string; 
  quantity: number;
  product:UserProduct
};

export type WishlistItem = {
  id: string; 
  product:UserProduct
};

// types/order.ts

export interface OrderItem {
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product: UserProduct; // Added to match your JSON nested structure
}

export interface Order {
  id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  phone_number:string;
  zipcode:string;
  address:string;
  province:string;
  order_note:string;
  city:string;
  created_at: string;
  items: OrderItem[];
}


export type OrderFilters = {
  status?: Order['status'];
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
};