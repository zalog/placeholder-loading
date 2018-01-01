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



gulp.task('clean', function() {
  return del(
      [
        dist + '/**/*',
        '!' + dist + '/.git/'
      ],
      {force: true}
    );
});

gulp.task('html', function() {
  return gulp.src(src + '/*.html')
    .pipe(gulp.dest(dist));
});

gulp.task('css-compile', function() {
  return gulp.src(src + '/scss/placeholder-loading.scss')
    .pipe(csscompile())
    .pipe(gulp.dest(dist + '/css/'))
    .pipe(browsersync.stream());
});

gulp.task('css', ['css-compile'], function() {
  return gulp.src(dist + '/css/placeholder-loading.css')
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']})
    ]))
    .pipe(header(banner))
    .pipe(gulp.dest(dist + '/css/'))
    // min
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']}),
      cssnano()
    ]))
    .pipe(header(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist + '/css/'));
});

gulp.task('serve', function() {
  return browsersync.init({
    server: dist,
    notify: false,
    reloadDelay: 500,
    ghostMode: false
  });
});

gulp.task('watch', function() {
  gulp.watch(src + '/*.html', copyChanged);
  gulp.watch(src + '/scss/**/*', ['css-compile']);

  gulp.watch(dist + "/*.html").on('change', browsersync.reload);
});



gulp.task('dev', ['html', 'css-compile']);
gulp.task('dist', ['clean'], function() {
  gulp.start(['html', 'css']);
});

gulp.task('default', ['dev', 'serve'], function() {
  gulp.start(['watch']);
});
