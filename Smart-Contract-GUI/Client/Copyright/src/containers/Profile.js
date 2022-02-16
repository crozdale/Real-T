import React from "react";
import "antd/dist/antd.css";
import WithNavBar from "./WithNavBar";
import { Paper, ListItem, Typography, List } from "@material-ui/core";
import { getProfile } from "../api/user";

function Profile(props) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProfile().then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [loading]);
  return (
    <div className="container flex m-0 col-12 p-0">
      <div className="main justify-content-center">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <List disablePadding>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  First Name: {data?.firstName}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Surname: {data?.surname}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Username: {data?.username}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ overflow: "hidden" }}
                >
                  Ethereum Address: {data?.address}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Email: {data?.email}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Role: {data?.role}
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default WithNavBar(Profile);
