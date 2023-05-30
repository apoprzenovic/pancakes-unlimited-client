import react from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex w-9/12 bg-main-color m-auto mb-4">
                <div className="flex-1 bg-main-background p-20 pt-44">
                    <h1 className={"text-6xl text-left text-main-text-in-focus"}>Pancakes Unlimited</h1>
                    <p className={"text-2xl text-justify mt-14 text-main-text-out-of-focus"}>
                        Your ultimate destination for delicious pancakes! We pride
                        ourselves on creating the fluffiest, most delicious pancakes in town, with an endless array of
                        flavors and toppings to choose from. Whether you're a fan of the classic buttermilk pancake,
                        crave the richness of chocolate chip, or want to explore something exotic,
                        we've got you covered.
                    </p>
                    <p className={"text-2xl text-justify mt-6 text-gray-900"}>
                        Fluffy Delights, Infinite Bites.
                    </p>
                </div>
                <div className="flex-2 bg-main-background px-4 pb-4">
                    <img src={require("../assets/images/home-pancakes.png")} alt="pancakes" className={"md:block hidden"}/>
                </div>
            </div>
            <div className="w-9/12 m-auto">
                <div className="text-center p-4">
                    <Link
                        to={"/order"}
                        className="flex items-center justify-center m-auto w-96 h-24 rounded-md bg-main-color px-3.5 py-2.5 text-xl font-semibold text-main-text-in-focus shadow-sm hover:bg-main-in-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        <img src={require("../assets/images/plus.png")} alt={"plus"} className="mr-2" width={40}/>
                        <p className={"pb-1 pl-2 text-3xl"}>
                            Order Now!
                        </p>

                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Home;
