import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { useEffect } from "react";
import Dashboard from "./Screens/Dashboard/_layout";
import Contacts from "./Screens/Dashboard/Contacts";
import Groups from "./Screens/Dashboard/Groups";
import Favorites from "./Screens/Dashboard/Favorites";
import Trash from "./Screens/Dashboard/Trash";
import { getToken, getUser } from "./lib/store";
import { Toaster } from "./Components/ui/sonner";
import { isTokenExpired, sessionExpiredDialog } from "./lib/tokenAuth";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const routeTitles: { [key: string]: string } = {
    "/": "Auth | Contacts Box",
    "/dashboard": "Contacts |  Contacts Box",
    "/dashboard/groups": "Groups |  Contacts Box",
    "/dashboard/starred": "Favorites |  Contacts Box",
    "/dashboard/trash": "Trash |  Contacts Box",
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = getUser();
      const token = getToken();
      if (!user || isTokenExpired(token)) {
        sessionExpiredDialog(token);
      } else {
        navigate("/dashboard");
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
