import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyle = makeStyles(() => ({
  container: {
    paddingTop: 10,
  },
  gridContainer: {
    minHeight: 200,
  },
  graph: {
    height: "20rem",
  },
  itemContainer: {
    textAlign: "center",
  },
}));
const Exchange = ({ coinData }) => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Grid container className={classes.gridContainer} spacing={3}>
        {/* left */}
        <Grid item xs={12} sm={6}>
          <Paper className={classes.graph}></Paper>
        </Grid>
        {/* right */}
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>Currency</TableCell>
                <TableCell>Rate</TableCell>
              </TableHead>
              <TableBody>
                {coinData.map((row) => {
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Exchange;
