import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";
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
      const baseDate = dayjs().utc().startOf("day");
      return API.listensPerDay(
        userId,
        baseDate.toDate(),
        baseDate.subtract(3, "month").toDate(),
      );
    },
  });

  const series = useMemo(() => {
    if (!listensPerDay?.data?.length) {
      return [];
    }

    const listenPerDayValues = listensPerDay.data.map(({ count }) => count);

    const baseSeries: echarts.EChartsOption["series"] = [
      {
        data: listenPerDayValues,
        type: "line",
        smooth: true,
        showSymbol: false,
      },
    ];

    const xValues = listensPerDay.data.map((_, index) => index);
    const degree = 30;
    const coefficients1 = polynomialRegression(
      xValues,
      listensPerDay.data.map((d) => d.count),
      degree,
    );

    if (coefficients1) {
      console.log("??");
      const trendLineValues = generatePolynomialPoints(xValues, coefficients1);
      baseSeries.push({
        label: {
          show: false,
        },
        showSymbol: false,
        name: "trend",
        data: trendLineValues,
        type: "line",
        smooth: true,
        color: "rgba(0,0,0,.2)",
      });
    }

    return baseSeries;
  }, [listensPerDay.data]);

  if (listensPerDay.isLoading || !listensPerDay.data) {
    return <></>;
  }

  const XAxisValues = listensPerDay.data.map(({ day }) => day);
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
    series,
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
