import React from "react";
import { Line } from "react-chatjs-2";
import {
  Chart as ChartJS,
  CatarogyScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitleOptions,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CatarogyScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitleOptions,
  Tooltip,
  Legend
);

const Chart = ({arr=[], currency, days}) => {

const prices = [1,2,3,4,5];
const date = ["12/12/22", "11/06/19", "28/08/01"]
    const data = {}
  return <div><Line options={{responsive: true}} data={data} /></div>;
};

export default Chart;
