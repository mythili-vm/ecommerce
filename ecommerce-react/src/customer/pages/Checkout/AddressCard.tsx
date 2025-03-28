import { Radio } from "@mui/material";
import { Address } from "../../../types/userTypes";

interface AddressCardProps {
  address: Address;
  isChecked: boolean;
  onSelect: () => void;
}

const AddressCard = (props: AddressCardProps) => {
  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio
          value={props.address}
          name="radio-button"
          checked={props.isChecked}
          onChange={props.onSelect}
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>{props.address.name}</h1>
        <p className="w-[320px]">{props.address.address}</p>
        <p>
          <strong>Mobile :</strong>
          {props.address.mobileNumber}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
