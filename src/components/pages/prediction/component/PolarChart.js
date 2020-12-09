import React from "react";
import { Polar } from "react-chartjs-2";

const PolarChart = ({ labels, dataSource }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: dataSource.slice(0, labels.length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(150, 242, 242, 0.5)",
          "rgba(150, 242, 150, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Polar data={data} width={230} height={190} />
    </>
  );
};

export default PolarChart;
