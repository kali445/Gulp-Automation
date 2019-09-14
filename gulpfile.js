'use strict';

//MODULES
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourceMap = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

// GULP TASKS ARE LISTED HERE
gulp.task('sass', function() {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sourceMap.init())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourceMap.write())
        .pipe(gulp.dest('./public/css'));
});

// LIVE RELOAD HTML SITE
gulp.task('html', function(done) {
    browserSync.reload();
    done();
});


// GULP WATCH
gulp.task('watch', function() {

    // INITIALIZATION OF BROWSERSYNC
    browserSync.init({
        server: "./public",
        notify: false,
        ghostMode: false
    });
    
    gulp.watch('./public/sass/**/*.scss', gulp.parallel('waitForStyles'));

    gulp.watch('./public/**/*.html', gulp.parallel('html'));

    gulp.watch('./public/javascript/**/*.js', gulp.parallel('javascript'));
});


gulp.task('waitForStyles', gulp.series('sass', function() {
    return gulp.src('./public/css/main.css')
        .pipe(browserSync.stream());
}))

gulp.task('javascript', function(done) {
    browserSync.reload();
    done();
})