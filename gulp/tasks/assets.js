'use strict';
const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const gulp = require('gulp');
const gzip = require('gulp-gzip');
const newer = require('gulp-newer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const when = require('gulp-if');

// 'gulp scripts' -- creates a index.js file from your JavaScript files and
// creates a Sourcemap for it
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
// minifies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('scripts', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/plyr/dist/plyr.js',
    'src/assets/javascript/kibo.js',
    'src/assets/javascript/smooth-scroll.js',
    'src/assets/javascript/imagesloaded.js',
    'src/assets/javascript/remodal-custom.js',
    'node_modules/imgix.js/dist/imgix.js',
    'src/assets/javascript/classie.js',
    'src/assets/javascript/aos.js',
    'src/assets/javascript/rellax.js',
    'src/assets/javascript/fastclick.js',
    'src/assets/javascript/enquire.js',
    'src/assets/javascript/isotope.pkgd.js',
    'src/assets/javascript/modernizr.js',
    'src/assets/javascript/main.js'
  ])
    .pipe(newer('.tmp/assets/javascript/index.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.dev, rename({suffix: '.min'})))
    .pipe(when(argv.dev, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.dev, size({
      showFiles: true
    })))
    // we want link to always be the same
    // .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/javascript')))
    .pipe(when(argv.prod, when('*.js', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(when(argv.dev, gulp.dest('.tmp/assets/javascript')))
    .pipe(when(argv.dev, when('*.js', gzip({append: true}))))
    .pipe(when(argv.dev, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/javascript'))
    .pipe(gulp.dest('src/assets/javascript')) // for cloud cannon

);

// 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
// creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
// then minwhenies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('styles', () =>
  gulp.src('src/assets/scss/style.scss')
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano(),
    ]))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.dev, rename({suffix: '.min'})))
    .pipe(size({
      showFiles: true
    }))
    // we want link to always be the same
    // .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/stylesheets')))
    .pipe(when(argv.prod, when('*.css', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(when(argv.dev, gulp.dest('.tmp/assets/stylesheets')))
    .pipe(when(argv.dev, when('*.css', gzip({append: true}))))
    .pipe(when(argv.dev, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe(gulp.dest('src/assets/stylesheets')) // for cloudcannon
    .pipe(when(!argv.prod, browserSync.stream()))
);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them when needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    open: false,
    server: ['.tmp', 'dist']
  });
  done();

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('build:site', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
  gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts', reload));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/uploads/**/*', gulp.series('images', reload));
});
