import { createContext, useState, useEffect, ReactNode, FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface FormContextType {
  error: string;
  setError: (msg: string) => void;
}

const ErrorContext = createContext<FormContextType>({
  error: "",
  setError: () => {},
});

export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [t] = useTranslation("global");
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [error]);

  const handleSetError = (msg: string) => {
    setError(msg);
  };

  return (
    <ErrorContext.Provider value={{ error, setError: handleSetError }}>
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("errors.error")}</DialogTitle>
            <DialogDescription>{error}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setVisible(false)} className="ml-auto">
            {t("common.ok")}
          </Button>
        </DialogContent>
      </Dialog>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
