import {
  AppBar,
  Avatar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Header = () => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <Typography type="h5">Coin exchange</Typography>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
