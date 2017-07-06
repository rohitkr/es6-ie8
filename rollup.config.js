import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';
// import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";
// import nodeResolve from "rollup-plugin-node-resolve";


var babelOptions = {
	runtimeHelpers: false,
	externalHelpers: true,
	exclude: 'node_modules/**', // only transpile our source code
  "plugins": [
    ["transform-es3-member-expression-literals"],
    ["transform-es3-property-literals"],
    ["transform-proto-to-assign"],
    ["external-helpers"],
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


babelOptions = {
  presets: [
    [
      "es2015", {
        "modules": false
      }
    ]
  ],
  babelrc: false,
  exclude: 'node_modules/**'
};



export default {
  	moduleName: 'ES6Module',
  	entry:     'src/main.js',
    dest:       'dist/bundle.js',
  	// sourceMap:  true,
    exports: 'default',
  	format:     'umd',
  	plugins:    [
		  // json(),
    	resolve(),
    	babel(babelOptions),
    	commonjs(),
    	// nodeResolve()
  	],
  	external: ['window', 'document', 'body', 'console']
};

