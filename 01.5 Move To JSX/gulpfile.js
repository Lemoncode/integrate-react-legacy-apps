var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

var buildDir = path.resolve(__dirname, 'src');
var distDir = path.resolve(__dirname, 'dist');

gulp.task('transpile', function () {
  return gulp
    .src(path.resolve(buildDir, '**', '*.jsx'))
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest(distDir));
});

gulp.task('copy', function () {
  return gulp
    .src([
      path.resolve(buildDir, '**', '*.css'),
      path.resolve(buildDir, '**', '*.js')
    ])
    .pipe(gulp.dest(distDir))
});

gulp.task('clean', function (done) {
  return del(distDir, done);
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'transpile')));

gulp.task('watch', function () {
  gulp.watch(path.resolve(buildDir, '**', '*.css'), gulp.series('copy'));
  gulp.watch(path.resolve(buildDir, '**', '*.js'), gulp.series('copy'));
  gulp.watch(path.resolve(buildDir, '**', '*.jsx'), gulp.series('transpile'));
});

gulp.task('default', gulp.parallel('build', 'watch'));
