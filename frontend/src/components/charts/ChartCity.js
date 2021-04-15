import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartCity = () => {
  const { problems } = useContext(AppContext);

  const data = problems.reduce((total, item) => {
    const { city } = item;
   
      if (!total[city]) {
        (total[city] = { label: city, value: 1 });
      } else {
        (total[city] = { ...total[city], value: total[city].value + 1 });
      }

    return total;
  }, {});
  const cityData = Object.values(data).sort((a, b) => b.value - a.value).slice(0, 5);

  const chartConfigs = {
    type: "bar3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Sort Call By City",
        subCaption: "Some Title Goes Here",
        xAxisName: "City",
        yAxisName: "Number Of Calls",
        // numberSuffix: "K",
        theme: "gammel",
      },
      data: cityData,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartCity;
