import react from "react";
import {Button, Label, TextInput} from "flowbite-react";
import {Link} from "react-router-dom";

function Login() {

    // I can do the same thing I did in Signup

    const handleSubmit = (e) => {
        e.preventDefault();
        // if user exists when logging in, redirect to home page
        // else, display error alert same as Sign up
    }

    return (
        <div className={"m-16"}>
            <h1 className={"text-center mb-10 text-2xl text-main-text-out-of-focus"}>Log In</h1>
            <form className="flex flex-col gap-4 m-auto w-3/12">
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
                    />
                </div>
                <Label htmlFor={"login"}><span className={"text-gray-500"}>Don't have an account? <Link to={"/signup"}
                                                                                                        className={"text-main-text-black underline hover:text-main-text-in-focus"}>Sign
                    up!</Link></span></Label>
                <button type={"submit"}
                        className={"bg-main-text-out-of-focus hover:bg-main-text-in-focus rounded p-2 text-white mt-6 w-1/2 m-auto transition-colors duration-300"}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;
