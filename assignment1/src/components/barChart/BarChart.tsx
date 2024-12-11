import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import { BarChartData } from "../../types/products";

const BarChart = () => {
  const products = useSelector((state: RootState) => state.products.value);

  const [chartOptions, setChartOptions] = useState<{
    data: BarChartData[];
    series: any[];
  }>({
    data: [],
    series: [
      {
        type: "bar",
        xKey: "category",
        yKey: "totalPrice",
        yName: "Total Price",
        grouped: true,
      },
    ],
  });

  useEffect(() => {
    if (products.length === 0) return;
    const categoryMap = new Map<string, BarChartData>();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, { category: product.category, totalPrice: 0 });
      }
      const existingData = categoryMap.get(product.category);
      if (existingData) {
        existingData.totalPrice += product.price;
      }
    });

    const categoryData = Array.from(categoryMap.values()).sort((a, b) => b.totalPrice - a.totalPrice);
    setChartOptions((prev) => ({
      ...prev,
      data: categoryData,
    }));
  }, [products]);

  return (
    <div style={{ width: 1000, height: 300, margin: "auto" }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default BarChart;
