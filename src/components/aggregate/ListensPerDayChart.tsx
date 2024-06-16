import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import API from "../../api/api";
import {
  generatePolynomialPoints,
  polynomialRegression,
} from "../../util/math";
import Card from "../helpers/Card";

interface ListensPerDayChartProps {
  userId: string;
}

const ListensPerDayChart: React.FC<ListensPerDayChartProps> = ({ userId }) => {
  const listensPerDay = useQuery({
    queryKey: ["listensPerDay"],
    queryFn: () => {
      return API.listensPerDay(
        userId,
        dayjs().toDate(),
        dayjs().subtract(3, "month").toDate(),
      );
    },
  });

  if (listensPerDay.isLoading || !listensPerDay.data) {
    return <></>;
  }

  const xValues = listensPerDay.data.map((_, index) => index);

  const degree = 30;
  const coefficients1 = polynomialRegression(
    xValues,
    listensPerDay.data.map((d) => d.count),
    degree,
  );

  const XAxisValues = listensPerDay.data.map(({ day }) => day);
  const listenPerDayValues = listensPerDay.data.map(({ count }) => count);
  const trendLineValues = generatePolynomialPoints(xValues, coefficients1);
  const options: echarts.EChartsOption = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      nameLocation: "middle",
      axisLabel: {
        show: true,
        showMaxLabel: true,
      },
      nameGap: 200,
      name: "Day",
      data: XAxisValues,
    },
    yAxis: {
      type: "value",
      name: "Listen count",
      min: 0,
    },
    series: [
      {
        data: listenPerDayValues,
        type: "line",
        smooth: true,
        showSymbol: false,
      },
      {
        label: {
          show: false,
        },
        showSymbol: false,
        name: "trend",
        data: trendLineValues,
        type: "line",
        smooth: true,
        color: "rgba(0,0,0,.2)",
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        var result = params[0].axisValue + "<br/>";
        params.forEach(function (item: any) {
          if (item.seriesName !== "trend") {
            result += item.marker + item.value + "<br/>";
          }
        });
        return result;
      },
    },
  };

  return (
    <Card
      title="Listens per day"
      size="half"
      chunks={[
        <ReactECharts
          style={{ height: "300px", width: "100%" }}
          option={options}
        />,
      ]}
    />
  );
};

export default ListensPerDayChart;
