import { Delete } from "@mui/icons-material";
import {
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { store, useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  deleteCoupon,
  getAllCoupons,
} from "../../../State/admin/AdminCouponSlice";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Coupon = () => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate();

  const { adminCoupon } = useAppSelector((store) => store);

  const handleDeleteCoupon = (id: number) => {
    dispatch(deleteCoupon({ id, jwt: localStorage.getItem("jwt") ?? "" })).then(
      () => {
        dispatch(getAllCoupons({ jwt: localStorage.getItem("jwt") ?? "" }));
      }
    );
  };

  useEffect(() => {
    //get all coupons
    dispatch(getAllCoupons({ jwt: localStorage.getItem("jwt") ?? "" }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="outlined" onClick={()=>navigate("/admin/add-coupon")}>
          Add Coupon
        </Button>
      </div>
      <div className="mt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell align="right">
                  Minimum Order Value
                </StyledTableCell>
                <StyledTableCell align="right">Discount</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminCoupon.coupons.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.code}
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.validityStartDate.toString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.minimumOrderValue}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.discountPercentage}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.active ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => handleDeleteCoupon(item.id ?? 0)}>
                      <Delete color="error" />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Coupon;
