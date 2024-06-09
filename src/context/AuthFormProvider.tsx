import { createContext, useState, ReactNode, FC } from "react";
import {produce} from "immer";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  password: string;
}

const defaultFormData: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  password: "",
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType>({
  formData: defaultFormData,
  updateFormData: () => {},
});

export const AuthFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) =>
      produce(prevData, (draft) => {
        Object.assign(draft, data);
      }),
    );
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
