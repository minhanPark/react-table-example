import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { ColumnHidingTable } from "./components/ColumnHiding";
import { ColumnOrderTable } from "./components/ColumnOrder";
import { FilteringTable } from "./components/FilteringTable";
import { PaginationTable } from "./components/PaginationTable";
import { RowSelectionTable } from "./components/RowSelection";
import { SortingTable } from "./components/SortingTable";

function App() {
  return (
    <div>
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      {/* <RowSelectionTable /> */}
      {/* <ColumnOrderTable /> */}
      <ColumnHidingTable />
    </div>
  );
}

export default App;
