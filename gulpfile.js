let gulp = require('gulp');
let sass = require('gulp-sass');

// Compiling our SASS code and bootstrap's SASS file and injecting the output into src/css folder.
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

// Moving JS dependencies from node_modules to src/js folder
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/js'));
});

// Parameter 1: Task name
// Parameter 2: Gulp series with all functions that will be run by this task.
gulp.task('watch', gulp.series(['sass'], function () {

    // Parameter 1: Files we want to watch
    // Parameter 2: Gulp series with the the tasks we'll run every time the watched files are changed
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
}));

gulp.task('default', gulp.series(['js', 'watch']));