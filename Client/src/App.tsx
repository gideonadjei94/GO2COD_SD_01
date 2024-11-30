import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { useEffect } from "react";
import Dashboard from "./Screens/Dashboard/_layout";
import Contacts from "./Screens/Dashboard/Contacts";

function App() {
  const location = useLocation();

  const routeTitles: { [key: string]: string } = {
    "/": "Contacts Box - Auth",
    "/dashboard": "Dashboard",
  };

  useEffect(() => {
    document.title = routeTitles[location.pathname] || "Contacts Box";
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Contacts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
