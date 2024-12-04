import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { useEffect } from "react";
import Dashboard from "./Screens/Dashboard/_layout";
import Contacts from "./Screens/Dashboard/Contacts";
import Groups from "./Screens/Dashboard/Groups";
import Favorites from "./Screens/Dashboard/Favorites";
import Trash from "./Screens/Dashboard/Trash";

function App() {
  const location = useLocation();

  const routeTitles: { [key: string]: string } = {
    "/": "Contacts Box - Auth",
    "/dashboard": "Contacts",
    "/dashboard/groups": "Groups",
    "/dashboard/starred": "Favorites",
    "/dashboard/trash": "Trash",
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
          <Route path="groups" element={<Groups />} />
          <Route path="starred" element={<Favorites />} />
          <Route path="trash" element={<Trash />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
