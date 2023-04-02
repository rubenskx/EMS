import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  datasets: [
    {
      data: [],
      label: "Salary History",
      fill: false,
      backgroundColor: "#3a0ca3",
      borderColor: "#3a0ca3",
    },
  ],
};

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = (props) => {
  const sal = props.salaryDetails;
  console.log("Salary",sal);
  data.datasets[0].data = [];
  data.labels = sal
    .map((year) => {
      return parseInt(year.wef_date.substring(0, 10));
    })
    .sort();
    console.log(data.labels);
  for (let i = 0; i < data.labels.length; i += 1) {
    for (let j = 0; j < sal.length; j += 1) {
      if (data.labels[i] === parseInt(sal[j].wef_date.substring(0, 4))) {
        data.datasets[0].data.push(sal[j].salary);
        break;
      }
    }
  }
  console.log("Final data",data);
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
