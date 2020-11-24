import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Material UI style
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgba(255,99,132,0.2)",
//       borderColor: "rgba(255,99,132,1)",
//       borderWidth: 1,
//       hoverBackgroundColor: "rgba(255,99,132,0.4)",
//       hoverBorderColor: "rgba(255,99,132,1)",
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

const MultipleSummary = ({ name, dataSource, view }) => {
  const classes = useStyles();
  const options = name;
  const lineName = "Price(VND)";

  // PIE CHART
  const dataPie = {
    labels: options,
    datasets: [
      {
        data: dataSource,
        label: "Pie chart",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // LINE CHART
  const dataLine = {
    labels: options,
    datasets: [
      {
        label: lineName,
        data: dataSource,
        // lineTension: 0.1,
        // backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "rgba(75,192,192,1)",
        // pointBackgroundColor: "#fff",
        // pointBorderWidth: 1,
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "rgba(75,192,192,1)",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        // spanGaps: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // BAR CHART
  const dataBar = {
    labels: options,
    datasets: [
      {
        data: dataSource,
        label: lineName,
        // backgroundColor: "rgba(255,99,132,0.2)",
        // borderColor: "rgba(255,99,132,1)",
        // borderWidth: 1,
        // hoverBackgroundColor: "rgba(255,99,132,0.4)",
        // hoverBorderColor: "rgba(255,99,132,1)",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // AXES BAR CHART
  // const Axes = [
  //   {
  //     min: 0,
  //     ticks: {
  //       beginAtZero: true,
  //       stepSize: 1,
  //     },
  //   },
  // ];
  const Axes = [
    {
      ticks: {
        beginAtZero: true,
      },
    },
  ];

  // CHART ID STATE
  const [chartId, setChartId] = React.useState("1");
  // HANDLE ON CLICK A CHART
  const handleChange = (event) => {
    setChartId(event.target.value);
  };

  return (
    <Fragment>
      <Row>
        <Col md={3}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Pick a chart</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className={classes.group}
              value={chartId}
              onChange={handleChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Pie Chart"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Line Chart"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Bar Chart"
              />
            </RadioGroup>
          </FormControl>
        </Col>
        <Col md={9}>
          {
            {
              1: (
                <div>
                  <Pie data={dataPie} />
                </div>
              ),
              2: (
                <div>
                  <Line
                    data={dataLine}
                    options={{
                      scales: {
                        yAxes: Axes
                      },
                    }}
                  />
                </div>
              ),
              3: (
                <div>
                  <Bar
                    data={dataBar}
                    options={{
                      scales: {
                        yAxes: Axes
                      },
                    }}
                  />
                </div>
              ),
            }[chartId]
          }
        </Col>
      </Row>
    </Fragment>
  );
};

export default MultipleSummary;
