import colors from "tailwindcss/colors";

const customColors   = {  'rhino': {
    DEFAULT: '#2c395b',
    '50': '#f4f5f7',
    '100': '#eaebef',
    '200': '#caced6',
    '300': '#abb0bd',
    '400': '#6b748c',
    '500': '#2c395b',
    '600': '#283352',
    '700': '#212b44',
    '800': '#1a2237',
    '900': '#161c2d'
},
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
			"./index.html",
			"./src/**/*.{vue,js,ts,jsx,tsx}",
			"./node_modules/atmosphere-ui/**/*.{vue,js,ts}",
	],
  theme: {
    extend: {
			colors: {
				primary: colors.green[500],
        "secondary": "#95b3f9",
        "accent": "#7c5bbf",
        "neutral": "#232130",
        "base-deep-1": customColors.rhino[800],
        base: customColors.rhino[900],
        "base-lvl-1": customColors.rhino[800],
        "base-lvl-2": customColors.rhino[700],
        "base-lvl-3": customColors.rhino[600],
        info: "#3D68F5",
        success: "#79E7AE",
        warning: "#D39E17",
        error: "#F61909",
        "body": "white",
        "body-1": colors.slate[200]
			}
		},
  },
  plugins: [],
}

