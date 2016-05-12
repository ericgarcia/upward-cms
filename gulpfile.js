var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

var sass = require('gulp-sass');


var paths = {
  'src': [
    './models/**/*.js',
    './routes/**/*.js',
    'keystone.js',
    'package.json'
  ],
  'style': {
    all: './public/styles/**/*.scss',
    output: './public/styles/'
  },
  'react': {
    'src': ['./react/*.js', './react/**/*.js']
  }
};

// gulp lint
gulp.task('lint', function(){
  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
  gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
  gulp.watch(paths.style.all, ['sass']);
});

gulp.task('watch:react', function () {
  gulp.watch(paths.react.src, ['react-dev']);
});

gulp.task('sass', function(){
  gulp.src(paths.style.all)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.style.output));
});

gulp.task('react-dev', function () {
  bundleApp(false);
});

gulp.task('react-deploy', function (){
  bundleApp(true);
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
  'watch:sass',
  'watch:lint',
  'watch:react'
]);

gulp.task('default', ['react-dev','watch', 'runKeystone']);


// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var browserifyDependencies = [
  'react',
  'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './react/app.js',
    debug: true
  })

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
  if (!isProduction && scriptsCount === 1){
    // create vendors.js for dev environment.
    browserify({
      require: browserifyDependencies,
      debug: true
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./public/js/'));
  }
  if (!isProduction){
    // make the dependencies external so they dont get bundled by the
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    browserifyDependencies.forEach(function(dep){
      appBundler.external(dep);
    })
  }

  appBundler
    // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {presets: ["es2015", "react"], sourceMaps: true})
    .bundle()
    .on('error',gutil.log)
    .pipe(source('upward.js'))
    .pipe(gulp.dest('./public/js/'));
}
