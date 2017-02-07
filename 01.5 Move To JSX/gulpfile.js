var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');

var buildDir = path.resolve(__dirname, 'assets', 'js');

gulp.task('transpile', function () {
  gulp
    .src(path.resolve(buildDir, '**', '*.jsx'))
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest(buildDir));
});

gulp.task('build:watch', function () {
  gulp.watch(path.resolve(buildDir, '**', '*.jsx'), ['transpile']);
});

gulp.task('default', ['build:watch']);
