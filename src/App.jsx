import "./App.css";
import { CashFlowCharts } from "./components/CashFlowCharts";
import { CashflowSummary } from "./components/CashflowSummary";
import SimpleSidebar from "./components/Sidebar";
// import { AllRoutes } from "./Routes/AllRoutes";

import data from "../db.json";

function App() {
  return (
    <>
      <SimpleSidebar>
        <CashFlowCharts data={data.Sheet1} />
        <CashflowSummary data={data.Sheet1} />

        {/* <AllRoutes /> */}
      </SimpleSidebar>
    </>
  );
}

export default App;
