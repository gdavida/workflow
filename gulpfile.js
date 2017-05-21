var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

//point all files that exist in the src folder
var SOURCEPATHS = {
  sassSource : 'src/scss/*.scss'
}

// point all files that exist in the apps folder
var APPPATH ={
  root: 'app/',
  css : 'app/css',
  js: 'app/js'

}

// sass task
gulp.task('sass', function(){
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoprefixer())
    // can change output to compressed/nested/compact
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(APPPATH.css));
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
gulp.task('watch', ['serve', 'sass'], function() {
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
});



// when you run the default tasks, the tasks in the square brackets will run
gulp.task('default', ['watch']);
