import { useEffect } from "react";
import Table from "./components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/products";
import { AppDispatch, RootState } from "./store";
import BarChart from "./components/barChart/BarChart";

const App = () => {
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="150"
            height="150" // Adjust size here
          >
            <circle fill="#0064FF" stroke="#0064FF" strokeWidth="15" r="15" cx="40" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4s"
              ></animate>
            </circle>
            <circle fill="#0064FF" stroke="#0064FF" strokeWidth="15" r="15" cx="100" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2s"
              ></animate>
            </circle>
            <circle fill="#0064FF" stroke="#0064FF" strokeWidth="15" r="15" cx="160" cy="65">
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="2s"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0s"
              ></animate>
            </circle>
          </svg>
        </div>
      ) : (
        <>
          <BarChart />
          <Table />
        </>
      )}
    </div>
  );
};

export default App;
