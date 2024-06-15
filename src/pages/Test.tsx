import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { lusolve, multiply, transpose } from "mathjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const normalizeHour = (hr: number) => {
  if (hr < 10) {
    console.log(`0${hr}`);
  }
  return hr < 10 ? `0${hr}` : String(hr);
};

// Function to calculate moving average
function movingAverage(data: number[], windowSize: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      result.push(NaN); // Not enough data to fill the window
    } else {
      const windowData = data.slice(i - windowSize + 1, i + 1);
      const windowSum = windowData.reduce((sum, value) => sum + value, 0);
      result.push(Math.round(windowSum / windowSize));
    }
  }
  return result;
}

const Test = () => {
  const [data, setData] = useState<
    { day: number; count: number; song_id: string; data: { name: string }[] }[]
  >([]);

  const [data2, setData2] = useState<any[]>([]);

  const params = useParams();
  //   const data =
  useEffect(() => {
    const a = async () => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);
      console.log(startDate);
      console.log(endDate);
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const url = `${baseUrl}aggregate/listensPerDay/?userId=${params.id}`;
      console.log(url);
      const data = await fetch(
        `${url}&before=${endDate.valueOf()}&after=${startDate.valueOf()}`,
      );

      console.log("jaylo");

      setData(await data.json());
    };

    a();
  }, [params.id]);

  useEffect(() => {
    const a = async () => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);
      console.log(startDate);
      console.log(endDate);
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const url = `${baseUrl}aggregate/time/?userId=${params.id}`;
      console.log(url);
      const data = await fetch(
        `${url}&before=${endDate.valueOf()}&after=${startDate.valueOf()}`,
      );

      console.log("jaylo");

      setData2(await data.json());
    };

    a();
  }, [params.id]);

  if (data.length === 0 || data2.length === 0) {
    return <></>;
  }

  const xValues = data.map((_, index) => index);

  const windowSize = 7; // Adjust the window size as needed
  const movingAvg2 = movingAverage(
    data.map((d) => d.count),
    windowSize,
  );

  // Calculate polynomial regression for both series
  const degree = 30; // Adjust degree as needed
  const coefficients1 = polynomialRegression(
    xValues,
    data.map((d) => d.count),
    degree,
  );

  console.log(data);
  const allSongs = new Set(data.flatMap((d) => d.data.map((b) => b.name)));
  console.log(allSongs);

  // Generate points for the polynomial regression line
  const trendLine1 = generatePolynomialPoints(xValues, coefficients1);
  const options: echarts.EChartsOption = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: data.map((a) => a.day),
    },
    yAxis: {
      type: "value",
      min: 0,
    },
    series: [
      {
        data: data.map((a) => a.count),
        type: "line",
        smooth: true,
        showSymbol: false,
      },
      //   {
      //     label: {
      //       show: false,
      //     },
      //     showSymbol: false,
      //     name: "trend",
      //     data: trendLine1,
      //     type: "line",
      //     smooth: true,
      //     color: "rgba(0,0,0,.2)",
      //   },

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

  const option: echarts.EChartsOption = {
    xAxis: {
      type: "category",
      data: new Array(24).fill(0).map((_, x) => x + 1),
    },
    yAxis: {
      type: "value",
      //   data: (t) => t.
    },

    series: [
      {
        data: new Array(24).fill(0).map(
          (_, x) =>
            data2.find(
              (t) => String(x) === t.hour,
              // x + 1 > 10 ? t.hour === String(x + 1) : t.hour === String(x)
            )?.count ?? 0,
          //   data2.find((t) =>
          //     x + 1 > 10 ? t.hour === String(x + 1) : t.hour === String(x)
          //   )?.count ?? 0
        ),
        type: "bar",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        var tar = params[1];
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
    },
  };
  return (
    <div style={{ width: 800 }}>
      <ReactECharts option={options} />
      <ReactECharts option={option} />
    </div>
  );
};

export default Test;
