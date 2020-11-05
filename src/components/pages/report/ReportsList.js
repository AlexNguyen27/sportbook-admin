import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATE_TIME, REPORT_STATUS_OBJECT } from "../../../utils/common";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Visibility from "@material-ui/icons/Visibility";

import PageLoader from "../../custom/PageLoader";
import Swal from "sweetalert2";
import { getReports, deleteReport } from "../../../store/actions/report";
import EditReportModal from "./component/EditReportModal";
import ViewReport from "./component/ViewReport";
import Colors from "../../../constants/Colors";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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

const ReportsList = ({ getReports, deleteReport, reports, users }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    columns: [
      { title: "Post", field: "title", editable: "never" },
      { title: "Author", field: "username", editable: "never" },
      { title: "Reason", field: "reason", editable: "never" },
      { title: "Status", field: "status", lookup: REPORT_STATUS_OBJECT },
      // { title: "Total Reporters", field: "totalReporters", editable: "never" },
      {
        title: "Created at",
        field: "createdAt",
        editable: "never",
      },
      {
        title: "Updated at",
        field: "updatedAt",
        editable: "never",
      },
    ],
    data: [
      {
        title: "Weather",
        username: "thanh",
        reason: "Violent",
        status: "waiting_for_approve",
        totalReporters: 10,
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
        updatedAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports(setLoading);
  }, [loading]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);

  const formatedData = (reports || []).map((report) => {
    const { title, userId, id: postId } = report.post || {};
    return {
      ...report,
      title,
      username: users[userId].username,
      totalReporters: reports.filter((report) => report.postId === postId)
        .length,
      createdAt: getDateTime(report.createdAt),
      updatedAt: getDateTime(report.updatedAt),
    };
  });

  const [modalEdit, setModalEdit] = useState(false);
  const [modalViewReport, setModalViewReport] = useState(false);
  const [reportData, setReportData] = useState();

  const onEditReport = (report) => {
    setModalEdit(true);
    setReportData(report);
  };

  const onViewReport = (report) => {
    setModalViewReport(true);
    setReportData(report);
  };

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Reports"
          columns={state.columns}
          data={formatedData || []}
          options={{
            pageSize: 8,
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              overflowX: "auto",
            },
          }}
          actions={[
            {
              icon: () => <Visibility style={{ color: Colors.view }}/>,
              tooltip: "View Report",
              onClick: (event, rowData) => {
                onViewReport(rowData);
              },
            },
            {
              icon: () => <Edit style={{ color: Colors.orange }}/>,
              tooltip: "Edit Reported Post",
              onClick: (event, rowData) => {
                onEditReport(rowData);
              },
            },
            {
              icon: () => <Delete style={{ color: Colors.red }}/>,
              tooltip: "Delete Report",
              onClick: (event, rowData) => {
                Swal.fire({
                  title: `Are you sure to delete ?`,
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.value) {
                    setLoading(true);
                    const { reportedBy, postId } = rowData;
                    deleteReport(setLoading, reportedBy, postId);
                  }
                });
              },
            },
            {
              icon: () => <ChromeReaderModeIcon style={{ color: Colors.comment }}/>,
              tooltip: "View reported post",
              onClick: (event, rowData) => {
                history.push(`view-post/${rowData.postId}`);
              },
            },
          ]}
        />
      </div>
      <EditReportModal
        setModal={setModalEdit}
        modal={modalEdit}
        reportData={reportData}
      />
      <ViewReport
        setModal={setModalViewReport}
        modal={modalViewReport}
        reportData={reportData}
      />
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  users: state.user.users,
  reports: state.report.reports,
});
export default connect(mapStateToProps, { getReports, deleteReport })(
  withRouter(ReportsList)
);
