import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import API from "../../api/api";

const TimeOfDay: React.FC<{ userId: string }> = ({ userId }) => {
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

  const option: echarts.EChartsOption = {
    xAxis: {
      type: "category",
      data: new Array(24).fill(0).map((_, x) => x + 1),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: new Array(24)
          .fill(0)
          .map(
            (_, x) =>
              timeOfDay.data.find((t) => String(x) === t.hour)?.count ?? 0,
          ),
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
    <div style={{ width: 800 }}>
      <Card className="max-w-[400px] mb-2.5">
        <CardHeader className="flex gap-3">
          <h1 className="block font-semibold text-gray-900">Listens per day</h1>
        </CardHeader>
        <CardBody className="flex gap-3 flex-row">
          <ReactECharts
            style={{ height: "300px", width: "100%" }}
            option={option}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TimeOfDay;
