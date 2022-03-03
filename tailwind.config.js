module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'blue-brand': '#26A1FF',
                'blue-start': '#2FBEFF',
                'blue-end': '#2395FF',
                'blue-dark': '#022F59',
            },
            fontFamily: {
                'title': ['Blinker', 'sans-serif'],
                'body': ['Source Sans Pro', 'sans-serif'],
            }
        },

    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}