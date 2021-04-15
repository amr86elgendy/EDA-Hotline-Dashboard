import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartProblems = () => {
  const { problems } = useContext(AppContext);

  let formattedProblems = problems && problems.reduce((total, item) => {
    const { problems } = item;

    problems.map((p) => {
      if (!total[p]) {
        return (total[p] = { label: p, value: 1 });
      } else {
        return (total[p] = { ...total[p], value: total[p].value + 1 });
      }
    });

    return total;
  }, {});
  formattedProblems = Object.values(formattedProblems).sort((a, b) => b.value - a.value);

  const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Sort Calls Based On Problems",
        subCaption: "Some Title Goes Here",
        xAxisName: "Problem",
        yAxisName: "Number Of Complain",
        // numberSuffix: "K",
        theme: "",
      },
      data: formattedProblems,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default ChartProblems;
