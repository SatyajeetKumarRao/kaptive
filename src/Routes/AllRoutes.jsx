import { Route, Routes } from "react-router-dom";
import { Charts } from "../Pages/Charts";
import { Tables } from "../Pages/Tables";
import { Reports } from "../Pages/Reports";
import { Forecast } from "../Pages/Forecast";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/charts" element={<Charts />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/forecast" element={<Forecast />} />
    </Routes>
  );
};

export { AllRoutes };
