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
            <h1 className="font-medium text-xl mb-4">Your orders</h1>
            <div className="space-y-2">
                {orders.map(order => (
                    <div className="bg-neutral-200 border border-neutral-300  rounded p-2 w-full flex items-center justify-between">
                        <p>{order.Name}</p>
                        <p>{order.Total}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;