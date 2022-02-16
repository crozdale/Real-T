import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Hidden,
  Divider,
} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../api/user";

const Navbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#303030" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Real-T
        </Typography>
            <Typography className={classes.link}>
              <NavLink to="/real-t/profile" className="btn text-light">
                Profile
              </NavLink>
            </Typography>
            <div>
              <Typography
                color="inherit"
                component={Button}
                onClick={(e) => logoutUser().then(() => props.history.push('/real-t/'))}
                style={{ textTransform: "none" }}
                className={classes.link}
              >
                <InputIcon className="mr-2 mb-1" />
                Log out
              </Typography>
            </div>
            <Hidden smUp>
              <div>
                <Button
                  aria-controls="nav-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.title}
                >
                <MenuIcon fontSize="large" style={{ color: "white" }} />
                </Button>
                <Menu
                  id="nav-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <NavLink to="/profile" className={classes.dropMenuItem}>
                      Profile
                    </NavLink>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Typography
                      color="inherit"
                      style={{ textTransform: "none" }}
                      onClick={(e) => logoutUser().then(() => props.history.push('/'))}
                    >
                      Log out
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            </Hidden>
      </Toolbar>
    </AppBar>
  );
};

// style settings
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: { display: "none" },
    color: 'white'
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  menuIcon: {
    marginRight: theme.spacing(2),
    display: "inline-block",
    marginBottom: "10px",
  },
  dropMenuItem: {
    textDecoration: "none",
    color: "unset",
  },
}));
export default Navbar;
