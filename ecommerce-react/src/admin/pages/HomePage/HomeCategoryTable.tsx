import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/HomeCategoryTypes';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface HomeCategoryTableProps {
  data: HomeCategory[]; // Explicitly define the type for data
  onEdit: (category: HomeCategory) => void; // Callback function for edit button
}

const HomeCategoryTable: React.FC<HomeCategoryTableProps> = ({ data, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Product Title</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {data.map((item,index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
              {index+1}
              </StyledTableCell>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell>
                <img src={item.product.images[0]} className='w-20 rounded-md ' alt=''/>
              </StyledTableCell>
              <StyledTableCell align="right">{item.product.title}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => onEdit(item)}>
                    <Edit/>
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default HomeCategoryTable;
