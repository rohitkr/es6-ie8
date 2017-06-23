// import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';
// import json from 'rollup-plugin-json';
// import resolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";
// import nodeResolve from "rollup-plugin-node-resolve";


var babelOptions = {
	runtimeHelpers: true,
	externalHelpers: true,
	exclude: 'node_modules/**', // only transpile our source code
  "plugins": [
    ["transform-es3-member-expression-literals"],
    ["transform-es3-property-literals"],
    ["transform-proto-to-assign"],
    ["transform-runtime", {
      "helpers": false,
      "polyfill": true,
      "regenerator": false
    }]
  ],
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["> 0.2%"]
      },
      "modules": false,
      "loose": true
    }]
  ]
}


export default {
  	moduleName: 'thing',
  	entry:      'src/index.js',
    dest:       'dist/bundle.js',
  	sourceMap:  true,
  	format:     'es',
  	plugins:    [
		  // json(),
    	// resolve(),
    	// babel(babelOptions),
    	commonjs(),
    	// nodeResolve()
  	],
  	external: ['window', 'document', 'body', 'console']
};

