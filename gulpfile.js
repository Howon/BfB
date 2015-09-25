var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	del = require('del'),
    browserify = require('gulp-browserify'),
    react = require('gulp-react');

gulp.task('compile_jsx', function(){
	gulp.src('./scripts/render/components/jsx/*.jsx')  
		.pipe(react())                
		.pipe(gulp.dest('./scripts/render/components/js'));

	gulp.src('./scripts/render/pages/jsx/*.jsx')  
		.pipe(react())                
		.pipe(gulp.dest('./scripts/render/pages/js'));
})

gulp.task('scripts', function () {
    return gulp.src(['./scripts/render/homepage.js'])
    .pipe(browserify({
        debug: true,
        transform: [ 'reactify' ]
    }))
    .pipe(gulp.dest('./public/javascripts/pages/'));
});

gulp.task('default', ['compile_jsx', 'scripts']);