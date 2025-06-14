import { mdsvex } from 'mdsvex';
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
            // So you can import with `from 'components/...'`
            'components': 'src/components/',
			'assets': 'src/assets',
			'utils': 'src/utils'
        }
	},

  out: 'build',
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
