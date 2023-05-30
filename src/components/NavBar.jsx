import react, {useState} from "react";
import {Avatar, Dropdown, Navbar} from "flowbite-react";
import {Link, useNavigate, useLocation} from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("Not Logged In");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        // handle the logout functionality here.
        // it could be clearing the authentication token, user info, etc.
        setLoggedIn(false);
    }

    const activeRoute = (route) => {
        // This function returns the style for the active route
        return location.pathname === route
            ? "text-2xl !text-main-text-in-focus hover:!text-main-text-in-focus hover:!bg-transparent border-none transition-colors duration-300"
            : "text-2xl !text-main-text-out-of-focus hover:!text-main-text-in-focus hover:!bg-transparent border-none transition-colors duration-300";
    }

    const activeRouteForLine = (route) => {
        // This function returns the style for the active route
        return location.pathname === route
            ? "md:hidden w-full mt-2 border-main-text-in-focus border-b rounded transition-colors duration-300"
            : "md:hidden w-full mt-2 border-main-text-out-of-focus opacity-75 border-b rounded transition-colors duration-300";
    }

    return (
        <div className={""}>
            <Navbar
                fluid
                border={false}
                className={"!bg-main-color !border-0 py-5"}
            >
                <Navbar.Brand href="/">
                    <img
                        alt="Flowbite Logo"
                        className="mr-3 h-6 sm:h-9 md:pl-10 pl-3"
                        src={"logo.png"}
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
                              {name}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => {
                            navigate("/profile")
                        }}>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        {loggedIn ? <Dropdown.Item onClick={() => {
                            handleLogout()
                        }}>Log out</Dropdown.Item> : <Dropdown.Item onClick={() => {
                            navigate("/login")
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
                    <Navbar.Link as={Link} to={"/inventory"}
                                 className={activeRoute("/inventory")}
                    >
                        Inventory
                        <hr className={activeRouteForLine("/inventory")}/>
                    </Navbar.Link>
                    <Navbar.Link as={Link} to={"/transactions"}
                                 className={activeRoute("/transactions")}
                    >
                        Transactions
                        <hr className={activeRouteForLine("/transactions")}/>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
