import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { getFullname } from "../../../../utils/commonFunction";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Colors from "../../../../constants/Colors";
import { useHistory } from "react-router-dom";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
export default function TableUser({ dataSource }) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      {
        title: "Phone",
        field: "phone",
        render: ({ phone }) => (
          <a href={`tel:${phone}`} alt="">
            {phone || "No phone"}
          </a>
        ),
      },
      // { title: "Play times", field: "playTimes", type: "numeric" },
      { title: "Email", field: "email" },
      // {
      //   cellStyle: {
      //     width: 20,
      //     maxWidth: 20,
      //   },
      //   headerStyle: {
      //     width: 20,
      //     maxWidth: 20,
      //   },
      //   title: "Order times",
      //   field: "orderCount",
      // },
      // {
      //   title: "Usually play at",
      //   field: "startDay",
      // },
    ],
    data: [
      {
        name: "Thanh nguyen",
        phone: "09123123123",
        playTimes: 12,
        email: "test@.gmail.com",
        createdAt: "12/12/2020",
      },
      {
        name: "Thanh nguyen",
        phone: "09123123123",
        email: "test@.gmail.com",
        playTimes: 12,
        createdAt: "12/12/2020",
      },
    ],
  });

  const formatData = dataSource.map((user) => ({
    ...user,
    name: getFullname(user.firstName, user.lastName),
  }));

  const history = useHistory();

  return (
    <MaterialTable
      icons={tableIcons}
      title="User information"
      columns={state.columns}
      data={formatData}
      options={{
        pageSize: 8,
        headerStyle: {
          fontWeight: "bold",
        },
        exportButton: true,
        actionsColumnIndex: -1,
      }}
      actions={[
        {
          icon: () => <VisibilityIcon style={{ color: Colors.view }} />,
          tooltip: "View all order of this user",
          onClick: (event, rowData) => {
            history.push(`/loyal-customer/${rowData.id}`);
          },
        },
      ]}
    />
  );
}
