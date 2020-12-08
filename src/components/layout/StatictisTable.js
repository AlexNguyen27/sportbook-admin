import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { connect } from "react-redux";
import { formatThousandVND } from "../../utils/commonFunction";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const StatictisTable = ({ reports, dataSource }) => {
  const classes = useStyles();

  const totalOrders = dataSource
    .map(({ orderCount }) => orderCount)
    .reduce((sum, i) => sum + i, 0);
  const totalAmounts = dataSource
    .map(({ totalAmount }) => totalAmount)
    .reduce((sum, i) => sum + i, 0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataSource.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
          {(rowsPerPage > 0
            ? dataSource.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : dataSource
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="center">{row.orderCount}</TableCell>
              <TableCell align="right" colSpan={2}>
                {formatThousandVND(row.totalAmount || 0, " VND")}
              </TableCell>
            </TableRow>
          ))}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}

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
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={dataSource.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  reports: state.statistic.reports,
});
export default connect(mapStateToProps, null)(StatictisTable);
