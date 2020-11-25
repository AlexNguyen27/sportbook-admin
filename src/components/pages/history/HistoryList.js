import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageLoader from "../../custom/PageLoader";
import { getDateTime } from "../../../utils/commonFunction";
import TableHistory from "./component/TableHistory";
import { getHistories } from "../../../store/actions/history";
import { Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
function HistoryList({ histories, orderId, getHistories }) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHistories(setLoading, orderId);
  }, []);

  const historyArr = Object.keys(histories).map((id) => ({
    ...histories[id],
    createdAt: getDateTime(histories[id].createdAt),
  }));

  return (
    <>
      <Button
        className="mb-4"
        onClick={() => history.push(`/${window?.location?.pathname.split('/')[1]}`)}
        variant="contained"
      >
        <ArrowBackIcon className="mr-2" /> Go Back
      </Button>
      <PageLoader loading={loading}>
        <TableHistory dataSource={historyArr} />
      </PageLoader>
    </>
  );
}

const mapStateToProps = (state) => ({
  histories: state.history.histories,
});
export default connect(mapStateToProps, { getHistories })(HistoryList);
