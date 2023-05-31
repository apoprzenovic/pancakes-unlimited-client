import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvalidPage from "./pages/InvalidPage";
import NavBar from "./components/NavBar";
import Eaten from "./pages/Eaten";
import {UserContext} from "./context/UserContext";
import {useMemo, useState} from "react";
import BackToTopButton from "./components/BackToTopButton";

function App() {
    const [user, setUser] = useState(null);
    const handleLogin = (user) => {
        setUser(user);
    }
    const handleLogout = () => {
        setUser(null);
    }

    const value = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

    return (
        <UserContext.Provider value={value}>
            <NavBar/>
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
            <BackToTopButton/>
        </UserContext.Provider>
    );
}

export default App;
