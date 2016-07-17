"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('jshint'),
    gjshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    browser = require('browser-sync'),
    git = require('gulp-git'),
    pages = require('gulp-gh-pages');

gulp.task('css', function () {
    // Copy CSS files to a different folder
    gulp.src('./src/css/style.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(git.add())
        .pipe(git.status());
});

// GIT Working tree status
gulp.task('status', function(){
    git.status({args: '--porcelain'}, function (err, stdout) {
        if (err) throw err;
    });
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(pages());
});

gulp.task('build', function () {
    
});

gulp.task('default', ['css'], function() {
    gulp.watch('src/css/style.css', ['css'])
});

