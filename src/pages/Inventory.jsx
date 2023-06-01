import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import USER_ROLES from "../constants/USER_ROLES";
import {Button} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";

function Inventory() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/pu/ingredients')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    if (user?.roles.id !== USER_ROLES.EMPLOYEE && user?.roles.id !== USER_ROLES.STORE_OWNER) {
        return <div><h1 className="text-center font-sans text-main-text-black text-4xl mt-56">You do not have
            permissions to view this page!</h1></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center pt-14">
            <div className={"w-2/5 flex flex-col items-center bg-main-background m-auto container"}>
                <div className={"m-auto pb-20"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <h1 className={"text-4xl font-bold"}>Inventory</h1>
                        <Button
                            color={"warning"}
                            className={"!bg-main-color !text-main-text-black hover:!bg-main-in-focus !border-main-color transition-colors duration-300 p-1"}
                            onClick={() => {
                                navigate("/addingredient")
                            }}>
                            <img src={require("../assets/images/plus.png")} alt={"plus"} className="mr-2" width={22}/>
                            <span className={"text-xl pb-1 pr-2"}>Add Ingredient</span>
                        </Button>
                    </div>
                    <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-10"}/>

                    <div className={"flex flex-wrap justify-around"}>
                        {ingredients.map(ingredient => (
                            <Card className="mt-6 w-80 mb-4 bg-main-color" key={ingredient.id}>
                                <CardHeader color="blue-gray" className="relative h-48">
                                    <img src={ingredient.image} alt={ingredient.name} className={"rounded-t"}/>
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h5" className="text-main-text-black">
                                        {ingredient.name}
                                    </Typography>
                                    <Typography className={"text-main-text-out-of-focus"}>
                                        Category: {ingredient.category}
                                        <br />
                                        Healthy: {ingredient.healthy ? 'yes' : 'no'}
                                        <br />
                                        Price: {ingredient.price} HRK
                                    </Typography>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Inventory;
