import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { lusolve, multiply, transpose } from "mathjs";
import API from "../../api/api";

function polynomialRegression(
  xValues: number[],
  yValues: number[],
  degree: number,
): number[] {
  console.log(xValues, yValues);
  const matrixX = [];
  const vectorY = [];
  for (let i = 0; i < xValues.length; i++) {
    const row = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(xValues[i], j));
    }
    matrixX.push(row);
    vectorY.push([yValues[i]]);
  }

  const matrixXT = transpose(matrixX);
  const matrixXTX = multiply(matrixXT, matrixX);
  const matrixXTY = multiply(matrixXT, vectorY);
  const coefficients = lusolve(matrixXTX, matrixXTY);

  return coefficients.map((row: any) => row[0]);
}

// Function to generate points for the polynomial regression line
function generatePolynomialPoints(
  xValues: number[],
  coefficients: number[],
): number[] {
  return xValues.map((x) => {
    return coefficients.reduce(
      (sum, coeff, power) => sum + coeff * Math.pow(x, power),
      0,
    );
  });
}
const ListensPerDay: React.FC<{ userId: string }> = ({ userId }) => {
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

  // Calculate polynomial regression for both series
  const degree = 30; // Adjust degree as needed
  const coefficients1 = polynomialRegression(
    xValues,
    listensPerDay.data.map((d) => d.count),
    degree,
  );

  // Generate points for the polynomial regression line
  const trendLine1 = generatePolynomialPoints(xValues, coefficients1);
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
      data: listensPerDay.data.map((a) => a.day),
    },
    yAxis: {
      type: "value",
      name: "Listen count",
      min: 0,
    },
    series: [
      {
        data: listensPerDay.data.map((a) => a.count),
        type: "line",
        smooth: true,
        showSymbol: false,
      },
      {
        label: {
          show: false,
        },
        showSymbol: false,
        name: "trend2",
        data: trendLine1,
        type: "line",
        smooth: true,
        color: "rgba(0,0,0,.2)",
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        // console.log("FORMATTER");
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
    <div style={{ width: 800 }}>
      <Card className="max-w-[400px] mb-2.5">
        <CardHeader className="flex gap-3">
          <h1 className="block font-semibold text-gray-900">Listens per day</h1>
        </CardHeader>
        <CardBody className="flex gap-3 flex-row">
          <ReactECharts
            style={{ height: "300px", width: "100%" }}
            option={options}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ListensPerDay;
