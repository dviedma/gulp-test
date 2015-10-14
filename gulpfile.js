var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


// sass task
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// browser sync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

//html partials
gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('app/*.html')
      .pipe(assets)
      .pipe(gulpIf('*.css', minifyCSS()))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'))
});

//img min
gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
      .pipe(cache(imagemin()))
      .pipe(gulp.dest('dist/images'))
});

//fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'))
})

//del
gulp.task('clean', function() {
  return del('dist');
})



// SERVER
gulp.task('server', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

//BUILD
gulp.task('build', function() {
  runSequence('clean', ['sass', 'useref', 'images', 'fonts']);
});