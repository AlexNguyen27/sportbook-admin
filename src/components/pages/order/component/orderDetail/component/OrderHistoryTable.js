import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Alert } from "reactstrap";
import { ORDER_STATUS, COLOR_ORDER_STATUS } from "../../../../../../utils/common";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});
export default function OrderHistoryTable({ orderDetail }) {
  const classes = useStyles();

  const { histories = [] } = orderDetail;
  const ORDER_CONTAINT = {
    ...ORDER_STATUS,
    finished: "Finished",
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-weight-bold">Updated At</TableCell>
            <TableCell align="center" className="font-weight-bold">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories.map((item) => (
            <TableRow key={item.createdAt}>
              <TableCell component="th" scope="row">
                {moment(item.createdAt).format("DD/MM/YYYY HH:mm A")}
              </TableCell>
              <TableCell align="right">
                <div>
                  <Alert
                    
                    className="m-0 text-center"
                    color={COLOR_ORDER_STATUS[item.orderStatus]}
                  >
                    {ORDER_CONTAINT[item.orderStatus]}
                  </Alert>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
