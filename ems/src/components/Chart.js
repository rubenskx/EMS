import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: [2018, 2019, 2020, 2021, 2022, 2023],
  datasets: [
    {
      label: "Salary History",
      data: [25000, 25780, 26800, 27080, 27500, 28000],
      fill: false,
      backgroundColor: "#3a0ca3",
      borderColor: "#3a0ca3",
    },
  ],
};

const options =  {
       scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    }

const LineChart = () => (
  <>
    <Line data={data} options={options} />
  </>
);

export default LineChart;
