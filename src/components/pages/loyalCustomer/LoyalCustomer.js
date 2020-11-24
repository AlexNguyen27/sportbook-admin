import React, { useState, useEffect } from "react";
import TableUser from "./component/TableUser";
import DropdownV2 from "../../custom/DropdownV2";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PageLoader from "../../custom/PageLoader";
import { getLoyalCustomers } from "../../../store/actions/loyalCustomer";
import { getDateTime } from "../../../utils/commonFunction";

function LoyalCustomer({ getLoyalCustomers, loyalCustomers }) {
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    weekday: "monday",
  });
  const onSelectCategory = (weekday) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      weekday,
    });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLoyalCustomers({ weekday }, setLoading);
  }, [setSelectedDropdownData, selectedDropdownData]);

  const { weekday } = selectedDropdownData;
  const categoryArr = [
    {
      name: "Monday",
      id: "monday",
    },
    {
      name: "Tuesday",
      id: "tuesday",
    },
    {
      id: "wednesday",
      name: "Webnesday",
    },
    {
      id: "thursday",
      name: "Thursday",
    },
    {
      id: "friday",
      name: "Friday",
    },
    {
      id: "saturday",
      name: "Saturday",
    },
    {
      id: "sunday",
      name: "Sunday",
    },
  ];

  const userArr = Object.keys(loyalCustomers).map((userId) => ({
    ...loyalCustomers[userId],
    createdAt: getDateTime(loyalCustomers[userId].createdAt)
  }));

  return (
    <div>
      <Row className="p-4">
        <h5 className="mt-auto">Customer usually play on: </h5>
        <Col xs={2}>
          <DropdownV2
            fullWidth
            label="Select Day"
            value={weekday.toString()}
            options={categoryArr || []}
            valueBasedOnProperty="id"
            displayProperty="name"
            onChange={(index) => onSelectCategory(index)}
          />
        </Col>
      </Row>
      <PageLoader loading={loading}>
        <TableUser dataSource={userArr}/>
      </PageLoader>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loyalCustomers: state.loyalCustomer.loyalCustomers,
});
export default connect(mapStateToProps, { getLoyalCustomers })(LoyalCustomer);
