var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gulpIf = require('gulp-if');


// sass task
gulp.task('sass-task', function() {
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
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', minifyCSS()))
      // Uglifies only if it's a Javascript file
      .pipe(gulpIf('*.js', uglify()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'))
});






// watch task
gulp.task('watch', ['browserSync', 'sass-task'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass-task']);

  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});