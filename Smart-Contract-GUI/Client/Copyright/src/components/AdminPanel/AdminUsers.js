import React from "react";
import MaterialTable from "material-table";
import { DataContext } from "../../containers/Admin";
import { updateRow, deleteRow, getAdmins, registerAdmin } from "../../api/admin";
import { Icons } from './helpers';

const AdminUsers = () => {
  //admins array
  const [admins, setAdmins] = React.useState([]);
  // admin, loading data
  const { data, setData } = React.useContext(DataContext);

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching admins
    getAdmins().then(res => setAdmins(res.data));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  const validationMessage = `Validation error 
        Please check the following: 
        Username must be (min: 4 - max: 30) characters 
        Email must be in a valid format 
        Phone must be a number 
        Password must be (min: 8 - max: 30) characters`;

  return (
    <MaterialTable
      icons={Icons}
      title="Admins"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "address" },
        { title: "Password", field: "password", editable:"onAdd", cellStyle:{maxWidth: '20px', wordBreak: 'break-all'} },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              registerAdmin(newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateRow('admins', newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteRow('admins', oldData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => reject())
            }, 100);
          }),
      }}
      data={admins}
      options={{
        paging: false
      }}
    />
  );
};

export default AdminUsers;