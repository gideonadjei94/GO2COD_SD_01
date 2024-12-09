import { createContext, ReactNode, useContext, useState } from "react";

interface contextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const SessionContext = createContext<contextProps | undefined>(undefined);

export const SessioinProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SessionContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SessionContext.Provider>
  );
};

export const usesession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
