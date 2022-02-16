import React from "react";
import MaterialTable from "material-table";
import { Icons } from "./AdminPanel/helpers";
import { Button, FormControl, Paper, Switch } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { addListing, deleteListing, getMyListings, updateListing } from "../api/listings";

const Listings = () => {
  //listings array
  const [listings, setListings] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  // listing image ref
  const image = React.useRef("");

  React.useEffect(() => {
    // fetching listings
    getMyListings().then((res) => setListings(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings.length, update]);

  return (
    <Paper style={{padding: '30px'}}>
    <MaterialTable
      icons={Icons}
      title="Listings"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
          title: "Listing Image",
          field: "image",
          editComponent: () => (
            <div value="photo">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                required
                ref={image}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
            </div>
          ),
          render: (rowData) => (
            <img
              style={{ height: 200, width: 150 }}
              src={rowData.image}
              alt="Brand Img"
            />
          ),
        },
        { title: "Listing Name", field: "name" },
        { title: "Description", field: "description" },
        { title: "Medium", field: "medium" },
        { title: "Size", field: "size" },
        { title: "Original Price", field: "priceOfOriginal" },
        { title: "Canvas Copy Price", field: "priceOfCanvas" },
        { title: "Paper Copy Price", field: "priceOfCopy" },
        {
          title: "Available",
          field: "available",
          editComponent: (tableData) => (
            <FormControl required>
              <Switch
                name="available"
                defaultChecked={tableData.rowData.available}
                onChange={() =>
                  (tableData.rowData.available = !tableData.rowData.available)
                }
                color="primary"
              />
            </FormControl>
          ),
          render: (rowData) => (
            rowData.available ? "✅" : "❌"
          ),
          editable: "onUpdate",
        },
        { title: "Sold", field: "sold",
          render: (rowData) => (
            rowData.sold ? "✅" : "❌"
          ),
          editable: "never",
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const form_data = new FormData();

              for (var key in newData) {
                form_data.append(key, newData[key]);
              }
              form_data.append("image", image.current?.files[0]);
              addListing(form_data)
                .then(() => {
                  resolve();
                  toggleUpdate(!update);
                })
                .catch((err) => {
                  reject(
                    alert(
                      "error: All fields are required and price must be a number"
                    )
                  );
                });
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const form_data = new FormData();

              for (var key in newData) {
                form_data.append(key, newData[key]);
              }
              image.current?.files[0] &&
                form_data.append("image", image.current?.files[0]);
              updateListing(newData._id, form_data)
                .then(() => {
                  resolve();
                  toggleUpdate(!update);
                })
                .catch((err) => {
                  reject(
                    alert(
                      "error: All fields are required and price must be a number"
                    )
                  );
                });
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteListing(oldData._id).then(() => {
                resolve();
                toggleUpdate(!update);
              }).catch(e => reject())
            }, 100);
          })
      }}
      data={listings}
      options={{
        paging: false,
      }}
    />
    </Paper>
  );
};

export default Listings;
