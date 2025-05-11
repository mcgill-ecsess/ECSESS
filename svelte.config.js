import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
            // So you can import with `from 'components/...'`
            'components': 'src/components/',
			'assets': 'src/assets'
        }
	},

	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
