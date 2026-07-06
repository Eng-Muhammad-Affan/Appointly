export interface Service {
  id: string;
  title: string;
  providerName: string;
  category: ServiceCategory;
  rating: number;
  price: number;
  priceUnit: string;
  imageUrl: string;
  imageAlt: string;
  isTrusted: boolean;
  isAvailable: boolean;
  completedAppointments: number;
  location: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type ServiceCategory =
  | "all"
  | "salons"
  | "clinics"
  | "wellness"
  | "fitness"
  | "consulting"
  | "automotive"
  | "other";

export interface ServiceFilters {
  search: string;
  category: ServiceCategory;
  location: string | null;
  minRating: number | null;
  trustedOnly: boolean;
}

export interface ServicesResponse {
  services: Service[];
  total: number;
  page: number;
  totalPages: number;
}