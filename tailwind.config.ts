import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
         'light-blue': '#3a8ff5',
       },
       animation: {
         pulse: 'pulse 2s infinite',
     },
    },
  },
  plugins: [],
} satisfies Config;
