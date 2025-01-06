/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#FF6B6B',
				'primary-dark': '#E85858',
				'secondary': '#4ECDC4',
				'secondary-dark': '#45B7B0',
				'accent': '#FFE66D',
				'text': '#2C3A47',
				'text-light': '#FFFFFF',
				'background': '#F7F9FC',
				'background-light': '#FFFFFF',
			},
			fontFamily: {
				'display': ['Bangers', 'cursive'],
				'body': ['Nunito', 'sans-serif'],
			},
		},
	},
	plugins: [],
}