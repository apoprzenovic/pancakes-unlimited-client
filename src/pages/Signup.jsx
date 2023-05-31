import React, {useContext, useEffect, useState} from "react";
import {Label, TextInput} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";
import {UserContext} from "../context/UserContext";
import LoggedIn from "../components/LoggedIn";

function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailUsedForSignup, setEmailUsedForSignup] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [alert, showAlert] = useState(false);
    const {user, handleLogin} = useContext(UserContext);

    useEffect(() => {
        let error = "";
        if (password.length < 8) {
            error += "Password must be 8 characters or more | ";
        }
        if (!/\d/.test(password)) {
            error += "Password must contain a number | ";
        }
        if (!/[A-Z]/.test(password)) {
            error += "Password must contain an uppercase letter | ";
        }
        error = error.slice(0, -3);
        setPasswordError(error.trim());
    }, [password]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let passwordError = "";
        let repeatPasswordError = "";

        if (password.length < 8) {
            passwordError += "Password must be 8 characters or more | ";
        }
        if (!/\d/.test(password)) {
            passwordError += "Password must contain a number | ";
        }
        if (!/[A-Z]/.test(password)) {
            passwordError += "Password must contain an uppercase letter | ";
        }
        passwordError = passwordError.slice(0, -3);

        if (password !== repeatPassword) {
            repeatPasswordError = "Passwords do not match";
        }

        // Update error states
        setPasswordError(passwordError);
        setRepeatPasswordError(repeatPasswordError);

        if (password === repeatPassword && passwordError === '' && repeatPasswordError === '') {

            axios.get(`http://localhost:8080/api/pu/users/email/${email}`)
                .then(res => {
                    if (res.data) {
                        setEmailUsedForSignup(email);
                        showAlert(true);
                    } else {
                        submitNewUser();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    function submitNewUser() {
        axios.post('http://localhost:8080/api/pu/users', {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
            // default role for consumer, can be updated via put
            roles: {
                id: 1,
                name: "consumer",
            }
        })
            .then(res => {
                handleLogin(res.data);
                navigate("/");
            })
            .catch(err => {
                console.error(err);
            });
    }

    if(user) {
        return <LoggedIn/>;
    }

    return (
        <>
            <div className={"m-16"}>
                <h1 className={"text-center mb-10 text-2xl text-main-text-out-of-focus"}>Sign Up</h1>
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
                            placeholder="johnwick@pancake-extravaganza.com"
                            required
                            shadow
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={"flex gap-4"}>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Your name"
                                />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="John"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className={"w-1/2"}>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="lastname"
                                    value="Your last name"
                                />
                            </div>
                            <TextInput
                                id="lastname"
                                placeholder="Doe"
                                required
                                shadow
                                type="text"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Your password"/>
                        </div>
                        <TextInput
                            id="password2"
                            placeholder="Password"
                            required
                            shadow
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={<span className="text-red-600">{passwordError}</span>}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="repeat-password" value="Repeat password"/>
                        </div>
                        <TextInput
                            id="repeat-password"
                            placeholder="Repeat Password"
                            required
                            shadow
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            helperText={<span className="text-red-600">{repeatPasswordError}</span>}
                        />
                    </div>
                    <Label htmlFor={"login"}><span className={"text-gray-500"}>Already have an account? <Link
                        to={"/login"}
                        className={"text-main-text-black underline hover:text-main-text-in-focus"}>Log
                    in!</Link></span></Label>

                    <button type={"submit"}
                            className={"bg-main-text-out-of-focus hover:bg-main-text-in-focus rounded p-2 text-white mt-6 w-1/2 m-auto transition-colors duration-300"}>
                        Sign Up
                    </button>

                </form>
            </div>
            {alert ? <ErrorAlert color={"red"}
                                 text={`An account with the email: ${emailUsedForSignup} already exists.`}/> : null}

        </>

    );
}

export default Signup;
