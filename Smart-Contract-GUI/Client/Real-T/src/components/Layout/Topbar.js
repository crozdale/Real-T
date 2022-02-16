import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ApartmentIcon from '@material-ui/icons/Apartment';
const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
      <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <ApartmentIcon fontSize="large" className={classes.menuIcon} />
        <Typography variant="h6" className={classes.title}>
          Real-T
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: '#424242'
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    marginRight: theme.spacing(2),
    display: "inline-block",
    marginBottom: "10px",
  },
}));

export default Topbar;
