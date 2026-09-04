export type InventryProductImages = {
  imageFile: string;
  thumbnailFile: string;
  mediaType: string;
};

export type InventoryProductSpecification = {
  specificationName: string;
  value: string;
};

export type InventoryProduct = {
  // Metadata
  id: string;
  productName: string;
  productDesc: string; // Has default ""
  productHighlights: string | null;
  productURL: string;
  affiliateURL: string; // Has default ""
  productImages: InventryProductImages[]; // JSON Column

  // Category
  category_id: string | null;
  category_slug:string | null

  // Price Fields
  price: string;

  // Stock Fields
  stockStatus: string;
  availability: string;
  availableQuantity: string | null;
  soldQuantity: string | null;
  inventoryTracking: string;
  isNoStockSale: string;


  // Rating Fields
  isRating: string;
  rating: string;
  ratingCount: string;
  reviewCount: string | null;
  recommendedCount: string | null;

  // Product Info
  sku: string;
  brand: string | null;
  warranty: string;
  manufacturerURL: string;
  customFields: any[]; // JSON Column
  specifications: InventoryProductSpecification[]; // JSON Column

  // Tags & Dates
  created_at: string; // DateTime objects are serialized to ISO strings
  updated_at: string;
};

export interface OrderItem {
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product: InventoryProduct; 
}

export interface Order {
  user_name:string;
  user_email:string;
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

export type User = {
  name:string;
  email:string; 
  hashed_password:string;
  role:"admin" | "user",
  id:string
}