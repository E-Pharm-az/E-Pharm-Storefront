import { createContext, useState, ReactNode, FC, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  setLoading: () => {},
});

export const LoaderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(() => {
    return { loading, setLoading };
  }, [loading, setLoading]);

  return (
    <LoaderContext.Provider value={contextValue}>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed top-0 left-0 h-1 z-50 bg-brand"
            initial={{ width: 0 }}
            animate={{
              width: ["0%", "100%"],
              x: ["0%", "0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
