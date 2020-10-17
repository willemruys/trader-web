import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

const AlertComponent = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(false);

    // we need to reset the component so it can be re-opened
    setOpen(undefined);
  };
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        onClose={() => {
          handleOpen();
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertComponent;
