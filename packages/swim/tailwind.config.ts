import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dlrg-red": {
          950: "#e61d28",
          900: "#e8333e",
          800: "#eb4a53",
          700: "#ed6169",
          600: "#f0777e",
          500: "#f28e94",
          400: "#f5a4a9",
          300: "#f7bbbf",
          200: "#fad2d4",
          100: "#fce8ea",
          50: "#ffffff",
          DEFAULT: "#e30613"
        },
        "dlrg-yellow": {
          950: "#ffef17",
          900: "#fff02e",
          800: "#fff246",
          700: "#fff45d",
          600: "#fff574",
          500: "#fff78b",
          400: "#fff8a2",
          300: "#fffab9",
          200: "#fffcd1",
          100: "#fffde8",
          50: "#ffffff",
          DEFAULT: "#ffed00"
        },
        "dlrg-blue": {
          950: "#1777bb",
          900: "#2e84c2",
          800: "#4692c8",
          700: "#5da0cf",
          600: "#74add6",
          500: "#8bbbdd",
          400: "#a2c8e4",
          300: "#b9d6eb",
          200: "#d1e4f1",
          100: "#e8f1f8",
          50: "#ffffff",
          DEFAULT: "#0069b4"
        },
        "dlrg-black": {
          950: "#666665",
          900: "#767675",
          800: "#858584",
          700: "#949493",
          600: "#a3a3a3",
          500: "#b3b3b2",
          400: "#c2c2c2",
          300: "#d1d1d1",
          200: "#e0e0e0",
          100: "#f0f0f0",
          50: "#ffffff",
          DEFAULT: "#575756"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
