import path from 'path';
import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';


const pageList = [
	{ name: 'index', path: '/' },
	{ path: 'examples/hello' },
	{ path: 'examples/geometries' },
	{ path: 'examples/texture' },
	{ path: 'demo/' },
];

const input = {
	...( () => {

		const exEntryList = {};

		pageList.forEach( ( page ) => {

			exEntryList[ page.name || ( page.path.replaceAll( '/', '_' ) ) ] = path.resolve( __dirname, 'src', page.path, 'index.html' );

		} );

		return exEntryList;

	} )(),
};


export default defineConfig( {
	root: 'src',
	publicDir: 'public',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../public/',
		rollupOptions: {
			input,
			output: {
				dir: './public',
			}
		}
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/src" )
		},
	},
	plugins: [
		{
			...glslify( {
				basedir: './src/ts/glsl/',
				transform: [
					[ 'glslify-hex' ],
					[ 'glslify-import' ]
				],
			} ),
			enforce: 'pre'
		}
	]
} );
