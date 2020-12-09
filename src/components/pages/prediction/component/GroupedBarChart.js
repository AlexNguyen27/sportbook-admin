import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const GroupedBarChart = ({ labels, dataSource }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Prediction data",
        data: dataSource.prediction_data,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Real data",
        data: dataSource.real_data,
        backgroundColor: "rgb(54, 162, 235)",
      },
      // {
      //   label: '# of Green Votes',
      //   data: [3, 10, 13, 15, 22, 30],
      //   backgroundColor: 'rgb(75, 192, 192)',
      // },
    ],
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default GroupedBarChart;
