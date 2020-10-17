import {
  Grid,
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Button,
  withStyles,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles(() => ({
  container: {
    paddingTop: 20,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "grey",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const OrderBook = ({ orderData, handleSale }) => {
  const classes = useStyle();
  console.log(orderData);
  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableCell>Order date</StyledTableCell>
                <StyledTableCell>Price rate USD</StyledTableCell>
                <StyledTableCell>Price rate GBP</StyledTableCell>
                <StyledTableCell>Price rate EUR</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableHead>
              <TableBody>
                {orderData &&
                  orderData.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.orderDate}
                        </TableCell>
                        <TableCell>{row.priceRateUSD}</TableCell>
                        <TableCell>{row.priceRateGBP}</TableCell>
                        <TableCell>{row.priceRateEUR}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            fullWidth={true}
                            color="secondary"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSale(row.id);
                            }}
                          >
                            Sell
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderBook;
