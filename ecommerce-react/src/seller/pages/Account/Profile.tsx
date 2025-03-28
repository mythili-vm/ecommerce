import React from "react";
import { useAppSelector } from "../../../State/Store";
import { Avatar, Divider, IconButton } from "@mui/material";
import ProfileFieldCard from "../../../component/ProfileFieldCard";
import { Edit } from "@mui/icons-material";

const Profile = () => {
  const { seller } = useAppSelector((store) => store);
  return (
    <div>
      <div className="flex pl-5 py-10">
        <div className="w-full lg:w-[70%]">
          <div className="flex pb-3 justify-between">
            <h1 className="text-2xl font-bold text-gray-600">
              Personal Details
            </h1>
            <IconButton
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "50px",
                p: "10px",
              }}
            >
              <Edit />
            </IconButton>
          </div>
          <div className="">
            <Avatar
              src="https://lh3.googleusercontent.com/a/AEdFTp6FZ2Xg6nxtLDPKkPm9-gE4O3YpOz4j8TcPN7_h53o=s96-c" // Replace with actual profile image URL
              alt="Seller Profile"
              sx={{ width: 100, height: 100 }}
            />
            <ProfileFieldCard keys="Seller Name" value={seller.profile?.sellerName} />
            <Divider />
            <ProfileFieldCard keys="Seller Email" value={seller.profile?.email} />
            <Divider />
            <ProfileFieldCard keys="Seller Phone" value={seller.profile?.mobile} />
          </div>
        </div>
      </div>
      <div className="flex pl-5 py-10">
        <div className="w-full lg:w-[70%]">
          <div className="flex pb-3 justify-between">
            <h1 className="text-2xl font-bold text-gray-600">
              Business Details
            </h1>
            <IconButton
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "50px",
                p: "10px",
              }}
            >
              <Edit />
            </IconButton>
          </div>
          <div className="">
            <ProfileFieldCard
              keys="Business Name/Brand Name"
              value={seller.profile?.businessDetails.businessName}
            />
            <Divider />
            <ProfileFieldCard keys="GSTIN" value={seller.profile?.gstin ?? "NA"} />
            <Divider />
            <ProfileFieldCard keys="Account Status" value={seller.profile?.accountStatus} />
          </div>
        </div>
      </div>
      <div className="flex pl-5 py-10">
        <div className="w-full lg:w-[70%]">
          <div className="flex pb-3 justify-between">
            <h1 className="text-2xl font-bold text-gray-600">Pickup Address</h1>
            <IconButton
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "50px",
                p: "10px",
              }}
            >
              <Edit />
            </IconButton>
          </div>
          <div className="">
            <ProfileFieldCard keys="Address" value={seller.profile?.pickUpAddress.address} />
            <Divider />
            <ProfileFieldCard keys="City" value={seller.profile?.pickUpAddress.city} />
            <Divider />
            <ProfileFieldCard keys="State" value={seller.profile?.pickUpAddress.state} />
            <Divider />
            <ProfileFieldCard keys="Mobile" value={seller.profile?.pickUpAddress.mobileNumber} />
          </div>
        </div>
      </div>
      <div className="flex pl-5 py-10">
        <div className="w-full lg:w-[70%]">
          <div className="flex pb-3 justify-between">
            <h1 className="text-2xl font-bold text-gray-600">Bank Details</h1>
            <IconButton
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: "50px",
                p: "10px",
              }}
            >
              <Edit />
            </IconButton>
          </div>
          <div className="">
            <ProfileFieldCard
              keys="Account Holder Name"
              value={seller.profile?.bankDetails.accountHolderName}
            />
            <Divider />
            <ProfileFieldCard keys="Account Number" value={seller.profile?.bankDetails.accountNumber} />
            <Divider />
            <ProfileFieldCard keys="IFSC Code" value={seller.profile?.bankDetails.ifscCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
