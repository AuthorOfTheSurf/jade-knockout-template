const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const connect = require('gulp-connect');
const jade = require('gulp-jade');
const rename = require('gulp-rename');
const data = require('gulp-data');

const parseJSONData = (file) => {
  const dataFilePath = `./data/${path.basename(file.path, '.jade')}.json`;
  // Check for corresponding data file, create if it DNE.
  try {
    fs.accessSync(dataFilePath, fs.F_OK);
  } catch(e) {
    fs.writeFileSync(dataFilePath, '{}', 'utf8');
  }

  return JSON.parse(fs.readFileSync(`./data/${path.basename(file.path, '.jade')}.json`, 'utf8'))
};

gulp.task('connect', () => {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true,
  });
});

gulp.task('jade', () => {
  gulp.src('jade/*.jade')
    .pipe(data(parseJSONData))
    .pipe(jade())
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('build/html'))
    .pipe(connect.reload());

  gulp.src('index.jade')
    .pipe(data(parseJSONData))
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('watch-jade', () => {
  gulp.watch(['**/*.jade'], ['jade']);
});

gulp.task('watch-data', () => {
  gulp.watch('data/**', ['jade']);
});

gulp.task('copy-js', () => {
  gulp.src(['js/**/*'])
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

gulp.task('watch-js', () => {
  gulp.watch(['js/**/*'], ['copy-js']);
});

gulp.task('watch', ['watch-jade', 'watch-js', 'watch-data']);
gulp.task('default', ['jade', 'copy-js', 'connect', 'watch']);
