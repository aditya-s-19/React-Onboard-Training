import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";

const BarChart = () => {
  const products = useSelector((state: RootState) => state.products.value);

  const [chartOptions, setChartOptions] = useState<{
    data: { category: string; totalPrice: number }[];
    series: any[];
    legend?: any;
  }>({
    data: [],
    series: [
      {
        type: "bar", // Define the chart type as 'bar'
        xKey: "category", // xKey represents categories on the X-axis
        yKey: "totalPrice", // yKey represents the numerical values on the Y-axis
        yName: "Total Price", // Human-readable label for Y values in tooltip and legend
        grouped: true, // Group bars side-by-side for different series (if applicable)
      },
    ],
  });

  useEffect(() => {
    if (products.length === 0) return; // Return early if no products are available

    // Aggregate product data by category
    const categoryData = Object.values(
      products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = { category: product.category, totalPrice: 0 };
        }
        acc[product.category].totalPrice += product.price; // Summing up prices
        return acc;
      }, {} as Record<string, { category: string; totalPrice: number }>)
    );

    // Log the aggregated data to check if it's correct
    console.log("Aggregated Category Data:", categoryData);

    // Sort data from largest to smallest totalPrice
    const sortedData = categoryData.sort((a, b) => b.totalPrice - a.totalPrice);

    // Log the sorted data
    console.log("Sorted Data:", sortedData);

    // Update the chart options with the sorted data
    setChartOptions((prev) => ({
      ...prev,
      data: sortedData, // Provide the aggregated and sorted data to the chart
    }));
  }, [products]);

  return (
    <div style={{ width: 1000, height: 300, margin: "auto" }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default BarChart;
