const gulp = require('gulp');
const fs = require('fs');
const connect = require('gulp-connect');
const jade = require('gulp-jade');
const rename = require('gulp-rename');

gulp.task('connect', () => {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true,
  });
});

gulp.task('jade', () => {
  gulp.src('jade/*.jade')
    .pipe(jade({
      locals: JSON.parse(fs.readFileSync('./data-source.json', 'utf8')),
    }))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('build/html'))
    .pipe(connect.reload());

  gulp.src('index.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('watch-jade', () => {
  gulp.watch(['**/*.jade'], ['jade']);
});

gulp.task('watch-data-source', () => {
  gulp.watch('data-source.json', ['jade']);
});

gulp.task('copy-js', () => {
  gulp.src(['js/**/*'])
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

gulp.task('watch-js', () => {
  gulp.watch(['js/**/*'], ['copy-js']);
});

gulp.task('watch', ['watch-jade', 'watch-js', 'watch-data-source']);
gulp.task('default', ['jade', 'copy-js', 'connect', 'watch']);
