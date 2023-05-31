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
import History from "./pages/History";
import {UserContext} from "./context/UserContext";
import {useMemo, useState} from "react";

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
                <Route path="/history" element={<History/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/transactions" element={<Transactions/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path="*" element={<InvalidPage/>}/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
