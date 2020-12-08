import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "reactstrap";

const defaultHeaders = [
  { label: "Ground name", key: "title" },
  { label: "Phone", key: "groundPhone" },
  { label: "Address", key: "address" },
  { label: "Benefit", key: "benefits" },
  { label: "Order times", key: "orderCount" },
  { label: "Amount", key: "totalAmount" },
  // { label: "Total Orders", key: "totalOrders" },
  // { label: "Total Amount", key: "totalAmount" },
];

// const headers3 = [
//   { label: "First Name", key: "firstname" },
//   { label: "Last Name", key: "lastname" },
//   { label: "Email", key: "email" },
// ];

// const data = [
//   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
// ];

// const data1 = [
//   { details: { firstName: "Ahmed", lastName: "Tomi" }, job: "manager" },
//   { details: { firstName: "John", lastName: "Jones" }, job: "developer" },
// ];
const ExportCSV = ({ dataSource, headers = defaultHeaders }) => {
  return (
    <CSVLink data={dataSource} headers={headers}>
      <Button variant="contained" size="small" color="primary">
        Download csv
      </Button>
    </CSVLink>
  );
};

export default ExportCSV;
