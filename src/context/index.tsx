import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useState,
} from "react";

type GlobalContextType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<{
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: Dispatch<SetStateAction<boolean>>;
}>(null as unknown as GlobalContextType);

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ isWriteModalOpen, setIsWriteModalOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;
