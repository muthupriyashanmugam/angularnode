
(function () {
    'use strict';
  
    var _ = require('lodash'),
      del = require('del'),
      gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      gulpLoadPlugins = require('gulp-load-plugins'),
      plugins = gulpLoadPlugins();
      var ts = require('gulp-typescript');

  // Set NODE_ENV to 'development'
    gulp.task('env:dev', function () {
      process.env.NODE_ENV = 'development';
    });
  
    // clean the contents of the distribution directory
    gulp.task('clean', function () {
      return del(['public/dist/**/*']);
    });
  
    // copy static assets - i.e. non TypeScript, JS, HTML, CSS, SCSS, JADE compiled source
    gulp.task('copy:assets', function () {
      var allAssets = ['public/**/*.*'];
      _(['.html5', '.jade', '.ts', '.js', '.css', '.scss']).forEach(function (eachAsset) {
        allAssets.push('!' + allAssets[0].toString().replace('.*', eachAsset));
      });
      return gulp.src(allAssets)
        .pipe(gulp.dest('public/dist/build'));
    });

  
    //Run the project in angular2-feature-aurora-ui
    /****************/
    // gulp.task('tscompile:dev', function () {
    //   var tsFiles = plugins.typescript.createProject('tsconfig.json', {
    //     typescript: require('typescript')
    //   });
    //   var devTsAssets = [];
    //   _(['public/**/*.ts']).forEach(function (n) {
    //     devTsAssets.push(n);
    //   });
    //   return gulp
    //     .src(devTsAssets)
    //     .pipe(plugins.plumber())
    //     .pipe(sourcemaps.init())
    //     .pipe(plugins.typescript(tsFiles))
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(plugins.template())
    //     .pipe(gulp.dest('public/dist/app/'));
    // });

    var tsProject = ts.createProject({
        declaration: true
    });
     
    gulp.task('tscompile:dev', function() {
        return gulp.src(['public/*.ts','!node_modules/**'])
            .pipe(tsProject())
            .pipe(gulp.dest('public/dist'));
    });

  
  }());