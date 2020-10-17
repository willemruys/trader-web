import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

const AlertComponent = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  const snooze = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };

  const handleClose = async () => {
    setOpen(false);
    // we need to somehow reset this modal so it can be opened multiple times
    // therefore we wait several seconds so the component above use can set the logic to open
    // this modal to false
    await snooze();
    setOpen(true);
  };
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        onClose={() => {
          handleClose();
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertComponent;
