import React from 'react';
import MaterialTable from "material-table";
import { DataContext } from "../../containers/Admin";
import { updateRow, deleteRow, getSubscribers } from "../../api/admin";
import { Icons } from './helpers';
import { subscribe } from '../../api/subscribe';

const Subscribers = () => {
  //subscribers array
  const [subscribers, setSubscribers] = React.useState([]);
  // subscribers, loading data
  const { data, setData } = React.useContext(DataContext);

  React.useEffect(() => {
    //setting loading to true
    setData({ ...data, loading: true })
    // fetching subscribers
    getSubscribers().then(res => setSubscribers(res.data));
    //setting loading to false
    setData({ ...data, loading: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading, data.toggleUpdate]);

  const validationMessage = `Validation error 
        Please check the following: 
        Email must be in a valid format`;

  return (
    <MaterialTable
      icons={Icons}
      title="Subscribers"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        { title: "Email", field: "email" },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              subscribe(newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateRow('subscribe', newData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => {reject(); alert(validationMessage)})
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteRow('subscribe', oldData).then(res => {
                setData({ ...data, toggleUpdate: !data.toggleUpdate }); 
                resolve();
              })
              .catch(() => reject())
            }, 100);
          }),
      }}
      data={subscribers}
      options={{
        paging: false
      }}
    />
  );
}
 
export default Subscribers;
