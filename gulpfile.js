var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var livescript = require('gulp-livescript');
var plumber = require('gulp-plumber');
var rmrf = require('gulp-rimraf');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

gulp.task('stylus', function() {
  return gulp.src(['src/*.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer('last 3 versions', 'safari > 5', 'ie >= 9'))
    .pipe(gulp.dest('public/'));
});

gulp.task('livescript', function() {
  return gulp.src(['src/*.ls'])
    .pipe(plumber())
    .pipe(livescript())
    .pipe(gulp.dest('public/'));
});

gulp.task('jade', function() {
  return gulp.src(['src/*.jade'])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('public/'));
});

gulp.task('clean', function() {
  return gulp.src(['public/*'], { read: false })
    .pipe(rmrf());
});

gulp.task('copy', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/iscroll/build/iscroll-probe.js'
  ]).pipe(gulp.dest('public/'));
});

gulp.task('watch', ['clean', 'copy'], function() {
  watch({ glob: 'src/*.styl' }, function() { gulp.start('stylus'); });
  watch({ glob: 'src/*.ls' }, function() { gulp.start('livescript'); });
  watch({ glob: 'src/*.jade' }, function() { gulp.start('jade'); });
});

gulp.task('webserver', function() {
  return gulp.src('public/')
    .pipe(webserver({ livereload: true }));
});

gulp.task('default', ['webserver', 'watch']);
