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
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles(() => ({
  container: {
    paddingTop: 20,
  },
}));

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
                <TableCell>Order date</TableCell>
                <TableCell>Price rate USD</TableCell>
                <TableCell>Price rate GBP</TableCell>
                <TableCell>Price rate EUR</TableCell>
                <TableCell>Action</TableCell>
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
