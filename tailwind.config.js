export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.8s ease-out",

        float: "float 3s ease-in-out infinite",

        gradient: "gradient 8s ease infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },

        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },

        gradient: {
          "0%,100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(40deg)" },
        },
      },
    },
  },

  plugins: [],
};
