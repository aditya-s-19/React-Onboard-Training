import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";

const PieChart = () => {
  const products = useSelector((state: RootState) => state.products.value);

  const [chartOptions, setChartOptions] = useState<{
    data: { category: string; totalPrice: number }[];
    series: any[];
    legend?: any;
  }>({
    data: [],
    series: [
      {
        type: "pie",
        angleKey: "totalPrice", // Determines the slice size
        labelKey: "category", // Labels each slice with the category name
        calloutLabelKey: "category", // Displays category names as callout labels
        calloutLabel: {
          enabled: true,
          fontSize: 14,
          fontWeight: "bold",
          color: "black",
        },
        innerRadius: 0, // Ensure a full pie chart (not a donut chart)
      },
    ],
    legend: {
      enabled: true,
      position: "bottom", // Display the legend at the bottom
    },
  });

  useEffect(() => {
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

    // Sort data from largest to smallest totalPrice
    const sortedData = categoryData.sort((a, b) => b.totalPrice - a.totalPrice);

    // Update chart options with the sorted data
    setChartOptions((prev) => ({
      ...prev,
      data: sortedData,
    }));
  }, [products]);

  return (
    <div style={{ width: 1000, height: 300, margin: "auto" }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default PieChart;
