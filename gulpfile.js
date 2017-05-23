var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

//point all files that exist in the src folder
var SOURCEPATHS = {
  sassSource : 'src/scss/*.scss',
  htmlSource: 'src/*.html',
  jsSource: 'src/js/**'
}

// point all files that exist in the apps folder
var APPPATH ={
  root: 'app/',
  css : 'app/css',
  js: 'app/js'

}

//read method reads the file contents, and we only need to read for the name to see if it exists, don't care about contents, then force true to remove
gulp.task('clean-html', function() {
  return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
  .pipe(clean());
});
gulp.task('clean-scripts', function() {
  return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
  .pipe(clean());
});

// sass task
gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    // can change output to compressed/nested/compact
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css));
});

gulp.task('scripts', ['clean-scripts'], function() {
  gulp.src(SOURCEPATHS.jsSource)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(APPPATH.js))
});


// move src (w sass and code and partials) to app for final use
gulp.task('copy', ['clean-html'], function() {
  gulp.src(SOURCEPATHS.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});

// browserSync task, serve sass first
gulp.task('serve', ['sass'], function() {
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server: {
      baseDir: APPPATH.root
    }
  })
});

//watch task to automatically update browser on save
gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'scripts', 'clean-scripts'], function() {
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
  gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
});



// when you run the default tasks, the tasks in the square brackets will run
gulp.task('default', ['watch']);
