import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { DataContext } from "../../containers/Admin";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  Button,
  colors,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import SubjectIcon from '@material-ui/icons/Subject';
import InputIcon from "@material-ui/icons/Input";
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { logoutUser } from "../../api/user";

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const { data, setData } = React.useContext(DataContext);

  const classes = useStyles();
  const navClases = navLinksStyles();
  // logout function
  const logout = () => {
    logoutUser().then( res => {
      data.setLoggedIn(false);
    })
   }
  const pages = [
    {
      title: "Dashboard",
      component: "statistics",
      icon: <DashboardIcon />,
    },
    {
      title: "Users",
      component: "users",
      icon: <PeopleIcon />,
    },
    {
      title: "Admins",
      component: "admins",
      icon: <VerifiedUserIcon />,
    },
    {
      title: "Subscribers",
      component: "subscribers",
      icon: <MailOutlineIcon />,
    },
    {
      title: "Homepage Texts",
      component: "homePageTexts",
      icon: <SubjectIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <div className="text-center">
        <AccountCircleTwoToneIcon style={{ width:'100px', height:'100px', display: "inline-block", marginBottom:"0px", marginRight:'5px'}}/>
          <h4>Admin Panel</h4>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.nav}>
          <List {...rest} className={clsx(navClases.root, className)}>
            {pages.map((page) => (
              <ListItem
                className={navClases.item}
                disableGutters
                key={page.title}
              >
                <Button
                  className={navClases.button}
                  onClick={() => {
                    setData({ ...data, currentPage: page.component });
                    onClose();
                  }}
                >
                  <div className={navClases.icon}>{page.icon}</div>
                  {page.title}
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
          <Button className={navClases.button} style={{color: colors.blueGrey[800]}} onClick={() => logout()}>
            <div className={navClases.icon}>
              <InputIcon />
            </div>{" "}
            Log out
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const navLinksStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

export default Sidebar;
