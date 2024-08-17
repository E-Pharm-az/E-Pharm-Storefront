import AuthContext from "@/context/AuthProvider.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";

interface Props {
  deliveryStep: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setDeliveryAddress: Dispatch<SetStateAction<string>>;
}

interface FormData {
  address: string;
}

const DeliveryDetails = ({
  deliveryStep,
  step,
  setStep,
  setDeliveryAddress,
}: Props) => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setDeliveryAddress(data.address);
    setStep(2);
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between ${step !== deliveryStep ? "text-muted-foreground" : "mb-6"}`}
      >
        <h3 className="text-2xl font-medium ">
          {t("checkout.delivery-details")}
        </h3>
        {step !== deliveryStep && (
          <Button variant="link" onClick={() => setStep(deliveryStep)}>
            Edit
          </Button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full grid gap-4 h-min ${step !== 1 && "hidden"}`}
      >
        <div className="grid gap-4 h-min">
          <div className="flex gap-2 w-full items-center">
            <Checkbox
              checked={useDefaultAddress}
              onCheckedChange={() => setUseDefaultAddress(!useDefaultAddress)}
            />
            <p className="font-semibold">Use default address?</p>
          </div>
          {useDefaultAddress ? (
            <div className="w-full mb-3 px-2 py-4 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300 text-muted-foreground">
              <p>{user?.address}</p>
            </div>
          ) : (
            <div className="w-full h-min">
              <Input
                type="text"
                label={t("checkout.address")}
                autoCorrect="off"
                autoComplete="address-line1"
                className={`${errors.address && "border-red-500 focus:border-red-500"}`}
                {...register("address", { required: t("common.required") })}
              />
              <p className="w-full h-3 text-xs text-red-500">
                {errors.address?.message}
              </p>
            </div>
          )}
        </div>

        <Button type="submit" className="w-min ml-auto p-6 mt-6">
          {t("checkout.save-and-continue")}
        </Button>
      </form>
    </div>
  );
};
export default DeliveryDetails;
