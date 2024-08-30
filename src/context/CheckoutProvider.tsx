import { createContext, useState, ReactNode, FC } from "react";
import { produce } from "immer";
import { Address } from "@/types/address.ts";

export const DELIVERY_STEP = 1;
export const PAYMENT_STEP = 2;
export const CONFIRMATION_STEP = 3;

interface FormData {
  step: number;
  address: Address | null;
  billingAddress: Address | null;
  orderID: string | null;
}

const defaultFormData: FormData = {
  step: 1,
  address: null,
  billingAddress: null,
  orderID: null,
};

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const CheckoutContext = createContext<FormContextType>({
  formData: defaultFormData,
  updateFormData: () => {},
});

export const CheckoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevData) =>
      produce(prevData, (draft) => {
        Object.assign(draft, data);
      })
    );
  };

  return (
    <CheckoutContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
