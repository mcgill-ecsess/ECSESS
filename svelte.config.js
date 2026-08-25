import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			assets: 'src/assets'
		}
	},
	preprocess: [],

	compilerOptions: {
		runes: true
	}
};

export default config;
