var gulp        = require('gulp');
 
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
 
 
gulp.task('build', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './src/index.js', debug: true})
        .transform("babelify", {
          "plugins": [
          ["transform-es3-member-expression-literals"],
          ["transform-es3-property-literals"],
          ["transform-proto-to-assign"],
          ["transform-runtime", {
            "helpers": false,
            "polyfill": true,
            "regenerator": false
          }],
          ["add-module-exports"]
          ],
          "presets": [
          ["env", {
            "targets": {
              "browsers": ["> 0.2%"]
            },
            "_modules": false,
            "loose": true
          }]
          ]
          })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./src/js/*.js', ['build']);
});

gulp.task('default', ['watch']);
