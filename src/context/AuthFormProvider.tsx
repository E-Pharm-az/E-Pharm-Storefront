import { createContext, useState, useEffect, ReactNode, FC } from "react";

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
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : defaultFormData;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
