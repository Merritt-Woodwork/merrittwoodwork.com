'use strict';
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const size = require('gulp-size');

// 'gulp images' -- optimizes and caches your images
gulp.task('images', () =>
  gulp.src('src/uploads/**/*')
    // .pipe(cache(imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    //   imagemin.jpegtran({progressive: true}),
    //   imagemin.optipng(),
    //   imagemin.svgo({plugins: [{cleanupIDs: false}]})
    // ])))
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe(gulp.dest('src/assets/images')) // for cloud cannon
    .pipe(size({title: 'images'}))
);

// 'gulp uploads' -- copies uploads directory
gulp.task('uploads', () =>
  gulp.src('src/uploads/**/*')
    // .pipe(cache(imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    //   imagemin.jpegtran({progressive: true}),
    //   imagemin.optipng(),
    //   imagemin.svgo({plugins: [{cleanupIDs: false}]})
    // ])))
    .pipe(gulp.dest('.tmp/uploads'))
    .pipe(gulp.dest('src/uploads')) // for cloud cannon
);