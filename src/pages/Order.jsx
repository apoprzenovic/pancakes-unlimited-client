import React from "react";

function Order() {
    return (
        <div className="flex flex-col items-center justify-center pt-14">
            <div className={"w-2/5 flex flex-col items-center bg-main-background m-auto container"}>
                <div className={"m-auto pb-20"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <h1 className={"text-4xl font-bold"}>Inventory</h1>

                    </div>
                    <hr className={"border-main-text-out-of-focus border-2 rounded-2xl w-full mb-10"}/>
                </div>
            </div>
        </div>
    );
}

export default Order;
