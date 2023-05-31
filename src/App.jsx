import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import {UserContext} from "./context/UserContext";
import react, {Suspense, useMemo, useState} from "react";
import BackToTopButton from "./components/BackToTopButton";

const Home = react.lazy(() => import("./pages/Home"));
const Order = react.lazy(() => import("./pages/Order"));
const Inventory = react.lazy(() => import("./pages/Inventory"));
const Transactions = react.lazy(() => import("./pages/Transactions"));
const Signup = react.lazy(() => import("./pages/Signup"));
const InvalidPage = react.lazy(() => import("./pages/InvalidPage"));
const Login = react.lazy(() => import("./pages/Login"));
const Eaten = react.lazy(() => import("./pages/Eaten"));

function App() {
    const [user, setUser] = useState(null);
    const handleLogin = (user) => {
        setUser(user);
    }
    const handleLogout = () => {
        setUser(null);
    }

    const value = useMemo(() => ({user, handleLogin, handleLogout}), [user]);

    return (
        <UserContext.Provider value={value}>
            <NavBar/>
            <Suspense fallback={<div className={"text-center m-auto text-3xl mt-20"}>Loading...</div>}>
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
