/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#9D4EDD',
				'primary-dark': '#6C3299',
				'secondary': '#2EC4B6',
				'secondary-dark': '#259D91',
				'accent': '#FFB627',
				'accent-dark': '#F29D00',
				'text': '#E2E8F0',
				'text-dark': '#1A1A2E',
				'background': '#10002B',
				'background-light': '#240046',
				'card': 'rgba(255, 255, 255, 0.05)',
				'card-hover': 'rgba(255, 255, 255, 0.1)',
			},
			fontFamily: {
				'display': ['Bangers', 'cursive'],
				'body': ['Nunito', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
			},
			boxShadow: {
				'neon': '0 0 5px theme("colors.primary"), 0 0 20px theme("colors.primary")',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			},
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
			},
		},
	},
	plugins: [],
}