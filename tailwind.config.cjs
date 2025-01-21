/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-list-player/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '991px',
      },
      fontFamily: {
        sans: ['Nunito Sans Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    heroui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "6px", // rounded-small
          medium: "8px", // rounded-medium
          large: "10px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#ee243c",
            },
            success: {
              foreground: "#FFFFFF",
              DEFAULT: "#16ac96",
            },
            black: {
              foreground: "#FFFFFF",
              DEFAULT: "#000000",
            },
            // ... rest of the colors
          },
        },
        dark: {},
      },
    })
  ],
}
