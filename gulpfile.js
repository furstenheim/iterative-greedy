var gulp = require('gulp')
var mocha = require('gulp-spawn-mocha')

gulp.task('test', function () {
  gulp
    .src('test/test.js')
    .pipe(mocha().on('error', console.error))
})

gulp.task('watch', function () {
  gulp.watch(['index.js', 'test/*.*'], ['test'])
})

gulp.task('default', ['test', 'watch'])