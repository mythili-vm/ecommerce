export interface Address{
    id?:number,
    name:string,
    mobileNumber:string,
    pinCode:string,
    address:string,
    locality:string,
    city:string,
    state:string
}

export enum UserRole{
    ROLE_CUSTOMER="ROLE_CUSTOMER",
    ROLE_SELLER="ROLE_SELLER",
    ROLE_ADMIN="ROLE_ADMIN"
}

export interface User{
    id?:number,
    password:string,
    email:string,
    fullName:string,
    mobile:string,
    addresses:Address[],
    role:UserRole
}

export interface UserState{
    user:User|null,
    loading:boolean,
    error:string|null,
    profileUpdated:boolean
}