var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('jshint'),
    gjshint = require('gulp-jshint'),
    browser = require('browser-sync'),
    pages = require('gulp-gh-pages'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {
    // place code for your default task here
    console.log('Running Default');
});

gulp.task('build', function () {
    
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(pages());
});