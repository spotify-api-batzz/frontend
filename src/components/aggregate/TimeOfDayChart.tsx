import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import API from "../../api/api";
import Card from "../helpers/Card";

interface TimeOfDayChartProps {
  userId: string;
}

const TimeOfDayChart: React.FC<TimeOfDayChartProps> = ({ userId }) => {
  const timeOfDay = useQuery({
    queryKey: ["timeOfDay"],
    queryFn: () => {
      return API.timeOfDay(
        userId,
        dayjs().toDate(),
        dayjs().subtract(3, "month").toDate(),
      );
    },
  });

  if (timeOfDay.isLoading || !timeOfDay.data) {
    return <></>;
  }

  const findCountForHour = (hour: number) =>
    timeOfDay.data.find((t) => String(hour) === t.hour)?.count ?? 0;

  const DayHourIndexArray = new Array(24).fill(0).map((_, hour) => hour);

  const xValues = DayHourIndexArray.map((hour) => hour + 1);
  const barChartData = DayHourIndexArray.map((hour) => findCountForHour(hour));

  const option: echarts.EChartsOption = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: xValues,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: barChartData,
        type: "bar",
        name: "Song count",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        var tar = params[0];
        return `${tar.value}`;
      },
    },
  };

  return (
    <Card
      title="Music listening frequency by hour"
      size="half"
      chunks={[
        <ReactECharts
          style={{ height: "300px", width: "100%" }}
          option={option}
        />,
      ]}
    />
  );
};

export default TimeOfDayChart;
