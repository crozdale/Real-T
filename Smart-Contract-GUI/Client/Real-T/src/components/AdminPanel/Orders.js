import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import NavBar from "../NavBar";
import { getOrders } from "../../api/user";
import { Redirect } from "react-router-dom";
import { getItemPrice } from "./helpers";


export default function Orders({ isAdmin = true }) {
  //orders array
  const [orders, setOrders] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    // fetching orders
    getOrders().then((res) => setOrders(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders.length, update]);

  return role === 'tenant' ? (
    <>
      {!isAdmin && <NavBar />}
      <div className={!isAdmin && "main"}>
        <div className={!isAdmin &&"col-xs-6 col-sm-10 mx-auto pt-3 mt-5"}>
          <Paper>
            <h4 style={{ padding: 20 }}>Orders</h4>
            {orders.length === 0 ? <h5 className='p-5'>No orders to display</h5> : (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    {isAdmin && (
                      <TableCell align="left">
                        <strong>Tenant</strong>
                      </TableCell>
                    )}
                    <TableCell align="left">
                      <strong>Total Amount</strong>
                    </TableCell>
                    {/* {isAdmin && (
                      <TableCell align="left">
                        <strong>Actions</strong>
                      </TableCell>
                    )} */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => <Row key={row._id} row={row} isAdmin={isAdmin} /> )}
                </TableBody>
              </Table>
            </TableContainer>)}
          </Paper>
        </div>
      </div>
      </>
  ) : <Redirect to={'/real-t/properties'}/>;
}

function Row(props) {
  const { row, isAdmin } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const invoiceSubtotal = Math.ceil(row.totalAmount * 0.919);
  const invoiceTaxes = 0.088 * invoiceSubtotal;
  const invoiceTotal = row.totalAmount;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date.substring(0, 10)}
        </TableCell>
        {isAdmin && <TableCell align="left">{row.customer?.username}</TableCell>}
        <TableCell component="th" scope="row">
          {row.totalAmount}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Property</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Landlord</strong>
                    </TableCell>
                    <TableCell align="left">
                      <strong>Price ($)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item.item._id}>
                      <TableCell component="th" scope="row">
                        {item.item?.name}
                      </TableCell>
                      <TableCell>{item.owner?.firstName} {item.owner?.surname}</TableCell>
                      <TableCell align="left">{getItemPrice(item.item)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>
                      <strong>Subtotal</strong>
                    </TableCell>
                    <TableCell align="right">
                      {invoiceSubtotal?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Tax</strong>
                    </TableCell>
                    <TableCell align="right">{`8.8 %`}</TableCell>
                    <TableCell align="right">
                      {invoiceTaxes?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="right">
                      {invoiceTotal?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            {isAdmin && (
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Customer Details
                </Typography>
                <Table size="small" aria-label="customer">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>Full Name:</strong>
                      </TableCell>
                      <TableCell>
                        {row.customer?.firstName} {row.customer?.surname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <strong>Email:</strong>
                      </TableCell>
                      <TableCell>{row.customer?.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
