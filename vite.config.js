import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$lib: '/src/lib',
			$components: '/src/components',
			src: '/src'
		}
	},
	server: {
		fs: { allow: ['..'] }
	}
};

export default config;
