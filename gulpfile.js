const gulp = require("gulp");
const clean = require('gulp-clean');
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();

/** Global Paths **/
const bases = {
	src: './src', dist: './dist',
};

const paths = {
	scripts: ['./src/js/*.js'],
	libs: ['node_modules/jquery/dist/jquery.min.js'],
	sass: ['node_modules/bootstrap/scss/bootstrap.scss', './src/sass/*.scss'],
	html: ['./src/*.html'],
	images: ['./src/images/**/*.*']
   };

/** General Taks **/
gulp.task('clean', () => {
	return gulp.src(bases.dist)
	.pipe(clean());
});

gulp.task('copy',  () => {
	gulp.src(paths.html)
	.pipe(gulp.dest(bases.dist));

	gulp.src(paths.libs)
	.pipe(gulp.dest(bases.dist + "/js"));

	gulp.src(paths.images)
	.pipe(gulp.dest(bases.dist + "/images"));
});

gulp.task('sass', () => {
	return gulp.src(paths.sass)
	.pipe(plumber())
	.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest(bases.dist + '/css'))
	.pipe(browserSync.stream());
});

gulp.task("scripts", function() {
	return gulp.src(paths.scripts)
	.pipe(rename({suffix: ".min"}))
	.pipe(uglify())
	.pipe(gulp.dest(bases.dist + "/js"))
	.pipe(browserSync.stream());
});

gulp.task('server', () =>{
	browserSync.init({
		server: {baseDir: bases.dist}
	});

	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['sass']).on('change', browserSync.reload);
	gulp.watch(paths.html, ['copy']).on('change', browserSync.reload);
})

gulp.task('default', ['copy', 'server', 'scripts', 'sass']);
gulp.task('build', ['clean', 'copy', 'scripts', 'sass']);