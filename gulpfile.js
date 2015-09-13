;(function initGulp() {
    var gulp = require('gulp');
    var browserify = require('gulp-browserify');
    var concat = require('gulp-concat');

    gulp.task('browserify', function() {
        gulp.src('src/webApp.js')
            .pipe(browserify({transform: 'reactify'}))
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest('bin'));
    });

    gulp.task('copy', function() {
        gulp.src('src/index.html')
            .pipe(gulp.dest('bin'));
    });

    gulp.task('default',['browserify', 'copy']);

    gulp.task('watch', function() {
        gulp.watch('src/**/*.*', ['default']);
    });
}());