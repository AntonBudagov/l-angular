'use strict'
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    imageop = require('gulp-image-optimization'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    mainBowerFiles = require('gulp-main-bower-files'),
    svgSprite = require("gulp-svg-sprites"),
    browserSync = require('browser-sync').create();

var baseDir    = '';
var outputDir  = baseDir + 'dist';
var baseDirExamples = outputDir + '/examples/';


/*
********************************************************************************
  sass
********************************************************************************
*/
gulp.task('sass', function() {
  return gulp.src('app/sass/*.sass').pipe(sourcemaps.init()).pipe(sass({
    outputStyle: 'expanded'
  }).on('error', notify.onError()))
  .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9')).pipe(sourcemaps.write())
  //.pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(outputDir + '/css'));
});

/*
********************************************************************************
  Concat all js file
********************************************************************************
*/
gulp.task('compress', function (cb) {
  var options = {
    mangle: false,
    compress: false,
    output: { beautify: true }
  }
  pump([
        gulp.src('app/js/*.js'),
        sourcemaps.init(),
        uglify(options),
        concat('base.js'),
        //rename({suffix: '.min'}),
        sourcemaps.write(),
        gulp.dest(outputDir + '/js')
    ],
    cb
  );
});

// layout
gulp.task('layout', function() {
  var jade_tpl = gulp.src('app/index.jade')
      .pipe(jade({
        pretty: true
        }));

  return jade_tpl
      .pipe(gulp.dest(outputDir))
      //.pipe(connect.reload());
});
/*------------------------------------------------------------------------------
  [examples]
------------------------------------------------------------------------------*/

/*
********************************************************************************
  example jade
********************************************************************************
*/
gulp.task('examplesJade', function() {
  return gulp.src('app/examples/**/*.jade')
   .pipe(jade({
    pretty: true
    })).on('error', notify.onError())
   .pipe(gulp.dest(baseDirExamples));
});

/*
********************************************************************************
  example sass
********************************************************************************
*/
gulp.task('examplesSass', function() {
 return gulp.src('app/examples/**/*.sass').pipe(sourcemaps.init()).pipe(sass({
    outputStyle: 'expanded'
  }).on('error', notify.onError()))
  .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9')).pipe(sourcemaps.write())
  //.pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(baseDirExamples));
});

/*
********************************************************************************
  example js
********************************************************************************
*/

gulp.task('examplesJs', function (cb) {
  var options = {
    mangle: false,
    compress: true,
    output: { beautify: false }
  }
  pump([
      gulp.src('app/examples/**/*.js'),
      gulp.dest(baseDirExamples)
    ],
    cb
  );
});

/*********************************************************************************
  server
********************************************************************************
*/
gulp.task('serve', function() {
  browserSync.init({
    server: "dist/"
  });
  return browserSync.watch('dist/').on('change', browserSync.reload);
});


/*gulp.task('jade', function() {
  return gulp.src('app/jade/*.jade').pipe(jade({
    pretty: true
  }).on('error', notify.onError())).pipe(gulp.dest('dist'));
});

*/


/*
********************************************************************************
  create svg file
********************************************************************************
*/
gulp.task('svg', function() {
  var options;
  options = {
    baseSize: 30,
    padding: 5,
    preview: false,
    templates: {
      scss: true
    },
    cssFile: "../app/sass/_sprite.scss"
  };
  return gulp.src('app/svg/**/*.svg')
    .pipe(svgSprite(options))
    .pipe(gulp.dest('dist/images/icons'));
});

/*
********************************************************************************
  compress images file
********************************************************************************
*/
gulp.task('images', function(cb) {
  gulp.src(['app/images/**/*.jpg','app/images/**/*.png'])

  .pipe(imageop({
    plugins: [imageminMozjpeg()],
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('dist/images/upload')).on('end', cb).on('error', cb);
});

/*
********************************************************************************
  copy bower file
********************************************************************************
*/
gulp.task('bower', function() {
  gulp.src('./bower.json').pipe(mainBowerFiles({
    overrides: {
      almond: {
        "ignore": true
      },
      jquery: {
        main: ["./dist/jquery.min.js"]
      },
      bootstrap: {
        main: ["./**/*.min.css"]
      }
    }
  })).pipe(gulp.dest('dist/lib'));
});
/*
********************************************************************************
  watchers
********************************************************************************
*/
gulp.task('watch', function() {
  gulp.watch('app/index.jade', ['layout']);
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/js/*.js', ['compress']);




  gulp.watch(['app/examples/**/*.jade', 'app/layouts/*.jade'], ['examplesJade']);
  gulp.watch('app/examples/**/*.sass', ['examplesSass']);
  gulp.watch('app/examples/**/*.js', ['examplesJs']);
 // gulp.watch('src/examples/**/img/**', ['examplesImg']);

});


gulp.task('compress:pr', function (cb) {
  var options = {
    mangle: true,
    compress: true,
    output: { beautify: false }
  }
  pump([
        gulp.src('app/js/*.js'),
        uglify(options),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  );
});

/*==============================================================================
Build Production
==============================================================================*/
gulp.task('jadeProduction', function() {
  return gulp.src(['app/jade/*.jade', 'app/examples/movingObjects/*.jade']).pipe(jade({
    pretty: false
  }).on('error', notify.onError())).pipe(gulp.dest('build'));
});


gulp.task('sassProduction', function() {
  return gulp.src('app/sass/*.sass').pipe(sass({
    outputStyle: 'compressed'
  }).on('error', notify.onError()))
  .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css'));
});

gulp.task('allCSS', function() {
  return gulp.src(['build/css/**/*.css', 'dist/examples/movingObjects/*.css'])
  .pipe(concatCss('all.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('build/css'));
});

gulp.task('allJS', function(cb) {
      pump([
          gulp.src(['dist/lib/**/*.js', 'dist/js/*.js', 'dist/examples/movingObjects/*.js']),
          uglify(),
          //rename({suffix: '.min'}),
          concat('all.js'),
          gulp.dest('build/js')
      ],
      cb
    )
});



gulp.task('production', ['jadeProduction', 'sassProduction', 'allCSS', 'allJS']);
gulp.task('default', ['layout', 'examplesJade', 'bower', 'sass', 'compress', 'examplesJs', 'examplesSass', 'watch', 'serve']);

