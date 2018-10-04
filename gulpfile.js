const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const uglify = require('gulp-uglify');
const filter = require('gulp-filter');
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');

gulp.task('build-clean', function () {
  del([
    './dist/**/*'
  ]);
});

gulp.task('build-scripts', function () {
  return gulp.src([
    './source/scripts/**.js'
  ])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
})

gulp.task('build-styles', function () {
  return gulp.src([
    './source/styles/**/*.scss',
    './source/styles/**/*.css'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('copy-libs', function () {

  var filterJsCss = filter(['**/*.js', '**/*.css']);

  return gulp.src([
    './source/libs/**/*'
  ])
    .pipe(filterJsCss)
    .pipe(gulp.dest('./dist/libs'));
});

gulp.task('build', function () {
  runSequence('build-clean', ['build-styles', 'build-scripts', 'copy-libs'], function (error) {
    if (error) {
      console.error(error);
    }
    else {
      console.log('Build completed successfully.');
    }
  });
});

gulp.task('default', ['build'], function(){
  gulp.watch('./source/**/*.js', ['build-scripts']);
  gulp.watch('./source/**/*.scss', ['build-styles']);
});
