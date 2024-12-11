import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updateProductWithAPI } from "../../features/products";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, NewValueParams } from "ag-grid-community";
import { Product } from "../../types/products";

const Table = () => {
  const products = useSelector((state: RootState) => state.products.value);
  const dispatch = useDispatch<AppDispatch>();

  const currencyCellRenderer = (props: CustomCellRendererProps): JSX.Element => {
    return <>₹{props.value}</>;
  };

  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  const [colDefs, setColDefs] = useState<ColDef<Product>[]>([
    {
      field: "id",
      valueGetter: (params: any) => params.data.id || "",
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

  const onCellValueChanged = async (params: NewValueParams<Product, any>) => {
    const { oldValue, newValue, data, colDef, node } = params;

    if (oldValue === newValue) return;

    if (["price", "quantity"].includes(colDef.field!)) {
      const numericValue = Number(newValue);
      if (isNaN(numericValue) || numericValue < 0) {
        alert(`Invalid value for ${colDef.field}. It must be a non-negative number.`);
        node && node.setDataValue(colDef.field!, oldValue);
        return;
      }
    }

    if (["name", "category"].includes(colDef.field!)) {
      if (!newValue || newValue.trim() === "") {
        alert(`Invalid value for ${colDef.field}. It cannot be empty.`);
        node && node.setDataValue(colDef.field!, oldValue);
        return;
      } else if (newValue.length > 30) {
        alert(`Invalid value for ${colDef.field}. It cannot be more than 30 characters.`);
        node && node.setDataValue(colDef.field!, oldValue);
        return;
      }
    }

    const editedProduct = { ...data, [colDef.field!]: newValue };

    try {
      await dispatch(updateProductWithAPI(editedProduct));
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to save changes. Reverting...");
      node && node.setDataValue(colDef.field!, oldValue);
    }
  };

  const totalRow = {
    id: "",
    name: "Total",
    category: "",
    price: localProducts.reduce((sum, row) => sum + row.price, 0),
    quantity: localProducts.reduce((sum, row) => sum + row.quantity, 0),
    totalSales: localProducts.reduce((sum, row) => sum + row.price * row.quantity, 0),
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
        stopEditingWhenCellsLoseFocus={true}
        pinnedBottomRowData={[totalRow]}
      />
    </div>
  );
};

export default Table;
