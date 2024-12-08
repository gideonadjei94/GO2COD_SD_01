import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { useEffect } from "react";
import Dashboard from "./Screens/Dashboard/_layout";
import Contacts from "./Screens/Dashboard/Contacts";
import Groups from "./Screens/Dashboard/Groups";
import Favorites from "./Screens/Dashboard/Favorites";
import Trash from "./Screens/Dashboard/Trash";
import { getUser } from "./lib/store";
import { Toaster } from "./Components/ui/sonner";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const routeTitles: { [key: string]: string } = {
    "/": "Auth | Contacts Box",
    "/dashboard": "Contacts",
    "/dashboard/groups": "Groups",
    "/dashboard/starred": "Favorites",
    "/dashboard/trash": "Trash",
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = getUser();
      if (!user) {
        navigate("/");
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    document.title = routeTitles[location.pathname] || "Contacts Box";
  }, [location.pathname]);

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

      <Toaster richColors closeButton />
    </div>
  );
}

export default App;
