import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import {UserContext} from "./context/UserContext";
import React, {Suspense, useMemo, useState} from "react";
import BackToTopButton from "./components/BackToTopButton";

const Home = React.lazy(() => import("./pages/Home"));
const Order = React.lazy(() => import("./pages/Order"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const Signup = React.lazy(() => import("./pages/Signup"));
const InvalidPage = React.lazy(() => import("./pages/InvalidPage"));
const Login = React.lazy(() => import("./pages/Login"));
const Eaten = React.lazy(() => import("./pages/Eaten"));

function App() {
    const localUser = JSON.parse(localStorage.getItem('user')); // Get the user data from local storage
    const [user, setUser] = useState(localUser);
    const handleLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user)); // Store the user data in local storage
        setUser(user);
    }
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user data from local storage
        setUser(null);
    }

    const value = useMemo(() => ({user, handleLogin, handleLogout}), [user]);

    return (
        <UserContext.Provider value={value}>
            <NavBar/>
            <Suspense fallback={<div className={"text-center m-auto text-3xl mt-20"}>
                <div className="lds-dual-ring text-center m-auto text-3xl mt-20"></div>
            </div>}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/eaten" element={<Eaten/>}/>
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/transactions" element={<Transactions/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path="*" element={<InvalidPage/>}/>
                </Routes>
            </Suspense>
            <BackToTopButton/>
        </UserContext.Provider>
    )
        ;
}

export default App;
