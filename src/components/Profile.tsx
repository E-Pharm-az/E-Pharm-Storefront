import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { Product } from "@/types/product.ts";

interface OrderProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: number;
  orderProducts: OrderProduct[];
  trackingId: string;
  orderStatus: string;
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
        <h1 className="mb-4 text-xl font-medium">Your orders</h1>
        <div className="space-y-2">
          {orders ? (
            <div className="p-4 grid gap-2 border rounded-md">
              {orders.map((order) => (
                <div key={order.id} className="flex gap-2 border p-2">
                  {order.orderProducts.map((orderProduct) => (
                    <p key={orderProduct.product.id}>
                      {orderProduct.product.name}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p>No orders</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="mb-4 text-xl font-medium">Your profile</h1>
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
