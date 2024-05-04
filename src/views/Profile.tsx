import {useState} from "react";

interface Order {
    Id: number
    Name: string
    Total: number
}

const Profile = () => {
    const [orders] = useState<Order[]>([
        {Id: 1, Name: "New order", Total: 1200},
        {Id: 2, Name: "New order", Total: 1200},
        {Id: 4, Name: "New order", Total: 1200},
        {Id: 5, Name: "New order", Total: 1200},
        {Id: 6, Name: "New order", Total: 1200}
    ])

    return (
        <div className="container">
            <h1 className="mb-4 text-xl font-medium">Your orders</h1>
            <div className="space-y-2">
                {orders.map(order => (
                    <div className="flex w-full items-center justify-between rounded border border-neutral-300 bg-neutral-200 p-2">
                        <p>{order.Name}</p>
                        <p>{order.Total}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;