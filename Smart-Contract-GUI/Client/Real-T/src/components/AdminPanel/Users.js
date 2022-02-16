import React from "react";
import MaterialTable from "material-table";
import { DataContext } from "../../containers/Admin";
import { getUsers, updateRow, deleteRow } from "../../api/admin";
import { Icons } from './helpers';
import { registerUser } from "../../api/user";
import { FormControl, Select, MenuItem } from "@material-ui/core";
const Users = () => {
  //users array
  const [users, setUsers] = React.useState([]);
  // user, loading data
  const { data, setData } = React.useContext(DataContext);

  let role;

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching users
    getUsers().then(res => setUsers(res.data));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  const validationMessage = `Validation error 
        Please check the following: 
        First name must be (min: 2 - max: 30) characters 
        Surname must be (min: 2 - max: 30) characters 
        Username must be (min: 4 - max: 30) characters 
        Email must be in a valid format 
        Address must be a valid Ethereum address
        Password must be (min: 8 - max: 30) characters`;


  return (
    <MaterialTable
      icons={Icons}
      title="Users"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        { title: "First Name", field: "firstName" },
        { title: "Surname", field: "surname" },
        { title: "Username", field: "username" },
        { title: "Role", field: "role" , editComponent: (tableData) => (
          <FormControl required>
              <Select
                autoWidth
                displayEmpty
                name="role"
                inputProps={{ "aria-label": "Without label" }}
                onChange= {(e) => role = e.target.value}
                defaultValue={
                  role || tableData?.rowData?.role || ""
                }
              >
                <MenuItem value="" disabled>
                  <em>Choose role</em>
                </MenuItem>
                <MenuItem value={"landlord"}>Landlord</MenuItem>
                <MenuItem value={"tenant"}>Tenant</MenuItem>
                <MenuItem value={"arbitrator"}>Arbitrator</MenuItem>
                <MenuItem value={"promoter"}>Promoter</MenuItem>
              </Select>
            </FormControl>
        ) },
        { title: "Email", field: "email" },
        { title: "Address", field: "address", cellStyle:{maxWidth: '20px', wordBreak: 'break-all'} },
        { title: "Password", field: "password", editable:"onAdd", cellStyle:{maxWidth: '20px', wordBreak: 'break-all'} },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.role = role;
              registerUser(newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.role = role || oldData.role;
              updateRow('users', newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteRow('users', oldData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => reject())
            }, 100);
          }),
      }}
      data={users}
      options={{
        paging: false
      }}
    />
  );
};

export default Users;