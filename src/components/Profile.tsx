import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";
import { LogOut, Pill, User } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Product } from "@/types/product.ts";
import { formatPrice } from "@/utils/priceUtils.ts";

interface OrderProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderProducts: OrderProduct[];
  trackingId: string;
  status: string;
  totalPrice: number;
  address: string;
  district: string;
  city: string;
  zip: number;
}

const Profile = () => {
  const [t] = useTranslation("global");
  const { user, logout } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);
  const [orders, setOrders] = useState<Order[]>();
  const axiosPrivate = useAxiosPrivate();

  const mapStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return t("orders.status.pending");
      case "CONFIRMED":
        return t("orders.status.confirmed");
      case "REJECTED":
        return t("orders.status.rejected");
      case "SHIPPED":
        return t("orders.status.shipped");
      case "DELIVERED":
        return t("orders.status.delivered");
      case "CANCELED":
        return t("orders.status.cancelled");
      case "RETURNED":
        return t("orders.status.returned");
      default:
        return t("orders.status.pending");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<Order[]>(
          `/orders/user/${user?.id}`
        );
        setOrders(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status !== 404)
            setError(t("errors.unexpectedError"));
        }
      }
    })();
  }, [user?.id]);

  return (
    <div className="grid md:flex gap-4">
      <div className="w-full">
        <h1 className="mb-4 text-xl font-medium">{t("orders.title")}</h1>
        <div className="space-y-2">
          {orders ? (
            orders.map((order) => (
              <div key={order.id} className="border p-8 rounded-md grid gap-2">
                <div className="bg-muted p-1 rounded-md">
                  <p className="text-center font-md">
                    {mapStatus(order.status)}
                  </p>
                </div>
                <div className="w-full flex gap-2">
                  <div className="w-full">
                    {order.orderProducts.map((orderProduct) => (
                      <div className="flex gap-2 items-center">
                        {orderProduct.product.imageUrl ? (
                          <img
                            className="w-24 h-24 rounded-md"
                            src={orderProduct.product.imageUrl}
                            alt="Product image"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-md flex items-center justify-center">
                            <Pill className="text-xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-lg font-medium">
                            {orderProduct.product.name}
                          </p>
                          <p className="text-sm">
                            {t("orders.qty")}: {orderProduct.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-[250px] text-lg grid gap-3 mr-auto">
                    <div>
                      <p className="text-muted-foreground">
                        {t("orders.tracking-number")}
                      </p>
                      <p>{order.trackingId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t("orders.shipping-address")}
                      </p>
                      <p>{order.address}</p>
                      <p>{order.district}</p>
                      <p>{order.city}</p>
                      <p>{order.zip}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t("orders.total-price")}
                      </p>
                      <p>{formatPrice(order.totalPrice)} ₼</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>{t("orders.no-orders")}</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-xl font-medium">{t("profile.title")}</h1>
        <div className="w-full h-min md:w-min border rounded-md p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8" />
              <div>
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
