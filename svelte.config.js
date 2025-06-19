import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			// So you can import with `from 'components/...'`
			components: 'src/components/',
			assets: 'src/assets',
			utils: 'src/utils'
		}
	},
	preprocess: [],
	extensions: ['.svelte']
};

export default config;
