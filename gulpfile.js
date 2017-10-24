/**
 * Created by Drinkins on 24.10.2017.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

const dest = 'public';


gulp.task('build', function(callback) {
    runSequence('JS-concat',
        'JS-babel',
        'JS-uglify', callback);
});


gulp.task('JS-babel', () => {
    return gulp.src(['./'+dest+'/js/**/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(dest+'/js/'));
});

gulp.task('JS-concat', function() {
    return gulp.src(['./src/js/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(dest+'/js/'))
});


gulp.task('JS-uglify', function () {
    return gulp.src(['./'+dest+'/js/bundle.js'])
        .pipe(uglify())
        .pipe(gulp.dest(dest+'/js/'));
});



