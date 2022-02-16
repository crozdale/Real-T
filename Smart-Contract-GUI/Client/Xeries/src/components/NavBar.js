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
import { getCart, logoutUser } from "../api/user";
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const role = localStorage.getItem('role');
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  getCart().then(res => setCartItemsCount(res.data.length));
  return (
    <AppBar position="static" style={{ backgroundColor: "#303030" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
         Bitbrowze
        </Typography>
          {role && <ul className="nav justify-content-end align-items-center">
          <li className="nav-item p-2">
            <Typography className={classes.link}>
              <NavLink to="/xeries/gallery" className="text-light">
                Gallery
              </NavLink>
            </Typography>
            </li>
          <li className="nav-item p-2">
            <Typography className={classes.link}>
              <NavLink to="/xeries/profile" className="text-light">
                Profile
              </NavLink>
            </Typography>
            </li>
            {role === 'artOwner' && <li className="nav-item p-2">
            <Typography className={classes.link}>
              <NavLink to="/xeries/manage" className="text-light">
                Manage
              </NavLink>
            </Typography>
            </li>}
            {role === 'customer' && <><li className="nav-item">
                <h3 className={classes.link}>
                  <NavLink to="/xeries/cart" className="nav-link text-light text-truncate pt-0 mb-3">
                    <i className="fa fa-shopping-cart fa-sm mr-2"></i>
                    {cartItemsCount}
                  </NavLink>
                </h3>
              </li>
              <li className="nav-item">
              <Typography className={classes.link}>
              <NavLink to="/xeries/orders" className="text-light">
                Orders
              </NavLink>
            </Typography>
            </li> </>}
              <li>
            <div>
              <Typography
                color="inherit"
                component={Button}
                onClick={(e) => logoutUser().then(() => props.history.push('/xeries/home'))}
                style={{ textTransform: "none" }}
                className={classes.link}
              >
                <InputIcon className="mr-2 mb-1" />
                Log out
              </Typography>
            </div>
            </li>
            </ul>}
            {role && <Hidden lgUp>
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
                    <NavLink to="/xeries/gallery" className={classes.dropMenuItem}>
                      Gallery
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/xeries/profile" className={classes.dropMenuItem}>
                      Profile
                    </NavLink>
                  </MenuItem>
                  {role === 'artOwner' && <MenuItem>
                  <NavLink to="/xeries/manage" className={classes.dropMenuItem}>
                    Manage
                    </NavLink>
                  </MenuItem>}
                  {role === 'customer' && <><MenuItem>
                    <NavLink to="/xeries/cart" className={classes.dropMenuItem}>
                    Cart
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/xeries/orders" className={classes.dropMenuItem}>
                    Orders
                    </NavLink>
                  </MenuItem></>}
                  <Divider />
                  <MenuItem>
                    <Typography
                      color="inherit"
                      style={{ textTransform: "none" }}
                      onClick={(e) => logoutUser().then(() => {localStorage.clear(); props.history.push('/xeries/home')})}
                    >
                      Log out
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            </Hidden>}
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
    [theme.breakpoints.down("md")]: { display: "none" },
    color: 'white'
  },
  title: {
    flexGrow: 1,
    color: 'white',
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
  navBar: {
    marginLeft: "auto"
  }
}));
export default withRouter(Navbar);
