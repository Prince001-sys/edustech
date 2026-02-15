import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="p-8">{children}</div>;
};
