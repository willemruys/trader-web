import {
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import React from "react";

const dummyData = [
  {
    code: "GBP",
    symbol: "&pound;",
    rate: "8,792.3361",
    description: "British Pound Sterling",
    rate_float: 8792.3361,
  },
  {
    code: "EUR",
    symbol: "&euro;",
    rate: "9,692.9585",
    description: "Euro",
    rate_float: 9692.9585,
  },
  {
    code: "USD",
    symbol: "&#36;",
    rate: "11,355.2941",
    description: "United States Dollar",
    rate_float: 11355.2941,
  },
];

const TableComponent = ({ tableInput, type }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableCell>Description</TableCell>
          <TableCell>Rate</TableCell>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => {
            return (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell>{row.rate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
