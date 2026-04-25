import { createContext, useState, type ReactNode } from "react";

type AuthModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
// eslint-disable-next-line react-refresh/only-export-components
export const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <AuthModalContext value={{ isOpen, open, close }}>
      {children}
    </AuthModalContext>
  );
}
