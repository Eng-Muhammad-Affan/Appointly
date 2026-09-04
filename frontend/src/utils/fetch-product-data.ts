import api from "@/lib/api";
import { UserProduct } from "../types/user";

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products")
  } catch (err) {
    
  }
}