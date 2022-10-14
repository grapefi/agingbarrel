/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'linear-gradient(90deg, rgba(144,17,105,1) 0%, rgba(95,17,144,1) 100%)',
      },
      colors: {
        'brand-1': 'rgb(1, 142, 57)',
        'brand-2': '#641d64',
        'brand-3': '#ccf',
        'brand-4': 'rgb(23, 25, 35, 0.65)',
        'brand-success': '#14B236',
        'brand-error': '#C00A26',
      },
      fontFamily: {
        brand: ['Superstar', '"sans-serif"'],
        secondary: ['Tommy-R', 'sans-serif'],
      },
      scale: {
        0: '0',
        25: '.25',
        50: '.5',
        60: '.6',
        75: '.75',
        80: '.80',
        85: '.85',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        125: '1.25',
        150: '1.5',
        200: '2',
      },
      screens: {
        xxs: '340px',
        // => @media (min-width: 340px) { ... }

        xs: '400px',
        // => @media (min-width: 400px) { ... }

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1792px',
        // => @media (min-width: 2048px) { ... }

        '4xl': '2048px',
        // => @media (min-width: 2048px) { ... }

        '5xl': '2304px',
        // => @media (min-width: 2048px) { ... }

        '6xl': '2560px',
        // => @media (min-width: 2048px) { ... }
      },
      fontSize: {
        xxs: '.5rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
}
