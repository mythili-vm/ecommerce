import { Category } from "../State/customer/categorySlice";
import { Seller } from "./SellerTypes";

export interface Product {
    id: number;
    title:string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent: number;
    quantity: number;
    color: string;
    images: string[];
    numRatings?: number;
    category?:Category;
    seller?:Seller;
    createdAt?:Date;
    sizes:string;
    in_stock?:boolean;
}
