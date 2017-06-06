'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

//from eslint tutorial
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint' /* add other tasks */], () => {});
