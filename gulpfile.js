'use strict';

const gulp = require('gulp');
const csscompile = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const header = require('gulp-header');
const rename = require('gulp-rename');
const del = require('del');
const browsersync = require('browser-sync').create();

const packageJson = require('./package.json');

const src = './src';
const dist = './dist';

const contributors = (() => {
    if ( typeof packageJson.contributors == "undefined" ) return false;
    let output = '';
    for (let i = 0; i < packageJson.contributors.length; i++) {
        if ( i > 0 ) output += ", ";
        output += packageJson.contributors[i];
    }
    return " * Contributors: " + output;
})();
let banner = [
    "/**",
    " * " + packageJson.name + " v" + packageJson.version,
    " * Author: " + packageJson.author,
    " * License: " + packageJson.license
];
if ( contributors ) banner.push(contributors);
banner.push(" **/", "");
banner = banner.join("\n");

const copyFile = (file) => {
    if (!file) return;

    return gulp.src(file, {base: src})
        .pipe(gulp.dest(dist))
        .on('end', () => console.log(`[${new Date().toTimeString().split(' ')[0]}] Finished 'copyFile' ${file}`) );
};

const isProduction = (process.env.NODE_ENV === 'production') ? true : false;

const clean = () => del(
    [
        dist + '/**/*',
        '!' + dist + '/.git/'
    ],
    {force: true}
);

const html = () => gulp.src(src + '/*.html')
    .pipe(gulp.dest(dist));

function css() {
    const stream = gulp.src(src + '/scss/placeholder-loading.scss')
        .pipe(csscompile())

        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(header(banner))
        .pipe(gulp.dest(dist + '/css/'));

    if (isProduction) {
        stream
            .pipe(postcss([
                autoprefixer(),
                cssnano()
            ]))
            .pipe(header(banner))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dist + '/css/'));
    }

    stream.pipe(browsersync.stream());

    return stream;
}

const serve = () => browsersync.init({
    server: dist,
    notify: false,
    reloadDelay: 500,
    ghostMode: false,
    open: false
});

const watch = () => {
    gulp.watch(src + '/*.html')
        .on('change', copyFile);
    gulp.watch(src + '/scss/**/*')
        .on('change', gulp.series(css));

    gulp.watch(dist + "/*.html")
        .on('change', browsersync.reload);
}



// grouped tasks by use case
const build = gulp.series(clean, html, css);



exports.build = build;
exports.serve = serve;
exports.default = gulp.parallel(
    gulp.series(build, serve),
    watch
);
