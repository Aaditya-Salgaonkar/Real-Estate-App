/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-regular": ["Rubik-Regular", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "spacemono-regular": ["SpaceMono-Regular", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#D4AF37",    // Luxury gold
          light: "#E6C36F",      // Light gold
          dark: "#B6932F",       // Dark gold
        },
        navy: {
          DEFAULT: "#002B5B",    // Primary navy blue
          light: "#365978",      // Light navy
          dark: "#001A3A",       // Dark navy
        },
        beige: {
          DEFAULT: "#F5F5DC",    // Warm beige
          light: "#FAFAE6",      // Light beige
          dark: "#E8E8C0",       // Dark beige
        },
        gray: {
          DEFAULT: "#333333",    // Charcoal gray
          light: "#4D4D4D",      // Lighter charcoal
          dark: "#1A1A1A",       // Dark charcoal
        },
        white: {
          DEFAULT: "#FFFFFF",    // Pure white
          soft: "#FBFBFD",       // Soft white (for subtle backgrounds)
        },
        teal: {
          DEFAULT: "#008080",    // Accent teal
          light: "#33A6A6",      // Light teal
          dark: "#006666",       // Dark teal
        },
        primary: {
          100: "#2C7A7B",        // Primary teal
          200: "#2C7A7B99",      // Light teal
          300: "#2C7A7B1A",      // Very light teal
        },
        accent: {
          100: "#FBFBFD",        // Very light white
        },
        black: {
          DEFAULT: "#000000",    // Black
          100: "#8C8E98",        // Light black
          200: "#666876",        // Dark gray-black
          300: "#191d31",        // Deep black-gray
        },
        danger: "#F75555",       // Danger (error, alerts)
      },
    },
  },
  plugins: [],
}
