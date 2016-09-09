var gulp         = require('gulp');
var cp           = require('child_process');
var libsass      = require('gulp-sass');
var csso         = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll , ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// compile, prefix and compress styles


gulp.task('styles', function() {
  return gulp.src('_scss/main.scss')
  .pipe(libsass({outputStyle:'expanded'}).on('error', libsass.logError))
  .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false }))
  .pipe(csso())
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.stream())
  .pipe(gulp.dest('./css'));
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/*

//Minify and concatenate custom scripts
gulp.task('scripts1', function(){
  gulp.src(['js/action.js', 'js/cards.js', 'js/footer.js'])
  .pipe(uglify())
  .pipe(concat('custom.min.js'))
  .pipe(gulp.dest('minjs'));
});

//Concatenate all scripts
gulp.task('scripts2', function(){
  gulp.src(['minjs/jquery.min.js', 'minjs/bootstrap.min.js', 'minjs/custom.min.js'])
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('minjs'));
});

*/

 gulp.task('watch', function(){

  gulp.watch(['_scss/**/**/*.scss'], ['styles']);

  gulp.watch(['*.html', '_includes/**/*.html', '_layouts/*.html', '_posts/**/*', 'pages/*.html'], ['jekyll-rebuild']);

 });

gulp.task('default', ['browser-sync', 'watch']);
