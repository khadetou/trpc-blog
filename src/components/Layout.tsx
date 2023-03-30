import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
