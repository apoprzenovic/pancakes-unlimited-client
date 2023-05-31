import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if(window.scrollY > window.innerHeight / 6) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-10 right-10 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-main-color hover:bg-main-in-focus text-main-text-black hover:text-white h-10 w-10 rounded flex items-center justify-center transition-colors duration-300"
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
        </div>
    );
};

export default BackToTopButton;
