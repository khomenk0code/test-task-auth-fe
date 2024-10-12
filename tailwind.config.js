module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./styles/**/*.css',
		'./node_modules/@shadcn/ui/**/*.js',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				muted: 'var(--muted)',
			},
		},
	},
	plugins: [],
}
