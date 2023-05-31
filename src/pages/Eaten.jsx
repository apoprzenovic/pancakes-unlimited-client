import {useState, useEffect, useContext} from "react";
import {Button, Card} from "flowbite-react";
import axios from 'axios';
import {UserContext} from '../context/UserContext';

function Eaten() {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch orders of the user
            axios.get(`http://localhost:8080/api/pu/orders/user/${user.id}`)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching orders:', error);
                });
        }
    }, [user]);

    // Need to implement Detailed View button to display Modal or something to showcase all details of the order
    // maybe add a title for page
    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <div className={"flex w-9/12 bg-main-background items-center justify-center m-auto container"}>
                {user && orders.length > 0 ? orders.map(order => (
                    <Card key={order.id} className={"m-5 mt-0"}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{order.label}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{order.description}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{order.orderTime}</p>
                        <Button className={"bg-main-color hover:!bg-main-in-focus"}>
                            <p className={"!text-main-text-black text-xl"}>Detailed View</p>
                        </Button>
                    </Card>
                )) : (
                    <h1 className="font-sans text-main-text-black text-4xl mt-56">
                        Nothing to display... yet :)
                    </h1>
                )}
            </div>
        </div>
    );
}

export default Eaten;
