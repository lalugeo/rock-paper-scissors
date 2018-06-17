const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const jsdoc = require('gulp-jsdoc3');
const jsdocCfg = require('./jsdocConfig.json');

gulp.task('linting', () => gulp.src('./**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('unit-testing', () => gulp.src('./test/**/*.js', { read: false })
  .pipe(mocha({ reporter: 'nyan' })));

gulp.task('documentation', () => {
  gulp.src(['./lib/**/*.js'], { read: false })
    .pipe(jsdoc(jsdocCfg));
});
