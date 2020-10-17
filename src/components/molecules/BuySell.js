import { Button, Grid, makeStyles, Modal, Paper } from "@material-ui/core";
import React, { useState } from "react";
import OrderBook from "../organisms/OrderBook";

const useStyle = makeStyles(() => ({
  buttonContainer: {
    textAlign: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "grey",
    border: "2px solid #000",
    margin: "auto",
  },
}));
const BuySell = ({ handlePurchase }) => {
  const classes = useStyle();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.buttonContainer}>
          <Button
            variant="contained"
            fullWidth={true}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              handlePurchase();
            }}
          >
            Buy
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.buttonContainer}>
          <Button
            variant="contained"
            fullWidth={true}
            color="secondary"
            onClick={(e) => {
              handleModalOpen(e);
            }}
          >
            Sell
          </Button>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={handleClose}>
        <Paper className={classes.paper}>
          {/* selection of object to sell come here */}
        </Paper>
      </Modal>
    </div>
  );
};

export default BuySell;
