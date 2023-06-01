/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        'src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'main-color': '#ECAD62',
                'main-background': '#F4CE99',
                'main-in-focus': '#CF8022',
                'main-text-black': '#181818',
                'main-text-out-of-focus': '#373737',
                'main-text-in-focus': '#000000',
            },
            fontFamily: {
                // 'main-questrial': ['Questrial', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('tailwindcss/plugin'),
        require('flowbite/plugin'),
    ],
});
