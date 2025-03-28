export interface Seller {
    id?:number;
    mobile:string;
    otp:string;
    GSTIN:string;
    pickupAddress:PickupAddress;
    bankDetails:BanKDetails;
    sellerName:string;
    email:string;
    businessDetails:BusinessDetails;
    password:string;
    accountStatus:string;
    role:"ROLE_SELLER";
}

export interface PickupAddress{
    name:string;
    mobile:string;
    pincode:string;
    address:string;
    locality:string;
    city:string;
    state:string;
}

export interface BanKDetails{
    accountNumber:string;
    ifscCode:string;
    accountHolderName:string;
}

export interface BusinessDetails{
    businessName:string;
}

export interface SellerReport{
    id:number;
    seller:Seller;
    totalEarnings:number;
    totalSales:number;
    totalRefunds:number;
    totalTax:number;
    netEarnings:number;
    totalOrders:number;
    canceledOrders:number;
    totalTransactions:number;
}