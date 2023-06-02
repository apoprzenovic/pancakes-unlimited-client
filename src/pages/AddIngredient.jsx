import React, {useContext, useState} from "react";
import {Label, TextInput, Button} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";
import USER_ROLES from "../constants/USER_ROLES";
import {UserContext} from "../context/UserContext";

function AddIngredient() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [healthy, setHealthy] = useState("");
    const [image, setImage] = useState("");
    const [alert, showAlert] = useState(false);
    const {user} = useContext(UserContext);
    const [errorMessages, setErrorMessages] = useState({
        name: '',
        category: '',
        price: '',
        healthy: '',
        image: '',
    });

    const validate = () => {
        let errorMessages = {};
        let formIsValid = true;

        if (typeof name !== "string" || name.trim() === "") {
            formIsValid = false;
            errorMessages.name = "Please enter a valid name.";
        }
        if (!['base', 'filling', 'topping', 'fruit'].includes(category)) {
            formIsValid = false;
            errorMessages.category = "Category must be one of the following: base, filling, topping, fruit.";
        }
        if (!Number(price)) {
            formIsValid = false;
            errorMessages.price = "Please enter a valid price.";
        }
        if (healthy !== "yes" && healthy !== "no") {
            formIsValid = false;
            errorMessages.healthy = "Healthy must be 'yes' or 'no'.";
        }
        if (!image) {
            formIsValid = false;
            errorMessages.image = "Please enter a valid image URL.";
        }

        setErrorMessages(errorMessages);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            axios.post('http://localhost:8080/api/pu/ingredients', {
                name: name,
                category: category,
                price: Number(price),
                healthy: healthy === "yes",
                image: image,
            })
                .then(res => {
                    navigate("/inventory");
                })
                .catch(err => {
                    console.error(err);
                    showAlert(true);
                });
        }
    }

    if(user?.roles.id !== USER_ROLES.EMPLOYEE && user?.roles.id !== USER_ROLES.STORE_OWNER) {
        return <div><h1 className="text-center font-sans text-main-text-black text-4xl mt-56">You do not have
            permissions to view this page!</h1></div>;
    }

    return (
        <>
            <div className={"m-16"}>
                <h1 className={"text-center mb-10 text-2xl text-main-text-out-of-focus"}>Add Ingredient</h1>
                <form className="flex flex-col gap-4 m-auto w-3/12" onSubmit={handleSubmit}>
                    <div className={"flex gap-4"}>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name"/>
                            </div>
                            <TextInput
                                id="name"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                helperText={<span className="text-red-600">{errorMessages.name}</span>}
                                placeholder="Banana"
                            />
                        </div>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Category"/>
                            </div>
                            <TextInput
                                id="category"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setCategory(e.target.value)}
                                helperText={<span className="text-red-600">{errorMessages.category}</span>}
                                placeholder={"base / filling / topping / fruit"}
                            />
                        </div>
                    </div>

                    <div className={"flex gap-4"}>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Price"/>
                            </div>
                            <TextInput
                                id="price"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setPrice(e.target.value)}
                                helperText={<span className="text-red-600">{errorMessages.price}</span>}
                                placeholder={"15.99"}
                            />
                        </div>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label htmlFor="healthy" value="Healthy"/>
                            </div>
                            <TextInput
                                id="healthy"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setHealthy(e.target.value)}
                                helperText={<span className="text-red-600">{errorMessages.healthy}</span>}
                                placeholder={"yes / no"}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="image" value="Image URL"/>
                        </div>
                        <TextInput
                            id="image"
                            required
                            shadow
                            type="text"
                            onChange={(e) => setImage(e.target.value)}
                            helperText={<span className="text-red-600">{errorMessages.image}</span>}
                            placeholder={"https://www.example.com/image.png"}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Button color="dark"
                                className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-main-background hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                onClick={() => navigate("/inventory")}>
                            Back
                        </Button>

                        <Button color="warning" type="submit"
                                className="focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300">
                            Add Ingredient
                        </Button>
                    </div>
                </form>
            </div>
            {alert ? <ErrorAlert color={"red"} text={`Failed to add ingredient.`}/> : null}
        </>
    );
}

export default AddIngredient;
