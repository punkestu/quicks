/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-1": "#2F80ED",
        "primary-2": "#4F4F4F",
        "primary-3": "#828282",
        "primary-4": "#E0E0E0",
        "indicator-1": "#F8B76B",
        "indicator-2": "#8785FF",
        "indicator-3": "#EB5757",
        "indicator-4": "#F2C94C",
        "chats-1": "#FCEED3",
        "chats-1-2": "#E5A443",
        "chats-2": "#EEDCFF",
        "chats-2-2": "#9B51E0",
        "chats-3": "#D2F2EA",
        "chats-3-2": "#43B78D",
        "stiker-1": "#E9F3FF",
        "stiker-2": "#FDCFA4",
        "stiker-3": "#F9E9C3",
        "stiker-4": "#AFEBDB",
        "stiker-5": "#CBF1C2",
        "stiker-6": "#CFCEF9",
        "stiker-7": "#F9E0FD",
      },
    },
  },
  plugins: [],
};
