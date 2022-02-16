import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import { DataContext } from "../../containers/Admin";
import Topbar from "../Layout/Topbar";
import Sidebar from "../Layout/Sidebar";
import Footer from "../Layout/Footer";
import Users from "./Users";
import Statistics from "./Statistics";
import AdminUsers from "./AdminUsers";
import HomePageTexts from "./HomePageTexts";
import Subscribers from "./Subscribers";

const Dashboard = (props) => {
    const { data } = React.useContext(DataContext);

  const renderCurrentPage = () => {
      switch (data.currentPage) {
          case 'statistics':
              return <Statistics />
            case 'users':
                return <Users />
            case 'admins':
                return <AdminUsers />
            case 'homePageTexts':
                return <HomePageTexts />
            case 'subscribers':
                return <Subscribers />
          default:
              break;
      }
  }

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (

    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>
        { renderCurrentPage() }
        <Footer />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column" 
  },
}));

export default Dashboard;
