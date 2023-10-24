import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import {Button, Table} from "flowbite-react";
import USER_ROLES from "../constants/USER_ROLES";


function Transactions() {
    const [orders, setOrders] = useState([]);
    const [mostOrdered, setMostOrdered] = useState(null);
    const [mostOrderedHealthy, setMostOrderedHealthy] = useState(null);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user && user.roles.id === USER_ROLES.STORE_OWNER) {
            axios.get("http://localhost:8080/api/pu/orders", {
                params: {
                    userId: user.id
                }
            })
                .then(response => setOrders(response.data))
                .catch(error => console.error(`Error: ${error}`));

            axios.get("http://localhost:8080/api/pu/ingredients/mostOrderedLastMonth")
                .then(response => setMostOrdered(response.data))
                .catch(error => console.error(`Error: ${error}`));

            axios.get("http://localhost:8080/api/pu/ingredients/mostOrderedHealthyLastMonth")
                .then(response => setMostOrderedHealthy(response.data))
                .catch(error => console.error(`Error: ${error}`));
        }
    }, [user]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {html: '#ordersTable'});
        autoTable(doc, {html: '#ingredientsTable'});
        doc.save("transaction-report.pdf");
    }

    if (user?.roles.id !== USER_ROLES.STORE_OWNER) {
        return <div><h1 className="text-center font-sans text-main-text-black text-4xl mt-56">You do not have
            permissions to view this page!</h1></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center pt-14">
            <div className={"w-9/12 flex flex-col items-center bg-main-background m-auto container"}>
                <div className={"m-auto pb-20"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <h1 className={"text-4xl font-bold"}>Transaction Report</h1>
                        <Button
                            color={"warning"}
                            className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-black hover:!bg-main-in-focus !border-main-color transition-colors duration-300 p-1"}
                            onClick={downloadPDF}>
                            <img src={require("../assets/images/download.png")} alt={"plus"} className="mr-2"
                                 width={22}/>
                            <span className={"text-xl pb-1"}>Download PDF</span>
                        </Button>
                    </div>
                    <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-14"}/>
                    {user && orders.length > 0 ? (
                        <Table hoverable className={"!rounded-b"}>
                            <Table.Head className={"!text-main-text-black"}>
                                <Table.HeadCell className={"bg-main-color"}>ID</Table.HeadCell>
                                <Table.HeadCell className={"bg-main-color"}>User Email</Table.HeadCell>
                                <Table.HeadCell className={"bg-main-color"}>Label</Table.HeadCell>
                                <Table.HeadCell className={"bg-main-color"}>Description</Table.HeadCell>
                                <Table.HeadCell className={"bg-main-color"}>Order Time</Table.HeadCell>
                                <Table.HeadCell className={"bg-main-color"}>Price</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {orders.map((order) => (
                                    <Table.Row key={order.id}
                                               className="bg-white dark:border-gray-700 dark:bg-gray-800 !text-gray-800">
                                        <Table.Cell className={"bg-gray-100"}>{order.id}</Table.Cell>
                                        <Table.Cell>{order.users.email}</Table.Cell>
                                        <Table.Cell>{order.label}</Table.Cell>
                                        <Table.Cell>{order.description}</Table.Cell>
                                        <Table.Cell>{order.orderTime}</Table.Cell>
                                        <Table.Cell>{order.price}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    ) : (
                        <h1 className="font-sans text-main-text-black text-4xl mt-56">
                            Nothing to display... yet :)
                        </h1>
                    )}
                </div>
                <div className={"m-auto pb-20"}>
                    <Table hoverable>
                        <Table.Head className={"!text-main-text-black"}>
                            <Table.HeadCell className={"bg-main-color"}>Most Ordered Ingredient Last
                                Month</Table.HeadCell>
                            <Table.HeadCell className={"bg-main-color"}>Most Ordered Healthy Ingredient Last
                                Month</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 !text-gray-800">
                                <Table.Cell>{mostOrdered?.name}</Table.Cell>
                                <Table.Cell>{mostOrderedHealthy?.name}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>


            <table id="ordersTable" style={{display: 'none'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Label</th>
                    <th>Description</th>
                    <th>Order Time</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.users.email}</td>
                        <td>{order.label}</td>
                        <td>{order.description}</td>
                        <td>{order.orderTime}</td>
                        <td>{order.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <table id="ingredientsTable" style={{display: 'none'}}>
                <thead>
                <tr>
                    <th>Most Ordered Ingredient Last Month</th>
                    <th>Most Ordered Healthy Ingredient Last Month</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{mostOrdered?.name}</td>
                    <td>{mostOrderedHealthy?.name}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
