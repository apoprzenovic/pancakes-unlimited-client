import React, {useContext, useState} from "react";
import {Label, TextInput} from "flowbite-react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";
import {UserContext} from "../context/UserContext";
import LoggedIn from "../components/LoggedIn";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, showAlert] = useState(false);
    const navigate = useNavigate();
    const {user, handleLogin} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/api/pu/users/login`, {
            params: {
                email: email,
                password: password
            }
        })
            .then(res => {
                if (res.status === 200) {
                    handleLogin(res.data);
                    navigate("/");
                } else {
                    showAlert(true);
                }
            })
            .catch(err => {
                console.error(err);
                showAlert(true);
            });
    }

    if (user) {
        return <LoggedIn/>;
    }

    return (
        <>
            <div className={"m-16"}>
                <h1 className={"text-center mb-10 text-2xl text-main-text-out-of-focus"}>Log In</h1>
                <form className="flex flex-col gap-4 m-auto w-3/12" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email2"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email2"
                            placeholder="johndoe@example.com"
                            required
                            shadow
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password2"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password2"
                            required
                            shadow
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Label htmlFor={"login"}><span className={"text-gray-500"}>Don't have an account? <Link
                        to={"/signup"}
                        className={"text-main-text-black underline hover:text-main-text-in-focus"}>Sign
                    up!</Link></span></Label>
                    <button type={"submit"}
                            className={"bg-main-text-out-of-focus hover:bg-main-text-in-focus rounded p-2 text-white mt-6 w-1/2 m-auto transition-colors duration-300"}>
                        Log In
                    </button>
                </form>
            </div>
            {alert ? <ErrorAlert color={"red"}
                                 text={`The email and/or password is incorrect.`}/> : null}
        </>

    );
}

export default Login;
