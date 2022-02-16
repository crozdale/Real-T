import React from "react";
import Dashboard from "../components/AdminPanel/Dashboard";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { checkAuth } from "../api/user";
import Login from "../components/AdminPanel/Login";

export const DataContext = React.createContext(null);

const Admin = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [data, setData] = React.useState({
    currentPage: "statistics",
    loading: false,
    toggleUpdate: false,
    setLoggedIn
  });
  React.useEffect(() => {
    checkAuth().then(()=> setLoggedIn(true)).catch(e => console.log(e));
  },[])
  const providerValue = { data, setData };

  if (loggedIn)
    return (
      <DataContext.Provider value={providerValue}>
        <ThemeProvider theme={lightTheme}>
          <Dashboard></Dashboard>
        </ThemeProvider>
      </DataContext.Provider>
    );
  else return <Login setLoggedIn={setLoggedIn} />;
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

export default Admin;
