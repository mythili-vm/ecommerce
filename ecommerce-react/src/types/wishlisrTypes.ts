import { Product } from "./ProductTypes";
import { User } from "./userTypes";

export interface Wishlist{
    id: number;
    userId: User;
    products: Product[];
}
export interface WishlistState{
    wishlist: Wishlist | null;
    loading: boolean;
    error: string | null;
}

export interface AddProductToWishlistPayload{
    productId: number;
    wishlistId: number;
}