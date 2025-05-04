// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // Specify the files Tailwind should scan for classes
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // Enable class-based dark mode
  // Add this line to control dark mode via a 'dark' class on the <html> element
  darkMode: 'class',

  theme: {
    extend: {
      // Your custom color definitions
      colors: {
        primary: {
          // You can reference these as: bg-primary-light, text-primary, border-primary-dark etc.
          light: '#E0F0FF',    // Light blue background/accent
          DEFAULT: '#002B5B', // Your main brand blue (text-primary, bg-primary)
          dark: '#001F42',     // A darker shade, maybe for hover or borders
        },
        // You can add more custom colors here if needed
        // Example for text colors in dark mode:
        // text_dark: {
        //   DEFAULT: '#E5E7EB', // Gray 200 - Primary text in dark mode
        //   secondary: '#9CA3AF' // Gray 400 - Secondary text in dark mode
        // }
      },
      // Your custom font family definition
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  // Any Tailwind plugins you might add later
  plugins: [],
};
