import { lusolve, multiply } from "mathjs";
import { transpose } from "ramda";

export const polynomialRegression = (
  xValues: number[],
  yValues: number[],
  degree: number,
): number[] => {
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
};

// Function to generate points for the polynomial regression line
export const generatePolynomialPoints = (
  xValues: number[],
  coefficients: number[],
): number[] =>
  xValues.map((x) =>
    coefficients.reduce(
      (sum, coeff, power) => sum + coeff * Math.pow(x, power),
      0,
    ),
  );
