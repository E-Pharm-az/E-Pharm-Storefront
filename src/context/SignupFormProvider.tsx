import React, { createContext, useState, useEffect, ReactNode } from "react";

interface FormData {
  email: string;
  name: string;
  address: string;
  password: string;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const defaultFormData: FormData = {
  email: "",
  name: "",
  address: "",
  password: "",
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

const SignupFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

export { FormContext, SignupFormProvider };
