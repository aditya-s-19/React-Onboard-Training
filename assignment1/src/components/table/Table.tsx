import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getProducts, updateProductWithAPI } from "../../features/products";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, NewValueParams } from "ag-grid-community";
import { Product } from "../../types/products";

const Table = () => {
  const products = useSelector((state: RootState) => state.products.value);

  const currencyCellRenderer = (props: CustomCellRendererProps): JSX.Element => {
    return <>₹{props.value}</>;
  };

  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  const [colDefs, setColDefs] = useState<ColDef<Product>[]>([
    {
      field: "id",
      valueGetter: (params: any) => params.data.id || "", // Show empty for pinned row
      cellRenderer: (params: any) => (params.value === "" ? "" : params.value), // Render empty for pinned row
    },
    { field: "name", editable: true },
    { field: "category", editable: true },
    {
      field: "price",
      editable: true,
      cellRenderer: currencyCellRenderer,
      valueGetter: (p: any) => Number(p.data.price),
    },
    { field: "quantity", editable: true, valueGetter: (p: any) => Number(p.data.quantity) },
    {
      headerName: "Total Sales",
      cellRenderer: currencyCellRenderer,
      valueGetter: (p: any) => Number(p.data.price) * Number(p.data.quantity),
    },
  ]);
  const dispatch = useDispatch<AppDispatch>();

  const totalRow = {
    id: "",
    name: "Total",
    category: "",
    price: localProducts.reduce((sum, row) => sum + row.price, 0),
    quantity: localProducts.reduce((sum, row) => sum + row.quantity, 0),
    totalSales: localProducts.reduce((sum, row) => sum + row.price * row.quantity, 0),
  };

  const onCellValueChanged = async (params: NewValueParams<Product, any>) => {
    const { oldValue, newValue, data, colDef } = params;

    if (oldValue === newValue) return;

    // Update localProducts state
    let updatedProduct: any | undefined = localProducts.find((prod) => prod.id === data.id);
    if (updatedProduct) {
      updatedProduct[colDef.field!] = newValue;
      const updatedProducts = localProducts.map((prod) =>
        prod.id === updatedProduct.id ? { ...updatedProduct } : { ...prod }
      );
      setLocalProducts(updatedProducts);
      try {
        await dispatch(updateProductWithAPI(updatedProduct));
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }

    // Persist changes to the backend
  };

  const onCellKeyDown = (event: any) => {
    console.log("onCellKeyDown called");
    if (event.event.key === "Enter" || event.event.key === "Tab") {
      event.api.stopEditing(); // Stop editing explicitly
    }
  };

  useEffect(() => {
    setLocalProducts(products.map((prod) => ({ ...prod })));
  }, [products]);

  return (
    <div className="ag-theme-quartz" style={{ height: 700, width: 1300, margin: "auto" }}>
      <AgGridReact
        rowData={localProducts}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true} // Ensure editing stops on focus loss
        onCellKeyDown={onCellKeyDown} // Handle Enter/Tab manually if needed
        animateRows={true} // Smooth transitions during sorting or editing
        defaultColDef={{
          sortable: true,
          editable: true, // Allow editing by default
          resizable: true, // Allow resizing columns
        }}
        pinnedBottomRowData={[totalRow]}
      />
    </div>
  );
};

export default Table;
