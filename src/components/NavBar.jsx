import React, {useContext, useState} from "react";
import {Avatar, Button, Dropdown, Modal, Navbar} from "flowbite-react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, handleLogout} = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    // hacky way to solve dropdown not closing when I press login,
    // but it works (since there isn't a state on Dropdown to directly control)
    // and the navbar isn't expensive to rerender, and should happen only once per user,
    // maybe twice if they switch accounts
    const [key, setKey] = useState(0);

    const handleLogoutClick = () => {
        handleLogout();
        setOpenModal(false);
        setKey(prevKey => prevKey + 1);
        navigate("/");
    }

    function onClickToggle() {
        setOpenModal(true);
    }

    const handleLoginClick = () => {
        navigate("/login");
        setKey(prevKey => prevKey + 1);
    }

    const activeRoute = (route) => {
        return location.pathname === route
            ? "text-2xl !text-main-text-in-focus !font-semibold hover:!text-main-text-in-focus hover:!bg-transparent border-none transition-colors duration-300"
            : "text-2xl !text-main-text-out-of-focus hover:!text-main-text-in-focus hover:!bg-transparent border-none transition-colors duration-300";
    }

    const activeRouteForLine = (route) => {
        return location.pathname === route
            ? "md:hidden w-full mt-2 border-main-text-in-focus border-b rounded transition-colors duration-300"
            : "md:hidden w-full mt-2 border-main-text-out-of-focus opacity-75 border-b rounded transition-colors duration-300";
    }

    return (
        <div key={key}>
            <Modal
                onClose={() => {
                    setOpenModal(false)
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
                                Are you sure you want to log out?
                            </p>
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                className={"focus:!outline-none focus:!ring-0 focus:!ring-transparent !border !border-main-text-black !bg-transparent hover:!bg-main-text-black !text-main-text-in-focus transition-colors duration-300"}
                                onClick={handleLogoutClick}
                            >
                                Yes, I'm sure

                            </Button>
                            <Button
                                className="focus:!outline-none focus:!ring-0 focus:!ring-transparent !bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus hover:!text-white transition-colors duration-300"
                                onClick={() => {
                                    setOpenModal(false)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className={""}>

                <Navbar
                    fluid
                    border={false}
                    className={"!bg-main-color !border-0 py-5"}
                >
                    <Navbar.Brand href="/">
                        <img
                            alt="PU Logo"
                            className="mr-3 h-10 md:pl-10 pl-3"
                            src={require("../assets/images/pancake-topMaple.png")}
                        />
                    </Navbar.Brand>
                    <div className="flex md:order-2 md:pr-10 pr-2">
                        <Dropdown
                            inline
                            label={<Avatar alt="User settings"
                                           img={require("../assets/images/user.png")}/>}
                            arrowIcon={false}
                        >
                            <Dropdown.Header>
                            <span className="block text-sm">
                              {user ? user.firstname + " " + user.lastname : "Not Logged In"}
                            </span>
                            </Dropdown.Header>
                            {user ? <Dropdown.Item className={"transition-colors duration-300"} onClick={() => {
                                    onClickToggle();
                                }}>Log out</Dropdown.Item> :
                                <Dropdown.Item className={"transition-colors duration-300"} onClick={() => {
                                    handleLoginClick();
                                }}>Log in</Dropdown.Item>}
                        </Dropdown>
                        <Navbar.Toggle/>
                    </div>
                    <Navbar.Collapse className={""}>
                        <Navbar.Link
                            as={Link} to={"/"}
                            className={activeRoute("/")}
                        >
                            Home
                            <hr className={activeRouteForLine("/")}/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to={"/order"}
                                     className={activeRoute("/order")}
                        >
                            Order
                            <hr className={activeRouteForLine("/order")}/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to={"/eaten"}
                                     className={activeRoute("/eaten")}
                        >
                            Eaten
                            <hr className={activeRouteForLine("/eaten")}/>
                        </Navbar.Link>
                        {user && user.roles && (user.roles.id === 2) &&
                            <Navbar.Link as={Link} to={"/inventory"}
                                         className={activeRoute("/inventory")}> Inventory <hr
                                className={activeRouteForLine("/inventory")}/></Navbar.Link>}

                        {user && user.roles && user.roles.id === 3 && <Navbar.Link as={Link} to={"/transactions"}
                                                                                   className={activeRoute("/transactions")}> Transactions <hr
                            className={activeRouteForLine("/transactions")}/></Navbar.Link>}

                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
}

export default NavBar;
