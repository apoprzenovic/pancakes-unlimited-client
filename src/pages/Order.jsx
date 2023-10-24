import React, {useContext, useEffect, useState} from "react";
import {Card, CardBody, CardFooter, Checkbox, Radio, Typography} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "flowbite-react";
import {UserContext} from "../context/UserContext";

function Order() {

    const [baseIngredients, setBaseIngredients] = useState([]);
    const [fillingIngredients, setFillingIngredients] = useState([]);
    const [toppingIngredients, setToppingIngredients] = useState([]);
    const [fruitIngredients, setFruitIngredients] = useState([]);
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedFilling, setSelectedFilling] = useState([]);
    const [selectedTopping, setSelectedTopping] = useState([]);
    const [selectedFruit, setSelectedFruit] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const addPancakeToOrder = async () => {
        setLoading(true);
        const baseName = baseIngredients.find(i => i.id === selectedBase)?.name;
        const otherIngredientsNames = [
            ...selectedFilling.map(i => fillingIngredients.find(f => f.id === i)?.name),
            ...selectedTopping.map(i => toppingIngredients.find(f => f.id === i)?.name),
            ...selectedFruit.map(i => fruitIngredients.find(f => f.id === i)?.name)
        ].filter(Boolean).join(', ');
        const ingredientIds = [selectedBase, ...selectedFilling, ...selectedTopping, ...selectedFruit];
        const ingredients = await Promise.all(ingredientIds.map(id => axios.get(`http://localhost:8080/api/pu/ingredients/${id}`)));
        const healthyIngredients = ingredients.filter(ingredient => ingredient.data.healthy).length;

        let pancakeName;
        if (!otherIngredientsNames) pancakeName = baseName + " ";
        else pancakeName = `${baseName} with ${otherIngredientsNames} `;

        const newPancake = {
            name: pancakeName,
            ingredients: ingredientIds.map(id => ({id})),
            healthyIngredients,
            totalIngredients: ingredientIds.length
        };

        const response = await axios.post('http://localhost:8080/api/pu/pancakes', newPancake);

        setOrder(prev => [...prev, response.data]);
        setSelectedBase(null);
        setSelectedFilling([]);
        setSelectedTopping([]);
        setSelectedFruit([]);
        setCurrentStep(1);

        setLoading(false);
    };

    const removePancakeFromOrder = async (index) => {
        // deletes pancake
        const pancake = order[index];
        await axios.delete(`http://localhost:8080/api/pu/pancakes/${pancake.id}`);

        const newOrder = [...order];
        newOrder.splice(index, 1);
        setOrder(newOrder);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/pu/ingredients")
            .then(response => {
                setBaseIngredients(response.data.filter(ingredient => ingredient.category === 'base'));
                setFillingIngredients(response.data.filter(ingredient => ingredient.category === 'filling'));
                setToppingIngredients(response.data.filter(ingredient => ingredient.category === 'topping'));
                setFruitIngredients(response.data.filter(ingredient => ingredient.category === 'fruit'));
            })
            .catch(setError);
    }, []);

    const nextStep = () => {
        if (currentStep < 4 && (selectedBase || currentStep > 1)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSelect = (id, setter, isSelected) => {
        if (isSelected) {
            setter(prev => prev.filter(itemId => itemId !== id));
        } else {
            setter(prev => [...prev, id]);
        }
    };

    const submitOrder = async () => {
        setLoading(true)
        setError(null);
        try {
            // Fetch the current amount of orders for this user
            const response = await axios.get(`http://localhost:8080/api/pu/orders/user/${user.id}/amountOfOrders`);
            const orderCount = response.data;

            const pancakesRes = await Promise.all(order.map(async pancake => {
                return await axios.post("http://localhost:8080/api/pu/pancakes", pancake);
            }));

            const orderRes = await axios.post("http://localhost:8080/api/pu/orders", {
                users: {id: user.id},
                description: `${orderCount + 1}. Order`,  // description is now dynamic
                price: finalPrice,  // add this line
                ordersPancakes: pancakesRes.map(pancakeRes => ({
                    pancake: {id: pancakeRes.data.id}
                }))
            });

            setOrder([]);
            navigate('/eaten'); // Redirect to a success page
        } catch (err) {
            setError("An error occurred while submitting your order. Please try again.");
        }
        setLoading(false);
    };


    // Total price
    const totalPrice = order.reduce((total, pancake) => total + pancake.price, 0);
    // Total healthy ingredients
    const totalHealthyIngredients = order.reduce((total, pancake) => total + pancake.healthyIngredients, 0);
    // Total ingredients count
    const totalIngredients = order.reduce((total, pancake) => total + pancake.totalIngredients, 0);

    // Healthy ingredients ratio
    const healthyRatio = totalHealthyIngredients / totalIngredients;

    let discount = 0;
    let discountLabel = '';
    if (healthyRatio > 0.75) {
        discount = 0.15;  // 15% discount
        discountLabel = 'Healthy Discount (15%)';
    } else if (totalPrice > 200) {
        discount = 0.10;  // 10% discount
        discountLabel = 'Price Discount  (10%)';
    } else if (totalPrice > 100) {
        discount = 0.05;  // 5% discount
        discountLabel = 'Price Discount  (5%)';
    }

    const discountAmount = totalPrice * discount;

    const finalPrice = totalPrice * (1 - discount);  // Apply discount

    if (!user) {
        return (
            <div>
                <main className="grid min-h-full place-items-center bg-main-background px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Not Logged In</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, you need to be logged in to order.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to={"/login"}
                                className="rounded text-base px-3.5 py-2.5 focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center justify-center pt-14">
            <div className={"w-9/12 flex flex-col items-center bg-main-background m-auto container"}>
                <div className={"m-auto pb-16"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <h1 className={"text-4xl font-bold"}>Order</h1>
                    </div>
                    <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-0"}/>
                </div>

                {/* Base ingredients selection */}
                <div className="flex flex-col md:flex-row justify-center md:gap-6">
                    {currentStep === 1 &&
                        <Card className="w-96 h-max">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">Base</Typography>
                                {baseIngredients.map(ingredient => (
                                    <div key={ingredient.id}>
                                        <Radio
                                            id={`base-${ingredient.id}`}
                                            name="base"
                                            label={<p
                                                className={"block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900"}>{ingredient.name}</p>}
                                            color={"deep-orange"}
                                            onChange={() => setSelectedBase(ingredient.id)}
                                        />
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter className="pt-0 m-auto flex justify-between">
                                <Button onClick={nextStep}
                                        className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"}>Next</Button>
                            </CardFooter>
                        </Card>
                    }

                    {/* Filling ingredients selection */}
                    {currentStep === 2 &&
                        <Card className="w-96 h-max">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">Filling</Typography>
                                {fillingIngredients.map(ingredient => (
                                    <div key={ingredient.id}>
                                        <Checkbox
                                            id={`filling-${ingredient.id}`}
                                            name="filling"
                                            label={<p
                                                className={"block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900"}>{ingredient.name}</p>}
                                            color={"deep-orange"}
                                            onChange={() => handleSelect(ingredient.id, setSelectedFilling, selectedFilling.includes(ingredient.id))}
                                        />
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter className="pt-0 m-auto flex justify-between">
                                <Button onClick={prevStep}
                                        className={"mr-20 focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-transparent hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                >Previous</Button>
                                <Button onClick={nextStep}
                                        className={"ml-24 focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"}>Next</Button>
                            </CardFooter>
                        </Card>
                    }

                    {/* Topping ingredients selection */}
                    {currentStep === 3 &&
                        <Card className="w-96 h-max">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">Topping</Typography>
                                {toppingIngredients.map(ingredient => (
                                    <div key={ingredient.id}>
                                        <Checkbox
                                            id={`topping-${ingredient.id}`}
                                            name="topping"
                                            label={<p
                                                className={"block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900"}>{ingredient.name}</p>}
                                            color={"deep-orange"}
                                            onChange={() => handleSelect(ingredient.id, setSelectedTopping, selectedTopping.includes(ingredient.id))}
                                        />
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter className="pt-0 m-auto flex justify-between">
                                <Button onClick={prevStep}
                                        className={"mr-20 focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-transparent hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                >Previous</Button>
                                <Button onClick={nextStep}
                                        className={"ml-24 focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"}>Next</Button>
                            </CardFooter>
                        </Card>
                    }

                    {/* Fruit ingredients selection */}
                    {currentStep === 4 &&
                        <Card className="w-96 h-max">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">Fruit</Typography>
                                {fruitIngredients.map(ingredient => (
                                    <div key={ingredient.id}>
                                        <Checkbox
                                            id={`fruit-${ingredient.id}`}
                                            name="fruit"
                                            label={<p
                                                className={"block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900"}>{ingredient.name}</p>}
                                            color={"deep-orange"}
                                            onChange={() => handleSelect(ingredient.id, setSelectedFruit, selectedFruit.includes(ingredient.id))}
                                        />
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter className="pt-0 m-auto flex justify-between">
                                <Button onClick={prevStep}
                                        className={"mr-16 focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-transparent hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                >Previous</Button>
                                <Button onClick={addPancakeToOrder}
                                        disabled={loading}
                                        className={"ml-16 focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"}>Add
                                    to order</Button>
                            </CardFooter>
                        </Card>
                    }

                    <div className="w-96">
                        <Card>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">Order</Typography>
                                {order.map((pancake, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <Typography variant="paragraph" color="blue-gray" className="mb-2">
                                            {i + 1}. {pancake.name}
                                            {pancake.toppings && pancake.toppings.length > 0 ? ' with ' + pancake.toppings.join(', ') : ''}
                                            - <span className={"font-bold"}>{pancake.price} KN</span>
                                        </Typography>
                                        <button onClick={() => removePancakeFromOrder(i)}
                                                className="mb-4 px-2 rounded focus:outline-none focus:ring-0 focus:ring-transparent border border-main-text-black bg-transparent hover:bg-main-text-black hover:text-white text-main-text-in-focus transition-colors duration-300">-
                                        </button>
                                    </div>
                                ))}
                                {order.length > 0 &&
                                    <>
                                        <div className="mb-4 mt-10 flex justify-between">
                                            <Typography variant="h5" color="blue-gray">Total:</Typography>
                                            <Typography variant="h5"
                                                        color="blue-gray">{totalPrice.toFixed(2)} KN</Typography>
                                        </div>
                                        {discount > 0 &&
                                            <>
                                                <div className="mb-4 flex justify-between">
                                                    <Typography variant="paragraph"
                                                                color="blue-gray">{discountLabel}:</Typography>
                                                    <Typography variant="paragraph"
                                                                color="blue-gray">{discountAmount.toFixed(2)} KN</Typography>
                                                </div>
                                                <hr className="mb-4"/>
                                                <div className="mb-5 flex justify-between">
                                                    <Typography variant="h5" color="blue-gray">New Total:</Typography>
                                                    <Typography variant="h5"
                                                                color="blue-gray">{finalPrice.toFixed(2)} KN</Typography>
                                                </div>
                                            </>
                                        }
                                        <div className="flex flex-col md:flex-row justify-center items-center">
                                            <Button onClick={submitOrder}
                                                    disabled={loading}
                                                    className="focus:outline-none focus:ring-0 focus:ring-transparent bg-main-color !text-main-text-black hover:bg-main-in-focus transition-colors duration-300">Submit
                                                Order</Button>
                                        </div>
                                    </>
                                }
                            </CardBody>
                        </Card>
                    </div>


                </div>

                {error && <p>{error}</p>}

            </div>
        </div>
    );
}

export default Order;
