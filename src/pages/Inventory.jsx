import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";
import USER_ROLES from "../constants/USER_ROLES";

function Inventory() {

    const {user} = useContext(UserContext);

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
                        {/*    Not sure if it will get aligned right or center here*/}
                    </div>
                    <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-10"}/>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
