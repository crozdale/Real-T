import React from "react";
import MaterialTable from "material-table";
import { Icons } from "./AdminPanel/helpers";
import { Button, FormControl, MenuItem, Paper, Select, Switch } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  addListing,
  deleteListing,
  getMyListings,
  updateListing,
} from "../api/listings";

const Listings = () => {
  //listings array
  const [listings, setListings] = React.useState([]);
  const [update, toggleUpdate] = React.useState(false);
  // listing image ref
  const image = React.useRef("");

  let category;

  React.useEffect(() => {
    // fetching listings
    getMyListings().then((res) => setListings(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings.length, update]);

  return (
    <Paper style={{ padding: "30px" }}>
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
            title: "Image",
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
          { title: "Name", field: "name" },
          {
            title: "Category",
            field: "category",
            editComponent: (tableData) => (
              <FormControl required>
                <Select
                  autoWidth
                  displayEmpty
                  name="category"
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => (category = e.target.value)}
                  defaultValue={category || tableData?.rowData?.category || ""}
                >
                  <MenuItem value="" disabled>
                    <em>Choose category</em>
                  </MenuItem>
                  <MenuItem value={"Fascination"}>Fascination</MenuItem>
                  <MenuItem value={"iProprietor"}>iProprietor</MenuItem>
                </Select>
              </FormControl>
            ),
          },
          { title: "Description", field: "description" },
          { title: "Price", field: "price" },
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
            render: (rowData) => (rowData.available ? "✅" : "❌"),
            editable: "onUpdate",
          },
          {
            title: "Sold",
            field: "sold",
            render: (rowData) => (rowData.sold ? "✅" : "❌"),
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
                form_data.append("category", category);
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
                form_data.append("category", category);
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
                deleteListing(oldData._id)
                  .then(() => {
                    resolve();
                    toggleUpdate(!update);
                  })
                  .catch((e) => reject());
              }, 100);
            }),
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
