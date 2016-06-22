/**
gulp-sourcemaps

npm i gulp gulp-jade gulp-stylus autoprefixer-stylus gulp-postcss gulp-uglify --save-dev

список
npm list --depth=0 -g
npm link browser-sync jeet / unlink
 */

var gulp = require('gulp'),

		jade = require('gulp-jade');

		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer-stylus'),

		uglify = require('gulp-uglify'),

		stylus = require('gulp-stylus'),
		//originalStylus = require('gulp-stylus').stylus,
		//sourcemaps = require('gulp-sourcemaps'),
		jeet = require('jeet'),

		//rigger = require('gulp-rigger'),
		browserSync = require('browser-sync');


function onError(err) {
		var exec = require('child_process').exec;
		exec('afplay ./error_2.mp3');
		//console.log(err.toString());
		console.log(err);
		this.emit("end");
}


// ==  TASKS  ==


gulp.task('compressJS', function() {
  return gulp.src('./app/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});


// JADE
gulp.task('jadeTask', function() {
	// Собираем Jade только в папкax ./app/jade/ исключая файлы с _*
	//gulp.src(['./app/jade/**/*.jade', './app/jade/**/_*.jade'])
	gulp.src('./app/jade/pages/*.jade')
		.pipe(jade())
		.on("error", onError)
		.pipe(gulp.dest('./'));
});

gulp.task('jade-prettyTask', function() {
	gulp.src('./app/jade/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.on("error", onError)
		.pipe(gulp.dest('./build/'));
});




// STYLUS
gulp.task('stylusTask', function() {

		gulp.src('./app/styles/*.styl')
				.pipe(stylus({
						use: [
							jeet(),
							autoprefixer() //{browsers: ['last 1 version']}
						],
						compress: true
				}))
				.on("error", onError)
				.pipe(gulp.dest('./assets/css/'));
});

gulp.task('stylusSourcemapsTask', function() {

		gulp.src('./app/styles/common.styl')
				.pipe(sourcemaps.init())
				.pipe(stylus({

				use: [
				jeet(),
				autoprefixer() //{browsers: ['last 1 version']}
				],
				compress: true
		}))
				.on("error", onError)
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('./assets/css/'));
});

// External sourcemaps
// gulp.task('sourcemaps-external', function () {
//   return gulp.src('./app/styles/sourcemaps-external.styl')
//     .pipe(sourcemaps.init())
//     .pipe(stylus())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./build/css'));
// });
//



// BrowserSync
gulp.task('browserSyncTask', function() {
		browserSync.init(['./*.html', './assets/css/*.css'], {
				server: {
						baseDir: "./"
				}
		});
});


// WATCH
gulp.task('watchTask', function() {
		gulp.watch('./app/jade/**/*.jade', ['jadeTask']);
		gulp.watch('./app/styles/**/*.styl', ['stylusTask']);
		gulp.watch('./app/*.js', ['compressJS']);
});


// DEFAULT
gulp.task('default', ['compressJS', 'jadeTask', 'stylusTask', 'watchTask', 'browserSyncTask']);
//gulp.task('dev', ['jade-prettyTask', 'stylusTask', 'javascriptTask', 'browserSyncTask', 'watchTask']);
