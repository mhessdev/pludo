module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./sections/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("tailwind-scrollbar"),
        // ...
    ],
    variants: {
        // ...
        scrollbar: ["dark", "rounded"],
    },
};
