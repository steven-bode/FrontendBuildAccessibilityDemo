const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Pfade definieren
const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  }
};

// Sass kompilieren
function styles() {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JavaScript verarbeiten
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// HTML kopieren
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// CSS und JS für Produktion minifizieren
function minifyStyles() {
  return gulp.src('dist/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

function minifyScripts() {
  return gulp.src('dist/js/main.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// BrowserSync Server
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
}

// Dateien überwachen
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
}

// Tasks exportieren
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.serve = gulp.series(gulp.parallel(styles, scripts, html), gulp.parallel(serve, watchFiles));
exports.watch = gulp.parallel(styles, scripts, html, watchFiles);
exports.build = gulp.series(
  gulp.parallel(styles, scripts, html),
  gulp.parallel(minifyStyles, minifyScripts)
);
exports.default = exports.watch; 