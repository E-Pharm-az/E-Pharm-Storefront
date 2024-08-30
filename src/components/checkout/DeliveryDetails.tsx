import AuthContext from "@/context/AuthProvider.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Address } from "@/types/address.ts";
import CheckoutContext, {
  DELIVERY_STEP,
  PAYMENT_STEP,
} from "@/context/CheckoutProvider.tsx";

const DeliveryDetails = () => {
  const [t] = useTranslation("global");
  const { user } = useContext(AuthContext);
  const { formData, updateFormData } = useContext(CheckoutContext);
  const [useDefault, setUseDefault] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();

  const onSubmit = async (data: Address) => {
    if (user) {
      updateFormData({
        address: useDefault
          ? {
              address: user.address,
              city: user.city,
              district: user.district,
              zip: user.zip,
            }
          : data,
        step: PAYMENT_STEP,
      });
    }
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between ${
          formData.step === DELIVERY_STEP ? "mb-6" : "text-muted-foreground"
        }`}
      >
        <h3 className="text-2xl font-medium ">
          {t("checkout.delivery-details")}
        </h3>
        {formData.step !== DELIVERY_STEP && (
          <Button
            variant="link"
            onClick={() => updateFormData({ step: DELIVERY_STEP })}
          >
            {t("common.edit")}
          </Button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full grid gap-4 h-min ${
          formData.step !== DELIVERY_STEP && "hidden"
        }`}
      >
        <div className="grid gap-4 h-min">
          <div className="flex gap-2 w-full items-center">
            <Checkbox
              checked={useDefault}
              onCheckedChange={() => setUseDefault(!useDefault)}
            />
            <p className="font-semibold">{t("checkout.use-default-address")}</p>
          </div>
          {useDefault ? (
            <div className="w-full mb-3 px-2 py-4 text-sm text-gray-900 bg-transparent rounded-lg border border-neutral-300 text-muted-foreground">
              <p>{`${user?.address}, ${user?.city}, ${user?.district}, ${user?.zip}`}</p>
            </div>
          ) : (
            <div className="w-full grid gap-3">
              <div className="w-full h-min">
                <Input
                  type="text"
                  label={t("address.address")}
                  autoCorrect="off"
                  autoComplete="address-line1"
                  className={`${
                    errors.address && "border-red-500 focus:border-red-500"
                  }`}
                  {...register("address", {
                    required: t("common.required"),
                  })}
                />
                <p className="w-full h-3 text-xs text-red-500">
                  {errors.address?.message}
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("address.city")}
                    autoCorrect="off"
                    className={`${
                      errors.city && "border-red-500 focus:border-red-500"
                    }`}
                    {...register("city", {
                      required: t("common.required"),
                    })}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.city?.message}
                  </p>
                </div>
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("address.district")}
                    autoCorrect="off"
                    className={`${
                      errors.district && "border-red-500 focus:border-red-500"
                    }`}
                    {...register("district", {
                      required: t("common.required"),
                    })}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.district?.message}
                  </p>
                </div>
                <div className="w-full h-min">
                  <Input
                    type="text"
                    label={t("address.zip")}
                    autoCorrect="off"
                    className={`${
                      errors.zip && "border-red-500 focus:border-red-500"
                    }`}
                    {...register("zip", {
                      required: t("common.required"),
                    })}
                  />
                  <p className="w-full h-3 text-xs text-red-500">
                    {errors.zip?.message}
                  </p>
                </div>
              </div>
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
