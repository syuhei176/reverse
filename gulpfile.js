var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    run = require('gulp-run'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass')


gulp.task('webserver', function() {
    gulp.src('exports') 
    .pipe(webserver({
        livereload: true, 
    }));
});

gulp.task('watch',function(){
    gulp.src(['html/**/*.html'], {read : true})
    .pipe(watch())
    .pipe(plumber())
    .pipe(gulp.dest('exports/'))

    gulp.src(['js/**/*.js'], {read : true})
    .pipe(watch())
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('exports/js'))

    gulp.src(['scss/**/*.scss'], {read : true})
    .pipe(watch())
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('exports/css'))

    gulp.src(['js-lib/**/*.js'], {read : true})
    .pipe(watch())
    .pipe(plumber())
    .pipe(gulp.dest('exports/js/lib'))

    gulp.run("webserver");
});


gulp.task('compile',function(){
    gulp.src(['template-html/**/*.html','src/**/*.hx'], {read : false})
    .pipe(run("haxe build.hxml").exec());

    gulp.src(['js/**/*.js'], {read : true})
    .pipe(uglify())
    .pipe(gulp.dest('exports/js'))

    gulp.src(['scss/**/*.scss'], {read : true})
    .pipe(sass())
    .pipe(gulp.dest('exports/css'))

    gulp.src(['js-lib/**/*.js'], {read : true})
    .pipe(gulp.dest('exports/js/lib'))
});




gulp.task('default', ['watch']);
