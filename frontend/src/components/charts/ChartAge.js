import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartAge = () => {
  const { problems } = useContext(AppContext);

  const data = problems.reduce(
    (total, item) => {
      const { age } = item;
      if (age >= 20 && age < 30) {
        total = {
          ...total,
          first: { ...total.first, value: total.first.value + 1 },
        };
      }
      if (age >= 30 && age < 40) {
        total = {
          ...total,
          second: { ...total.second, value: total.second.value + 1 },
        };
      }
      if (age >= 40 && age < 50) {
        total = {
          ...total,
          third: { ...total.third, value: total.third.value + 1 },
        };
      }
      if (age >= 50 && age < 60) {
        total = {
          ...total,
          fourth: { ...total.fourth, value: total.fourth.value + 1 },
        };
      }
      if (age >= 60) {
        total = {
          ...total,
          fifth: { ...total.fifth, value: total.fifth.value + 1 },
        };
      }
      return total;
    },
    {
      first: { label: "from 20 to 30", value: 0 },
      second: { label: "from 30 to 40", value: 0 },
      third: { label: "from 40 to 50", value: 0 },
      fourth: { label: "from 50 to 60", value: 0 },
      fifth: { label: "more than 60", value: 0 },
    }
  );
  const ageData = Object.values(data).sort((a, b) => b.value - a.value);

  const chartConfigs = {
    type: "doughnut3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Sort Calls By Age",
        subCaption: "Some Title Goes Here",
        xAxisName: "Country",
        yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        theme: "fusion",
      },
      data: ageData,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartAge;
