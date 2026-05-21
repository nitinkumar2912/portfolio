/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(59, 130, 246, 0.18)",
        soft: "0 18px 60px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease both",
        "soft-pulse": "softPulse 7s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: 0.55 },
          "50%": { opacity: 0.85 },
        },
      },
    },
  },
  plugins: [],
};
