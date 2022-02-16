import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { checkout, getCartPopulated, getProfile, updateCart } from "../api/user";
import NavBar from "../components/NavBar";
import { Input } from 'antd';
import { getItemPrice } from "../components/AdminPanel/helpers";
const { TextArea} = Input;
const Checkout = () => {
  const [cartData, setCartData] = React.useState({ items: [], loading: false });
  const [totalAmount, setTotalAmount] = React.useState(0);
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [address, setAddress] = React.useState('');
  const classes = useStyles();
  
  React.useEffect(() => {
    //setting loading to true
    setCartData({ ...cartData, loading: true });
    getCartPopulated().then((res) =>
      setCartData({ ...cartData, items: res.data })
    );
    getProfile().then((res) => setUser(res.data));
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
      (acc, item) =>
        acc + getItemPrice(item),
      0
    );
  };

  const emptyCart = async () => {
    await updateCart([]);
  };

  return (
    <div>
      <NavBar />
      <div className="container d-flex">
        <div className="col-sm-6 text-center mx-auto p-3">
          <Paper className="p-3">
            <Typography variant="h4" gutterBottom>
              Checkout
            </Typography>
            <List disablePadding>
              {cartData.items?.map((item) => (
                <ListItem className={classes.listItem} key={item._id}>
                  <ListItemText
                    primary={item.item.name}
                    secondary={item.purchaseType}
                  />
                  {/* <Typography variant="body2" className="mr-2">
                    {item.purchaseType}
                  </Typography> */}
                  <Typography variant="body2">
                    ${" "}
                    {getItemPrice(item)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Tax 8.875%" />
                <Typography
                  variant="subtitle1"
                  component={"h4"}
                  className={classes.total}
                >
                  $ {(totalAmount * 0.088).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography
                  variant="subtitle1"
                  component={"h3"}
                  className={classes.total}
                >
                  $ {(totalAmount * 1.088).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <h3 className="my-4">Shipping Info:</h3>
            <Typography className="text-left">
              Name: {user.firstName} {user.surname}
            </Typography>
            <TextArea placeholder='Please enter your shipping address' value={address} onChange={e => setAddress(e.target.value)} autoSize minLength={10} required/>
            <Typography className="text-left">
                Please enter your shipping address(10 characers min.) to start the checkout process
              </Typography>
             {/* <h3 className="my-4">Choose payment method:</h3> */}
            <Grid item container direction="column" xs={12} className='mt-2'>
              {address.length > 10 && <PayPalButton
                options={{
                  clientId:
                    "AVIUOnkpCJfd2VaqHs6lcr0UohLXv9qMdQNTyzA3Wkl8-sHROqARqvaWlI8ctVdUjXIOEum1q6tvAE6e",
                }}
                shippingPreference={address}
                onError={e => console.log}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: (totalAmount * 1.088).toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "USD",
                              value: totalAmount,
                            },
                            tax_total: {
                              currency_code: "USD",
                              value: (totalAmount * 0.088).toFixed(2),
                            },
                          },
                        },
                        items: cartData.items?.map((item) => {
                          return {
                            name: item.item.name,
                            unit_amount: {
                              currency_code: "USD",
                              value:
                                getItemPrice(item),
                            },
                            quantity: 1,
                            description: item.item.description,
                            tax: {
                              currency_code: "USD",
                              value: (
                                getItemPrice(item) * 0.088
                              ).toFixed(2),
                            },
                          };
                        }),
                        shipping: {
                          name: {
                            full_name: user.firstName + " " + user.lastName,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(async (details) => {
                    alert(
                      "Order was submitted successfully and will deliver it ASAP!"
                    );

                    return checkout({
                        date: Date.now(),
                        customer: user._id,
                        items: cartData.items.map((item) => {
                          return {
                            item: item.item._id,
                            price: getItemPrice(item),
                            purchaseType: item.purchaseType,
                            artOwner: item.item.owner,
                          };
                        }),
                        totalAmount,
                        address,
                      })
                      .then(() => emptyCart())
                      .then(() => {
                        setCartData({ ...cartData, items: [] });
                        history.push("/xeries/gallery");
                      });
                  });
                }}
              />}
              <p style={{color:'red'}} className='mt-3'>* Please note that there are shipping costs that will be paid upon delivery</p>
            </Grid>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

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
