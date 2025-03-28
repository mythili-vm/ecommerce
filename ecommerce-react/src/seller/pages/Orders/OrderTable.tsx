import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerOrders, updateOrderStatus } from "../../../State/seller/sellerOrderSlice";
import { INR_SYMBOL } from "../../../util/constants";
import { Button, Menu, MenuItem } from "@mui/material";
import { color } from "../../../data/Filter/color";
import { stat } from "fs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const orderStatus =[
  {color:"#FFA500",label:"PENDING"},
  {color:"#F5BCBA",label:"PLACED"},
  {color:"#F5BCBA",label:"CONFIRMED"},
  {color:"#1E90FF",label:"SHIPPED"},
  {color:"#32CD32",label:"DELIVERED"},
  {color:"#FF0000",label:"CANCELLED"},
];

const orderStatusColor={
  PENDING:{color:"#FFA500",label:"PENDING"},
  PLACED:{color:"#F5BCBA",label:"PLACED"},
  CONFIRMED:{color:"#F5BCBA",label:"CONFIRMED"},
  SHIPPED:{color:"#1E90FF",label:"SHIPPED"},
  DELIVERED:{color:"#32CD32",label:"DELIVERED"},
  CANCELLED:{color:"#FF0000",label:"CANCELLED"},
}


export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState<null | any>({});
  const open = Boolean(anchorEl);
  const handleClick = (event: any, orderId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [orderId]: event.currentTarget }));
  };
  const handleClose = (orderId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [orderId]: null }));
  };

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, []);


  const handleUpdateOrderStatus = (orderId: number,orderStatus:any) => {
   dispatch(updateOrderStatus({jwt:localStorage.getItem("jwt") || "",orderId,orderStatus}));
   handleClose(orderId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex gap-1 flex-wrap">
                  {item.orderItems.map((orderItem) => (
                    <div key={orderItem.id}>
                      <img
                        src={orderItem.product.images[0]}
                        alt=""
                        className="w-20 rounded-md"
                      />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title : {orderItem.product.title}</h1>
                        <h1>
                          Selling Price : {INR_SYMBOL}{" "}
                          {orderItem.product.sellingPrice}
                        </h1>
                        <h1>Color : {orderItem.product.color}</h1>
                        <h1>Size : {orderItem.product.sizes}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="flex-col justify-between py-2">
                  <h1>{item.shippingAddress.name}</h1>
                  <h1>{item.shippingAddress.address}</h1>
                  <h1>{item.shippingAddress.city}</h1>
                  <h1>{item.shippingAddress.state}</h1>
                  <h1>{item.shippingAddress.pinCode}</h1>
                  <h1>
                    <strong>Mobile :</strong>
                    {item.shippingAddress.mobileNumber}
                  </h1>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className="px-5 py-2 border rounded-full text-primary-color border-primary-color">
                  {item.orderStatus}
                </span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button size="small" color="primary" onClick={(e)=>handleClick(e,item.id)}>status</Button>
                <Menu
                  id={`status-menu ${item.id}`}
                  anchorEl={anchorEl[item.id]}
                  open={Boolean(anchorEl[item.id])}
                  onClose={()=>handleClose(item.id)}
                  slotProps={{
                    list: {
                      "aria-labelledby": `status-menu ${item.id}`,
                    },
                  }}
                >
                  {orderStatus.map((status) => <MenuItem key={status.label} 
                  onClick={()=>handleUpdateOrderStatus(item.id,status.label)}>{status.label}</MenuItem>)}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
