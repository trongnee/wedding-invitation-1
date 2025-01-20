/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}"
  ],
  safelist: [
    "animate-[fadeIn_3s]",
    "animate-[fadeInLeft_3s]",
    "animate-[slideInUp_5s]",
    "animate-[fadeInLeft_2s]",
    "animate-[fadeInRight_2s]",
    "animate-[fadeIn_2s]",
    "animate-[fadeIn_4s]",
    "animate-[zoomIn_3s]",
    "animate-[fadeInRight_3s]",
    "animate-[pulse_3s_infinite]",
    "animate-[fadeInUp_3s]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

