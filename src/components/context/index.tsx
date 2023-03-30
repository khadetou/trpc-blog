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

export const GlobalContext = createContext<GlobalContextType>({
  isWriteModalOpen: false,
  setIsWriteModalOpen: () => false,
});

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ isWriteModalOpen, setIsWriteModalOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;
