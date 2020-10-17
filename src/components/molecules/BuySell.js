import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles(() => ({
  buttonContainer: {
    textAlign: "center",
  },
}));
const BuySell = ({ handlePurchase }) => {
  const classes = useStyle();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.buttonContainer}>
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
      </Grid>
    </div>
  );
};

export default BuySell;
