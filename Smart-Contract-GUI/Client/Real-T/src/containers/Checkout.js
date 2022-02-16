import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Divider, Paper } from "@material-ui/core";
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
                    primary={item.name}
                  />
                  <Typography variant="body2">
                    ${" "}
                    {getItemPrice(item)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Tax 8.8%" />
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
            <Divider />
            <Grid item container direction="column" xs={12} className='mt-2'>
              <PayPalButton
                options={{
                  clientId:
                    "AVIUOnkpCJfd2VaqHs6lcr0UohLXv9qMdQNTyzA3Wkl8-sHROqARqvaWlI8ctVdUjXIOEum1q6tvAE6e",
                }}
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
                            name: item.name,
                            unit_amount: {
                              currency_code: "USD",
                              value:
                                getItemPrice(item),
                            },
                            quantity: 1,
                            description: item.description,
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
                      "Order was submitted successfully"
                    );

                    return checkout({
                        date: Date.now(),
                        customer: user._id,
                        items: cartData.items.map((item) => {
                          return {
                            item: item._id,
                            price: getItemPrice(item),
                            owner: item.owner,
                          };
                        }),
                        totalAmount: (totalAmount  * 1.088).toFixed(2),
                      })
                      .then(() => emptyCart())
                      .then(() => {
                        setCartData({ ...cartData, items: [] });
                        history.push("/real-t/properties");
                      });
                  });
                }}
              />
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
