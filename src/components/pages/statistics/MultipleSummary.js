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
    marginTop: "14px",
    marginBottom: "14px",
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const MultipleSummary = ({ name, dataSource, lineName, title }) => {
  const classes = useStyles();
  const options = name;
  // PIE CHART
  const dataPie = {
    labels: options,
    datasets: [
      {
        data: dataSource,
        label: "Pie chart",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
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
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
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
      <Row style={{ justifyContent: "center", marginTop: '30px' }}>
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
          <h5>{title}</h5>
          {!dataSource.length && (
            <div>
              <h5 className="text-center mt-4">NO ORDER DATA</h5>
            </div>
          )}
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
                        yAxes: Axes,
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
                        yAxes: Axes,
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
