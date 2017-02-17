var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var BUILD_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

gulp.task('transpile', function () {
  return gulp
    .src(path.resolve(BUILD_DIR, '**', '*.jsx'))
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy', function () {
  return gulp
    .src([
      path.resolve(BUILD_DIR, '**', '*.css'),
      path.resolve(BUILD_DIR, '**', '*.js')
    ])
    .pipe(gulp.dest(DIST_DIR))
});

gulp.task('clean', function () {
  return del(DIST_DIR);
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'transpile')));

gulp.task('watch', function () {
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.css'), gulp.series('copy'));
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.js'), gulp.series('copy'));
  gulp.watch(path.resolve(BUILD_DIR, '**', '*.jsx'), gulp.series('transpile'));
});

gulp.task('default', gulp.parallel('build', 'watch'));
