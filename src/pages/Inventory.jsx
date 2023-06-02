import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import USER_ROLES from "../constants/USER_ROLES";
import {Button, Modal} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    Typography, CardFooter
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function Inventory() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState(-1);

    useEffect(() => {
        axios.get('http://localhost:8080/api/pu/ingredients')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    const handleDeleteIngredient = () => {
        axios
            .delete(`http://localhost:8080/api/pu/ingredients/${idToBeDeleted}`)
            .then(res => {
                if (res.status === 200) {
                    setOpenModal(false);
                    setIngredients(prevIngredients =>
                        prevIngredients.filter(ingredient => ingredient.id !== idToBeDeleted));
                    setIdToBeDeleted(-1);
                } else {
                    console.log(
                        "Error deleting ingredient: " + idToBeDeleted + " Status: " + res.status);
                    setIdToBeDeleted(-1);
                }
            })
            .catch(err => {
                console.error(err);
                setIdToBeDeleted(-1);
            });
    };

    if (user?.roles.id !== USER_ROLES.EMPLOYEE) {
        return <div><h1 className="text-center font-sans text-main-text-black text-4xl mt-56">You do not have
            permissions to view this page!</h1></div>;
    }

    return (
        <>
            <Modal
                onClose={() => {
                    setOpenModal(false);
                    setIdToBeDeleted(-1);
                }}
                popup
                size="md"
                show={openModal}
                dismissible
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faTriangleExclamation}
                                         className="mx-auto mb-4 h-14 w-14 text-main-text-in-focus"/>
                        <h3 className="mb-5 text-lg font-normal text-main-text-in-focus dark:text-gray-400">
                            <p>
                                Are you sure you want to delete this ingredient?
                            </p>
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-transparent hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                onClick={handleDeleteIngredient}
                            >
                                Yes, I'm sure

                            </Button>
                            <Button
                                className="focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus transition-colors duration-300"
                                onClick={() => {
                                    setOpenModal(false);
                                    setIdToBeDeleted(-1);
                                }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="flex flex-col items-center justify-center pt-14">
                <div className={"w-9/12 flex flex-col items-center bg-main-background m-auto container"}>
                    <div className={"m-auto pb-20"}>
                        <div className={"flex justify-between items-center mb-2"}>
                            <h1 className={"text-4xl font-bold"}>Inventory</h1>
                            <Button
                                color={"warning"}
                                className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-black hover:!bg-main-in-focus !border-main-color transition-colors duration-300 p-1"}
                                onClick={() => {
                                    navigate("/addingredient")
                                }}>
                                <img src={require("../assets/images/plus.png")} alt={"plus"} className="mr-2"
                                     width={22}/>
                                <span className={"text-xl pb-1"}>Add Ingredient</span>
                            </Button>
                        </div>
                        <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-10"}/>

                        <div className={"flex flex-wrap justify-around"}>
                            {ingredients.map(ingredient => (
                                <Card className="mt-6 w-72 mb-4 bg-main-color" key={ingredient.id}>
                                    <CardHeader color="white" className="relative h-40">
                                        <img src={ingredient.image} alt={ingredient.name} className={"rounded-t"}/>
                                    </CardHeader>
                                    <CardBody className={"-mb-3 -mt-3"}>
                                        <Typography variant="h5" className="text-main-text-black">
                                            {ingredient.name}
                                        </Typography>
                                        <Typography className={"text-gray-800"}>
                                            Category: {ingredient.category}
                                            <br/>
                                            Healthy: {ingredient.healthy ? 'yes' : 'no'}
                                            <br/>
                                            Price: {ingredient.price} HRK
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className={"m-auto -mt-3 -mb-2"}>
                                        <Button color={"dark"}
                                                className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent  !bg-main-background hover:!bg-main-text-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                                onClick={() => {
                                                    setOpenModal(true);
                                                    setIdToBeDeleted(ingredient.id);
                                                }}
                                        >
                                            Delete Ingredient
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Inventory;
