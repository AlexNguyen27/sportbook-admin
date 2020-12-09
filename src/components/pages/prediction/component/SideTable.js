import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
const cellHead = {
    prediction_data: 'Prediction data', 
    real_data: 'Real data',
    std_detail: 'Std detail'
}

const SideTable = ({ size = "", labels, dataSource }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        size={size}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {labels.map((item) => (
              <StyledTableCell align="right">
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(cellHead).map((key, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell component="th" scope="row">
                {cellHead[key]}
              </StyledTableCell>
              {dataSource[key].map((subItem) => (
                <StyledTableCell align="right">
                  {subItem}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, {})(SideTable);
