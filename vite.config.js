import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],

	// Optimize dependency pre-bundling
	optimizeDeps: {
		include: [
			'@portabletext/svelte',
			'@lucide/svelte',
			'@skeletonlabs/skeleton-svelte',
			'@sanity/client'
		],
		// Force pre-bundle these dependencies
		force: false
	},

	// Build optimizations
	build: {
		target: 'esnext',
		minify: 'esbuild',
		cssMinify: true
	},

	// Server optimizations for dev
	server: {
		warmup: {
			// Pre-transform commonly used files
			clientFiles: ['./src/routes/+layout.svelte']
		}
	},

	// Resolve optimizations
	resolve: {
		dedupe: ['svelte']
	}
});
