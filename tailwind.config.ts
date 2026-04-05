import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;
const { parseColor } = require("tailwindcss/lib/util/color");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        red: {
          1: "#ff855a",
          2: "#f95426",
          3: "#d2391a",
          4: "#ab1d0e",
          5: "#840202",
        },
        brown: {
          1: "#f4d376",
          2: "#ffc152",
          3: "#eda537",
          4: "#db8a1b",
          5: "#c96e00",
        },
        teal: {
          1: "#0498a0",
          2: "#018391",
          3: "#046977",
          4: "#074f5e",
          5: "#0a3544",
        },
        blue: {
          1: "#79cad8",
          2: "#55b7cc",
          3: "#3997b1",
          4: "#1d7797",
          5: "#01577c",
        },
        navy: "#021b41",
        oren: "#ea660c",
        cream: "#f4e3cb",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textShadow: {
        xs: "1px 1px 0px rgba(0, 0, 0, 0.5), -0.625px -0.625px 0px rgba(0, 0, 0, 0.5), -0.625px 0.625px 0px rgba(0, 0, 0, 0.5), 0.625px -0.625px 0px rgba(0, 0, 0, 0.5)",
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT:
          "3px 3px 0px rgba(0, 0, 0, 0.5), -2px -2px 0px rgba(0, 0, 0, 0.5), -2px 2px 0px rgba(0, 0, 0, 0.5), 2px -2px 0px rgba(0, 0, 0, 0.5)",
        md: '4px 4px 4px rgba(0, 0, 0, 0.5)',
        blurMd: "4px 4px 2px rgba(0, 0, 0, 0.5)",
        lg: '0 4px 8px rgba(0, 0, 0, 0.5)',
        xl: "8px 8px 0px rgba(0, 0, 0, 0.5), -5.5px -5.5px 0px rgba(0, 0, 0, 0.5), -5.5px 5.5px 0px rgba(0, 0, 0, 0.5), 5.5px -5.5px 0px rgba(0, 0, 0, 0.5)",
      },
      textStrokeWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      backgroundSize: {
        '150': '150%',
        '200': '200%',
        '500': '500%',
        '1000':'1000%',
        '2000':'2000%',
      },
      textStrokeColor: (theme: Function) => theme("colors"),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("autoprefixer"),
    plugin(
      ({
        matchUtilities,
        theme,
      }: {
        matchUtilities: Function;
        theme: Function;
      }) => {
        matchUtilities(
          {
            "text-shadow": (value: string) => ({
              textShadow: value,
            }),
          },
          { values: theme("textShadow") },
        );
      },
    ),
    plugin(
      ({
        matchUtilities,
        theme,
      }: {
        matchUtilities: Function;
        theme: Function;
      }) => {
        matchUtilities(
          {
            "text-stroke-width": (value: string) => ({
              WebkitTextStrokeWidth: value,
              textStrokeWidth: value,
            }),
          },
          { values: theme("textStrokeWidth") },
        );
      },
    ),
    plugin(
      ({
        matchUtilities,
        theme,
      }: {
        matchUtilities: Function;
        theme: Function;
      }) => {
        matchUtilities(
          {
            "text-stroke-color": (value: string) => ({
              WebkitTextStrokeColor: value,
              textStrokeColor: value,
            }),
          },
          {
            values: flattenColorPalette(theme("colors")),
          },
        );
      },
    ),
    plugin(({ addUtilities }: { addUtilities: Function }) => {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
} satisfies Config;

export default config;
