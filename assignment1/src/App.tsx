import { useEffect } from "react";
import "./App.css";
import Table from "./components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/products";
import { AppDispatch, RootState } from "./store";
import BarChart from "./components/barChart/BarChart";
import LoadingAnimation from "./utility/loadingSvg";

const App = () => {
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="animationContainer">
          <LoadingAnimation />
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
