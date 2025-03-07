import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,css,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,css,mdx}',
        './components/**/*.{js,ts,jsx,tsx,css,mdx}',
        './layouts/**/*.{js,ts,jsx,tsx,css,mdx}',
        './demo/**/*.{js,ts,jsx,tsx,css,mdx}',
        './data/**/*.{js,ts,jsx,tsx,css,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                // You can define your custom colors here
            },
            fontFamily: {
                // You can define your custom fonts here
            },
        },
    },
    plugins: [],
};

export default config;
