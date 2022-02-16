import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaletteIcon from "@material-ui/icons/Palette";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getListings } from "../api/listings";
import { getCart, addItemToCart } from "../api/user";
import Navbar from "../components/NavBar";

const Gallery = () => {
  // listings array
  const [listingsData, setListingsData] = React.useState({
    items: [],
    loading: false,
  });
  //user state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPages] = React.useState(9);
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const [cartItems, setCartItems] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  const classes = useStyles();

  const role = localStorage.getItem("role");

  const addToCart = (_id) => {
    addItemToCart(_id)
      .then((res) => toggleUpdate(!update))
      .catch((e) => alert("Error while adding item to cart"));
  };
  React.useEffect(() => {
    //setting loading to true
    setListingsData({ ...listingsData, loading: true });
    getListings().then((res) =>
      setListingsData({ ...listingsData, items: res.data })
    );
    getCart().then((res) => setCartItems(res.data));

    //setting loading to false
    setListingsData({ ...listingsData, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingsData.loading, update]);

  const currentItems = listingsData.items.slice(
    indexOfFirstItems,
    indexOfLastItems
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container my-3 text-center">
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Real-T Properties
        </Typography>
      </div>
      <div className="row">
        <Grid container justify="center" spacing={2} style={{ padding: 30 }}>
          {currentItems.map((item, index) => (
            <Grid key={index} item lg={4} sm={6} xl={4} xs={12}>
              <Card
                className={classes.root}
                style={{ opacity: item.sold ? "0.8" : "1" }}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.name}
                  />
                  {item.sold && <div className={classes.sold}>SOLD!</div>}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    {item.owner && (
                      <>
                        {" "}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ margin: "5px" }}
                        >
                          <PaletteIcon
                            fontSize="small"
                            style={{
                              display: "inline-block",
                              marginBottom: "5px",
                              marginRight: "5px",
                            }}
                          />{" "}
                          <strong>Owner:</strong>{" "}
                          <NavLink to={`/real-t/${item.owner.username}`}>
                            {item.owner.firstName} {item.owner.surname}{" "}
                          </NavLink>
                        </Typography>
                      </>
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ margin: "5px" }}
                    >
                      <MonetizationOnIcon
                        fontSize="small"
                        style={{
                          display: "inline-block",
                          marginBottom: "5px",
                          marginRight: "5px",
                        }}
                      />{" "}
                      <strong>Price:</strong> {item.price}{" "}
                      USD
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {role && (
                  <CardActions>
                    <NavLink to={`/real-t/listing/${item._id}`}>
                      <Button
                        style={{ backgroundColor: "#303030", color: "white" }}
                      >
                        More Details
                      </Button>
                    </NavLink>
                    {role === "tenant" &&
                      !cartItems.includes(item._id) &&
                      !item.sold && (
                        <Button
                          onClick={() => addToCart(item._id)}
                          color="default"
                          style={{ backgroundColor: "" }}
                          className="bg-dark text-light btn btn-danger float-right mt-0"
                        >
                          <i className="fa fa-shopping-cart mr-2 pb-2"></i> Add
                          to Cart
                        </Button>
                      )}
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="container" style={{ marginTop: "-45px" }}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={listingsData.items.length}
          paginate={paginate}
          className="text-center"
        />
      </div>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 350,
    width: "100%",
  },
  sold: {
    top: "2em",
    left: "-4em",
    color: "#fff",
    display: "block",
    position: "absolute",
    textAlign: "center",
    textDecoration: "none",
    letterSpacing: ".06em",
    backgroundColor: "#A00",
    padding: "0.5em 5em 0.4em 5em",
    textShadow: "0 0 0.75em #444",
    boxShadow: "0 0 0.5em rgba(0,0,0,0.5)",
    font: "bold 16px/1.2em Arial, Sans-Serif",
    webkitTextShadow: "0 0 0.75em #444",
    webkitBoxShadow: "0 0 0.5em rgba(0,0,0,0.5)",
    webkitTransform: "rotate(-45deg) scale(0.75,1)",
    zIndex: "10",
    "&::before": {
      content: "",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      position: "absolute",
      margin: "-0.3em -5em",
      transform: "scale(0.7)",
      webkitTransform: "scale(0.7)",
      border: "2px rgba(255,255,255,0.7) dashed",
    },
  },
});

export default Gallery;
