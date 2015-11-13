var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var watchify = require('watchify');
//var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


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

//minify CSS
gulp.task('minifyCSS', function(){
  return gulp.src('app/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

//uglify JS
gulp.task('uglifyJS', function(){
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
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

//browserify
gulp.task('browserify', function() {
    return browserify('app/js/app.js').bundle()
        .pipe(source('app.browserified.js'))
        .pipe(buffer())
        .pipe(gulp.dest('app/js'));
});


// SERVER
var jsFiles = ['app/js/**/*.js', '!app/js/app.browserified.js'];
gulp.task('server', ['browserSync', 'browserify', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch('app/js/app.browserified.js', browserSync.reload);
});

//BUILD
gulp.task('build', function() {
  runSequence('clean', ['browserify', 'sass', 'minifyCSS', 'uglifyJS', 'images', 'fonts']);
});

//gulp.task('build', ['browserify', 'compass', 'images']);
//gulp.task('default', ['build', 'watch', 'serve', 'open']);