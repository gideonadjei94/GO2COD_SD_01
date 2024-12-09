import { SessionDialog } from "@/Components/SessionDialog";

import { usesession } from "./useContext";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: any) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  //@ts-ignore
  return Date.now() >= exp * 1000;
};

export const sessionExpiredDialog = (token: any) => {
  const { isOpen, setIsOpen } = usesession();
  token && setIsOpen(isTokenExpired(token));
  return <SessionDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};
