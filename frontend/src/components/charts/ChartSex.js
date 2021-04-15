import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartSex = () => {
  const { problems } = useContext(AppContext);

  let data = problems.reduce((total, item) => {
    const { sex } = item;
    if (!total[sex]) {
      total[sex] = { label: sex, value: 1 };
    } else {
      total[sex] = { ...total[sex], value: total[sex].value + 1 };
    }
    return total;
  }, {});
  const sexData = Object.values(data);

  const chartConfigs = {
    type: "pie3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Sort Calls by Sex",
        subCaption: "Some Title Goes Here",
        // xAxisName: "Country",
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        theme: "candy",
      },
      data: sexData,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartSex;
