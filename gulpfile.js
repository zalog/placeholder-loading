'use strict';

const gulp = require('gulp'),
  csscompile = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  del = require('del'),
  browsersync = require('browser-sync').create(),
  gulputil = require('gulp-util'),

  packageJson = require('./package.json'),

  src = './src',
  dist = './dist';

var contributors = (function() {
      if ( typeof packageJson.contributors == "undefined" ) return false;
      let output = '';
      for (let i = 0; i < packageJson.contributors.length; i++) {
        if ( i > 0 ) output += ", ";
        output += packageJson.contributors[i];
      }
      return " * Contributors: " + output;
    })(),
  banner = [
      "/**",
      " * " + packageJson.name + " v" + packageJson.version,
      " * Author: " + packageJson.author,
      " * License: " + packageJson.license
    ];
  if ( contributors ) banner.push(contributors);
  banner.push(" **/", "");
  banner = banner.join("\n");

var copyChanged = function(obj) {
  if ( obj.type === 'changed') {
    return gulp.src(obj.path, {base: src})
      .pipe(gulp.dest(dist))
      .on('end', () => gulputil.log('Finished', "'" + gulputil.colors.cyan('copyChanged') + "'", obj.path) );
  }
};



function clean() {
  return del(
      [
        dist + '/**/*',
        '!' + dist + '/.git/'
      ],
      {force: true}
    );
}

function html() {
  return gulp.src(src + '/*.html')
    .pipe(gulp.dest(dist));
}

function cssCompile() {
  return gulp.src(src + '/scss/placeholder-loading.scss')
    .pipe(csscompile())
    .pipe(gulp.dest(dist + '/css/'))
    .pipe(browsersync.stream());
}

function cssOptimize() {
  return gulp.src(dist + '/css/placeholder-loading.css')
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(header(banner))
    .pipe(gulp.dest(dist + '/css/'))
    // min
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(header(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist + '/css/'));
}

const css = gulp.series(cssCompile, cssOptimize);

function serve() {
  browsersync.init({
    server: dist,
    notify: false,
    reloadDelay: 500,
    ghostMode: false
  });
}

function watch() {
  gulp.watch(src + '/*.html', copyChanged);
  gulp.watch(src + '/scss/**/*', cssCompile);

  gulp.watch(dist + "/*.html").on('change', browsersync.reload);
}



// grouped tasks by use case
const dev = gulp.parallel(html, cssCompile);
const build = gulp.series(clean, html, css);



exports.build = build;
exports.serve = serve;
exports.default = gulp.parallel(
  gulp.series(dev, serve),
  watch
);