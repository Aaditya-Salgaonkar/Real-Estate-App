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
        primary: {
          100: "#D3D3D3",    
          200: "#D3D3D3",
          300: "#0B1D51",   //Dark Navy Blue (#0B1D51): A strong contrast to highlight the active tab.
          400: "#FFC300",   //Golden Yellow (#FFC300): This will make the active tab stand out and draw attention
          500: "#D3D3D3",   //inactive icons
          600: "#FDFDF5",   //Ivory White (#FDFDF5): Ensures readability on the golden yellow background.
          700: "#576D79",   //Slate Gray (#576D79): Subtle and non-distracting for inactive tabs.
          800: "#EDE0CF",   //Soft Beige (#EDE0CF) – Complementary sections or card backgrounds
          900:"#D3D3D3",    //Light Gray (#D3D3D3) – Borders, dividers, or secondary text
          1000:"#2C6E49", //Forest Green (#2C6E49) – Trust-building elements like icons or badges
          1100:"#DAA520", //Goldenrod (#DAA520) – Slightly muted golden yellow for hover effects
          1200:"#F8D7A4"//light gold
        },
        accent: {
          100: "#FBFBFD",        
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",   
          200: "#666876",       
          300: "#191d31",       
        },
        danger: "#F75555",       
      },
    },
  },
  plugins: [],
}
