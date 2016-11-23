/**
 * Gulpfile.
 *
 * Implements:
 * 			1. Sass to CSS conversion + uglify
 * 			2. JS concatenation + uglify
 *      3. Vendor JS concatenation + uglify
 *      4. Images minify
 *      5. Fonts minify
 *      6. TWIG files
 *      7. Drush Cache Rebuild
 *      8. Browser-Sync
 * 			9. Watch files
 *
 * @since 1.0.0
 * @author Blockshot
 */

/**
 * Configuration: Project variables
 *
 * The projectUrl contains the local URL, example.dd:8083.
 */
var project = 'Cangeroes',
  projectUrl = 'http://localhost:8888/cangeroes/',

  styleSrc = 'src/scss/**/*.scss',
  styleDest = 'dist/css',

  jsSrc = 'src/js/*.js',
  jsDest = 'dist/js/',
  jsFile = 'scripts',

  jsVendorSrc = 'src/js/vendors/*.js',
  //jsVendorDest        = 'dist/js/vendors',

  fontSrc = 'src/fonts/**/*.ttf',
  fontDest = 'dist/fonts',

  imgSrc = 'src/img/**/*',
  imgDest = 'dist/img',

  phpSrc = '**/*.php',

  twigSrc = '**/*.twig',

  yamlSrc = '**/*.yml';

themeSrc = '**/*.theme';

/**
 * Configuration: Load plugins
 */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  minifycss = require('gulp-uglifycss'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  rename = require('gulp-rename'),
  cache = require('gulp-cache'),
  fontmin = require('gulp-fontmin'),
  flatten = require('gulp-flatten'),
  imagemin = require('gulp-imagemin'),
  shell = require('gulp-shell'),
  path = require('path');


/**
 * Task: Sass
 */
gulp.task('sass', function() {
  var onError = function(error) {
    notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(styleSrc)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      precision: 10
    }))
    .pipe(sourcemaps.write({
      includeContent: false
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(autoprefixer(
      'last 2 version',
      '> 1%',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(styleDest))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest(styleDest))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(notify({
      title: 'Sass task completed',
      message: 'All Sass files are compiled into CSS and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 1000,
      onLast: true
    }));
});

/**
 * Task: JS
 */
gulp.task('js', function() {
  return gulp.src([jsVendorSrc, jsSrc])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat(jsFile + '.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename({
      basename: jsFile,
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(notify({
      title: 'JS task completed',
      message: 'All JS files are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/js.png'),
      time: 1000,
      onLast: true
    }));
});

/**
 * Task: Flatten
gulp.task('flatten', function() {
  return gulp.src(jsVendorSrc)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
		.pipe(flatten())
		.pipe(gulp.dest(jsVendorDest))
    .pipe(reload({ stream:true, once: true }))
		.pipe(notify({
      title: 'JS Vendors task completed',
      message: 'All vendor files are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/js.png'),
      time: 1000,
      onLast: true
    }));
});
*/

/**
 * Task: IMG
 */
gulp.task('img', function() {
  return gulp.src(imgSrc)
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(imgDest))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(notify({
      title: 'Images task completed',
      message: 'All images are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/img.png'),
      time: 1000,
      onLast: true
    }));
});

/**
 * Task: Font
 */
gulp.task('fontmin', function() {
  return gulp.src(fontSrc)
    .pipe(fontmin())
    .pipe(gulp.dest(fontDest))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(notify({
      title: 'Fonts task completed',
      message: 'All fonts are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/font.png'),
      time: 1000,
      onLast: true
    }));
});

/**
 * Task: TWIG
 */
gulp.task('twig', function() {
  return gulp.src(twigSrc)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(notify({
      title: 'TWIG task completed',
      message: 'All Twig files are saved.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/twig.png'),
      time: 1000,
      onLast: true
    }));
});

/**
 * Task: Drush
 */
gulp.task('drush', shell.task([
  'drush cr'
]));

/**
 * Task: Browser-Sync
 */
gulp.task('browser-sync', function() {
  //
  var files = [
    styleSrc,
    jsSrc,
    imgSrc,
    phpSrc,
    twigSrc,
    themeSrc,
    yamlSrc
  ];

  browserSync.init(files, {
    proxy: projectUrl,
    port: 8888,
    notify: true
  });
});

gulp.task('browsersync-reload', function() {
  reload({
    stream: true,
    once: true
  });
});

/**
 * Task: Watch
 */
gulp.task('watch', function() {
  gulp.watch(styleSrc, ['sass']);
  gulp.watch(jsSrc, ['js']);
  gulp.watch(imgSrc, ['img']);
  gulp.watch([themeSrc, yamlSrc, twigSrc], ['twig']);
  /*gulp.watch([phpSrc, twigSrc], function(event) {
    //console.log(event.path);
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.start('drush');
      gulp.start('twig');
    } else {
      gulp.start('twig');
    }
  });*/
});

gulp.task('watch-sass', function() {
  gulp.watch(styleSrc, ['sass']);
});

gulp.task('default', ['watch']);

//gulp.task('start', ['sass', 'js', 'img', 'twig', 'default'])

gulp.task('saved', ['sass', 'js', 'img', 'twig']);
