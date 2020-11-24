import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const StatictisTable = ({ reports }) => {
  const classes = useStyles();

  const dataSource = Object.keys(reports).map((key) => ({
    ...reports[key],
  }));
  const totalOrders = dataSource
    .map(({ orderCount }) => orderCount)
    .reduce((sum, i) => sum + i, 0);
  const totalAmounts = dataSource
    .map(({ totalAmount }) => totalAmount)
    .reduce((sum, i) => sum + i, 0);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="font-weight-bold">
              Ground name
            </TableCell>
            <TableCell align="center" className="font-weight-bold">
              Order Times
            </TableCell>
            <TableCell align="right" className="font-weight-bold" colSpan={2}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="center">{row.orderCount}</TableCell>
              <TableCell align="right" colSpan={2}>
                {ccyFormat(row.totalAmount || 0)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell className="font-weight-bold" colSpan={2}>
              Total Orders
            </TableCell>
            <TableCell align="right">{totalOrders}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-weight-bold" colSpan={2}>
              Total Amount
            </TableCell>
            <TableCell align="right">{ccyFormat(totalAmounts)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  reports: state.statistic.reports,
});
export default connect(mapStateToProps, null)(StatictisTable);
