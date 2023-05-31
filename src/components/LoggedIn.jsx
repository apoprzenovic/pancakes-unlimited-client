import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Button, Modal} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function LoggedIn() {

    const {handleLogout} = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);

    const handleLogoutClick = () => {
        handleLogout();
        setOpenModal(false);
    }

    function onClickToggle() {
        setOpenModal(true);
    }

    return (
        <div>
            <main className="grid min-h-full place-items-center bg-main-background px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page
                        Unavailable</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">You are already logged in</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={"/"}
                            className="rounded-md bg-main-color px-3.5 py-2.5 text-sm text-main-text-out-of-focus font-semibold hover:text-white shadow-sm hover:bg-main-in-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
                        >
                            Go back home
                        </Link>
                        <button
                            className="rounded-md border-main-text-out-of-focus border text-main-text-out-of-focus px-3.5 py-2.5 text-sm font-semibold hover:text-white shadow-sm hover:bg-main-text-in-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
                            onClick={onClickToggle}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
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
                                    className={"!border !border-black bg-transparent hover:!bg-black hover:!text-white !text-main-text-in-focus transition-colors duration-300"}
                                    onClick={handleLogoutClick}
                                >
                                    Yes, I'm sure

                                </Button>
                                <Button
                                    className="!bg-main-color !text-main-text-in-focus hover:!bg-main-in-focus hover:!text-white transition-colors duration-300"
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
            </main>
        </div>
    );
}

export default LoggedIn;
