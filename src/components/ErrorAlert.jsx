import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

function ErrorAlert({color, text}) {
    const [showAlert, setShowAlert] = React.useState(true);
    return (
        <>
            {showAlert ? (
                <div
                    className={
                        `text-white px-6 py-4 border-0 rounded relative mb-4 bg-${color}-600 w-max m-auto`
                    }
                >
          <span className="text-xl inline-block mr-5 align-middle">
            <FontAwesomeIcon icon={faTriangleExclamation}/>
          </span>
                    <span className="inline-block align-middle mr-8">
            <b className="capitalize">Error!</b> {text}
          </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:!outline-none focus:!ring-0 focus:!ring-transparent transition-all duration-300"
                        onClick={() => setShowAlert(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default ErrorAlert;
