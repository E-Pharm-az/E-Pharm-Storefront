import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { LogOut, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import ErrorContext from "@/context/ErrorProvider";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/priceUtils";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const mapStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "orders.status.pending",
      CONFIRMED: "orders.status.confirmed",
      REJECTED: "orders.status.rejected",
      SHIPPED: "orders.status.shipped",
      DELIVERED: "orders.status.delivered",
      CANCELED: "orders.status.cancelled",
      RETURNED: "orders.status.returned",
    };
    return t(statusMap[status] || "orders.status.pending");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get<Order[]>(
          `/orders/user/${user?.id}`
        );
        setOrders(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status !== 404) {
          setError(t("errors.unexpectedError"));
        }
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, []);

  const OrderProductItem = ({
    orderProduct,
  }: {
    orderProduct: OrderProduct;
  }) => (
    <div className="flex gap-3 items-center w-full mb-3">
      {orderProduct.product.imageUrl ? (
        <img
          className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover"
          src={orderProduct.product.imageUrl}
          alt="Product image"
        />
      ) : (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-md flex items-center justify-center bg-muted">
          <Pill className="text-2xl" />
        </div>
      )}
      <div>
        <p className="text-base md:text-lg font-medium">
          {orderProduct.product.name}
        </p>
        <p className="text-sm md:text-base">
          {t("orders.qty")}: {orderProduct.quantity}
        </p>
      </div>
    </div>
  );

  const OrderDetails = ({ order }: { order: Order }) => (
    <div className="w-full text-sm md:text-base grid gap-4 mt-4 md:mt-0">
      <div>
        <p className="text-muted-foreground font-medium">
          {t("orders.tracking-number")}
        </p>
        <p>{order.trackingId}</p>
      </div>
      <div>
        <p className="text-muted-foreground font-medium">
          {t("orders.shipping-address")}
        </p>
        <p>{order.address}</p>
        <p>{order.district}</p>
        <p>{order.city}</p>
        <p>{order.zip}</p>
      </div>
      <div>
        <p className="text-muted-foreground font-medium">
          {t("orders.total-price")}
        </p>
        <p className="font-medium">{formatPrice(order.totalPrice)} ₼</p>
      </div>
    </div>
  );

  const OrderItem = ({ order }: { order: Order }) => (
    <div key={order.id} className="border p-4 md:p-6 rounded-md grid gap-4">
      <div className="bg-muted p-2 rounded-md">
        <p className="text-center font-medium text-sm md:text-base">
          {mapStatus(order.status)}
        </p>
      </div>
      <div className="w-full grid md:flex gap-4">
        <div className="w-full">
          {order.orderProducts.map((orderProduct, index) => (
            <OrderProductItem key={index} orderProduct={orderProduct} />
          ))}
        </div>
        <OrderDetails order={order} />
      </div>
    </div>
  );

  const UserProfile = () => (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <p className="text-xl md:text-2xl font-medium text-muted-foreground">
          {t("profile.account-details")}
        </p>
        <div className="w-full border rounded-md p-4 md:p-6 grid gap-4">
          <div>
            <p className="text-sm md:text-md font-medium text-muted-foreground">
              {t("profile.name")}
            </p>
            <p className="font-medium text-base md:text-lg">{`${user?.firstName} ${user?.lastName}`}</p>
          </div>
          <div>
            <p className="text-sm md:text-md font-medium text-muted-foreground">
              {t("profile.email")}
            </p>
            <p className="font-medium text-base md:text-lg">{user?.email}</p>
          </div>
        </div>
      </div>

      <Button
        variant="destructive"
        onClick={logout}
        className="w-full md:w-fit mx-auto"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <p className="text-sm md:text-base">{t("profile.logout")}</p>
      </Button>
    </div>
  );

  const OrderHistory = () => (
    <div className="grid gap-6 md:gap-8">
      {orders.length > 0 ? (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      ) : (
        <p className="text-center text-base md:text-lg">
          {t("orders.no-orders")}
        </p>
      )}
    </div>
  );

  const handleTabChange = (value: string) => {
    navigate(`/account/${value}`);
  };

  const tabs = ["orders", "subscription", "profile"];

  const currentTab = tabs.find((tab) => location.pathname.includes(tab));

  useEffect(() => {
    if (!currentTab) {
      navigate("/account/orders");
    }
  }, [currentTab, navigate]);

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="max-w-[700px] mx-auto px-2 md:px-0"
    >
      <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
        <TabsTrigger value="orders" className="text-sm md:text-base">
          {t("orders.title")}
        </TabsTrigger>
        <TabsTrigger value="subscription" className="text-sm md:text-base">
          {t("subscription.title")}
        </TabsTrigger>
        <TabsTrigger value="profile" className="text-sm md:text-base">
          {t("profile.title")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <OrderHistory />
      </TabsContent>
      <TabsContent value="subscription">
        <p className="text-center text-base md:text-lg">
          {t("subscription.comming-soon")}
        </p>
      </TabsContent>
      <TabsContent value="profile">
        <UserProfile />
      </TabsContent>
    </Tabs>
  );
};

export default Profile;
