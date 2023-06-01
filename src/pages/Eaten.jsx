import React, {useState, useEffect, useContext} from "react";
import {Button, Card} from "flowbite-react";
import axios from 'axios';
import {UserContext} from '../context/UserContext';

function Eaten() {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderPancakes, setOrderPancakes] = useState([]);

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

    const handleToggleDetailView = (order) => {
        if (expandedOrder === order) {
            setExpandedOrder(null);
            setOrderPancakes([]);
        } else {
            // Fetch pancakes for this order
            axios.get(`http://localhost:8080/api/pu/orders/${order.id}/pancakes`)
                .then(response => {
                    setOrderPancakes(response.data);
                    setExpandedOrder(order);
                })
                .catch(error => {
                    console.error('Error fetching pancakes for order:', error);
                });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <div className={"m-auto pb-20"}>
                <div className={"flex justify-between items-center mb-2"}>
                    <h1 className={"text-4xl font-bold"}>History of Eaten Pancakes</h1>
                </div>
                <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-0"}/>
            </div>
            <div className={"flex w-9/12 bg-main-background items-center justify-center m-auto container"}>
                {user && orders.length > 0 ? orders.map(order => (
                    <Card key={order.id} className={"m-5 mt-0"}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{order.label}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{order.description}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{order.orderTime}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{order.price} HRK</p>
                        {expandedOrder === order && orderPancakes.map(pancake => (
                            <div key={pancake.id}>
                                {pancake.id===1 ? <h5><b>Pancakes:</b></h5>:null}
                                <h5>{pancake.id}. {pancake.name}</h5>
                            </div>
                        ))}
                        <Button
                            color={"warning"}
                            className={"bg-main-color hover:!bg-main-in-focus"}
                            onClick={() => handleToggleDetailView(order)}>
                            <p className={"!text-main-text-black text-xl"}>
                                {expandedOrder === order ? 'Collapse' : 'Detailed View'}
                            </p>
                        </Button>
                    </Card>
                )) : (
                    <h1 className="font-sans text-main-text-black text-4xl mt-10">
                        Nothing to display... yet :)
                    </h1>
                )}
            </div>
        </div>
    );
}

export default Eaten;
