import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
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
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchAllSellers,
  updateSellerStatus,
} from "../../../State/admin/AdminSellerSlice";

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is pending for verification",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "Account is permanently deactivated and removed from the system",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed and removed from the system",
  },
];

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  const dispatch = useAppDispatch();
  const { adminSeller } = useAppSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState<null | any>({});
  const open = Boolean(anchorEl);
  const handleClick = (event: any, sellerId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [sellerId]: event.currentTarget }));
  };
  const handleClose = (sellerId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [sellerId]: null }));
  };

  useEffect(() => {
    dispatch(fetchAllSellers("ACTIVE"));
  }, []);
  const handleChange = (event: any) => {
    setAccountStatus(event.target.value);
    dispatch(fetchAllSellers(event.target.value));
  };

  const handleUpdateSellerStatus = (sellerId: number, status: any) => {
    dispatch(updateSellerStatus({ sellerId, status })).then(() => {
      dispatch(fetchAllSellers(accountStatus));
    });
    handleClose(sellerId);
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountStatuses.map((item) => (
              <MenuItem value={item.status}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminSeller.sellers.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.sellerName}
                </StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.mobile}</StyledTableCell>
                <StyledTableCell align="right">{item.GSTIN}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.businessDetails.businessName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => handleClick(e, item.id ?? 0)}
                  >
                    status
                  </Button>
                  <Menu
                    id={`status-menu ${item.id}`}
                    anchorEl={anchorEl[item.id ?? 0]}
                    open={Boolean(anchorEl[item.id ?? 0])}
                    onClose={() => handleClose(item.id ?? 0)}
                    slotProps={{
                      list: {
                        "aria-labelledby": `status-menu ${item.id}`,
                      },
                    }}
                  >
                    {accountStatuses.map((status) => (
                      <MenuItem
                        key={status.status}
                        onClick={() =>
                          handleUpdateSellerStatus(item.id ?? 0, status.status)
                        }
                      >
                        {status.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SellersTable;
