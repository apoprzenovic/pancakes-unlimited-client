import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvalidPage from "./pages/InvalidPage";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/transactions" element={<Transactions/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path="*" element={<InvalidPage/>}/>
            </Routes>
        </>
    );
}

export default App;
