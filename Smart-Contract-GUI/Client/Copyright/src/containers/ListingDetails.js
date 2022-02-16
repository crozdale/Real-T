import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { getListingDetails } from "../api/listings";
import { addItemToCart, getCart } from "../api/user";
import NavBar from "../components/NavBar";
import { Divider } from "antd";
const ListingDetails = ({
  match: {
    params: { id },
  },
}) => {
  const [listingData, setListingData] = React.useState({
    item: {},
    loading: false,
  });
  const [cartItems, setCartItems] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);

  const role = localStorage.getItem("role");

  const classes = useStyles();

  const addToCart = (_id) => {
    addItemToCart(_id)
      .then((res) => toggleUpdate(!update))
      .catch((e) => alert("Error while adding item to cart"));
  };
  React.useEffect(() => {
    setListingData({ ...listingData, loading: true });
    getListingDetails(id).then((res) => {
      setListingData({ ...listingData, item: res.data });
    });
    getCart().then((res) => setCartItems(res.data.map((i) => i.item)));
    setListingData({ ...listingData, loading: false });
  }, [listingData.loading, update]);

  return (
    <>
      <NavBar />
      <Paper className="mv-3 container">
        <div className="text-center mt-2">
          <Typography variant="h4" className="pt-2" gutterBottom>
            {listingData.item.name}
          </Typography>
        </div>
        {listingData.item.available && (
          <List disablePadding className="d-flex justify-content-center">
            <div className="mv-3 row justify-content-centerw-75">
              <div className="w-100 text-center m-3">
                <img
                  className="p-2"
                  src={listingData.item.image}
                  style={{ height: "!00%", width: "100%" }}
                  alt="Listing image"
                />
              </div>
              <div className="row w-100">
                <Divider />
                <Typography variant="h6" className="pt-3" gutterBottom>
                  About:
                </Typography>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Description:"
                    secondary={listingData.item.description}
                  />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Price:"
                    secondary={`$ ${listingData.item.price}`}
                  />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Category:"
                    secondary={listingData.item.category}
                  />
                </ListItem>
                <Divider />
                {listingData.item.owner && (
                  <>
                    <Typography variant="h6" className="pt-1" gutterBottom>
                      Writer's Info
                    </Typography>
                    <ListItem className={classes.listItem}>
                      <ListItemText
                        primary="Name:"
                        secondary={`${listingData.item.owner?.firstName}
                  ${listingData.item.owner?.surname}`}
                      />
                      <ListItemText
                        primary="Email:"
                        secondary={listingData.item.owner?.email}
                      />
                    </ListItem>
                <Divider />
                <div className="pb-3">
                  <p>
                    To see more writings from this writer{" "}
                    <NavLink to={`/copyright/${listingData.item.owner.username}`}>
                      click here
                    </NavLink>
                  </p>
                </div>
                </>
                )}
              </div>
            </div>
          </List>
        )}
      </Paper>
      {!listingData.item.available && (
        <h3 className="p-5 m-5">Item isn't available</h3>
      )}
    </>
  );
};

export default ListingDetails;

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
