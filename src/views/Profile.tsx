import {useState} from "react";

interface Order {
    Id: number
    Name: string
    Total: number
}

const Profile = () => {
    const [orders] = useState<Order[]>([])

    return (
        <div className="container">
            <h1 className="mb-4 text-xl font-medium">Your orders</h1>
            <div className="space-y-2">
                {orders.length > 0 ? (
                    <>
                        {orders.map(order => (
                            <div
                                className="flex w-full items-center justify-between rounded border border-neutral-300 bg-neutral-200 p-2">
                                <p>{order.Name}</p>
                                <p>{order.Total}</p>
                            </div>
                        ))}
                    </>
                ): (
                    <>
                        <p>No orders</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;