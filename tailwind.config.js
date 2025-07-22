/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#2148C0",
                    100: "#7FB4F2",
                    200: "#C5ECD8",
                    300: "#F4F1EC",
                    400: "#F79256",
                    500: "#2F2F2F",
                },
            },
        },
    },
    plugins: [],
};
