import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Paper, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { getCartPopulated, updateCart } from "../api/user";
import Navbar from "../components/NavBar";
import { getItemPrice } from "../components/AdminPanel/helpers";

const Cart = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);

  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setCartData({ ...cartData, loading: true });
    getCartPopulated().then((res) =>
      setCartData({ ...cartData, items: res.data })
    );
    //setting loading to false
    setCartData({ ...cartData, loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.loading]);

  React.useEffect(() => {
    setTotalAmount(calcTotalAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.items]);

  const calcTotalAmount = () => {
    return cartData.items?.reduce(
      (acc, item) => acc + getItemPrice(item),
      0
    );
  };

  const removeItem = async (itemToDelete) => {
    let newCart;
    newCart = cartData.items.filter((item) => {
      return item._id !== itemToDelete._id;
    });
    updateCart(newCart).then((res) => {
      res.status === 200
        ? setCartData({ ...cartData, items: res.data })
        : alert("Couldn't remove product from cart");
    }).catch(e => alert("Couldn't remove product from cart"))
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Cart
            </Typography>
            <List disablePadding>
              {cartData.items.length === 0 ? <h5>Cart is empty</h5> : (<>
              {cartData.items?.map((item) => (
                <ListItem className={classes.listItem} key={item?._id}>
                  <Button
                    className="btn btn-danger mr-3"
                    size="small"
                    style={{ backgroundColor: "gray" }}
                    onClick={() => removeItem(item)}
                  >
                    x
                  </Button>
                  <ListItemText
                    primary={item?.name}
                    secondary={item?.description}
                  />
                  <Typography variant="body2">$ {getItemPrice(item)}</Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {(totalAmount).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="PayPal price" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {(totalAmount * 1.088).toFixed(2)}
                </Typography>
              </ListItem>
              </>)}
            </List>
            {cartData.items.length !== 0 && <NavLink to="/real-t/checkout">Proceed to checkout</NavLink>}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Cart;

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
