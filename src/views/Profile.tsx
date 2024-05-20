import { useEffect, useState, useContext } from "react";
import apiClient from "./../services/api-client";
import AuthContext from "../context/AuthProvider.tsx";

interface Order {
  Id: number;
  UserId: string;
  Products: number[];
  TrackingId: string;
  OrderStatus: string;
  TotalPrice: number;
  ShippingAddress: string;
  PharmaCompanyId: number;
  WarehouseId: number;
  FullName: string;
  Email: string;
  PhoneNumber: string;
}

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const userId = auth?.id;
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiClient
      .get<Order[]>(`/order/user/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div className="container">
      <h1 className="mb-4 text-xl font-medium">Your orders</h1>
      <div className="space-y-2">
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <div
                key={order.Id}
                className="flex w-full items-center justify-between rounded border border-neutral-300 bg-neutral-200 p-2"
              >
                <p>{order.FullName}</p>
                <p>{order.TotalPrice}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>No orders</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
