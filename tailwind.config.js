/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            "sm" : "576px",
            "md" : "768px",
            "lg" : "1024px",
            "xl" : "1280px",
            "2xl" : "1140px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
            },
            screens: {
                sm: "1110px",
                xl: "1110px",
            },
        },
        extend: {},
        fontFamily: {
            body: ["Gilroy"],
        },
    },
    plugins: [],
};
