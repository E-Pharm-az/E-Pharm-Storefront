import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { CircleAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormContextType {
  error: string;
  setError: (msg: string) => void;
}

const ErrorContext = createContext<FormContextType>({
  error: "",
  setError: () => {},
});

export const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDismiss = () => {
    setVisible(false);
    setError("");
  };

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full fixed left-0 top-2 right-0 z-50"
          >
            <div className="bg-red-300 border border-red-400 rounded-md mx-auto flex p-4 w-[500px] justify-between items-center">
              <div className="flex gap-2 items-center">
                <CircleAlert />
                <p>{error}</p>
              </div>
              <X onClick={handleDismiss} className="cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
