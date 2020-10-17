import React from "react";
import Alert from "@material-ui/lab/Alert";

const AlertComponent = ({ message, severity }) => {
  return <Alert severity={severity}>{message}</Alert>;
};

export default AlertComponent;
