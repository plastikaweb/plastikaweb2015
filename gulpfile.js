/* jshint node:true */
'use strict';
// generated on 2015-01-19 using generator-gulp-webapp 0.2.0
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'imagemin-*']
  }),
  config = {
      htmlPath: 'app/*.html',
      tempPath: '.tmp',
      tempStylesPath: '.tmp/styles',
      stylesPath: 'app/styles/**/*.scss',
      scriptsPath: 'app/scripts/**/*.js',
      imagesPath: 'app/assets/images/**/*',
      ngPathJs: 'app/app/**/*.js',
      jsonPath: 'app/data/**/*',
      build: ['jshint', 'html', 'images', 'json', 'angular', 'fonts', 'extras', 'minify', 'htmlpretty']
  };

// STYLES
gulp.task('styles', function () {
    return gulp.src(config.stylesPath)
      .pipe($.plumber())
      .pipe($.rubySass({
          style: 'compressed',
          precision: 10,
          loadPath: 'bower_components',
          compass: true
      }))
      .pipe($.autoprefixer({browsers: ['last 3 versions', 'IE 9']}))
      .pipe(gulp.dest(config.tempStylesPath));
});

// JSHINT
gulp.task('jshint', function () {
    return gulp.src([config.scriptsPath, config.ngPathJs])
      .pipe($.jshint('.jshintrc'))
      .pipe($.jshint.reporter('jshint-stylish'));
});

//NUNJUCKS
gulp.task('views', function () {
    $.nunjucksRender.nunjucks.configure(['app/']);
    return gulp.src(config.htmlPath)
      .pipe($.nunjucksRender())
      .pipe(gulp.dest(config.tempPath));
});

gulp.task('html', ['views', 'styles'], function () {
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});
    return gulp.src(['.tmp/*.html'])
      .pipe(assets)
      .pipe(assets.restore())
      .pipe($.if('*.html', $.useref()))
      .pipe(gulp.dest('dist'));
});

gulp.task('htmlpretty', ['html', 'angular'], function () {
    return gulp.src(['dist/**/*.html'])
      .pipe($.prettify({
          indent_size: 4,
          indent_inner_html: false
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('minify', ['html'], function () {
    // minify all JS & CSS & copy to dist
    var lazypipe = require('lazypipe');
    var cssChannel = lazypipe()
      .pipe($.csso)
      .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts');

    // rename js to umnunified version
    gulp.src(['dist/js/*.js', 'dist/app/*.js'])
      .pipe($.rename(function (path) {
          path.basename = path.basename.replace(/\.min/g, '');
          return path;
      }))
      .pipe(gulp.dest(function(file) {
          return file.base;
      }));

    // now minify JS
    gulp.src(['dist/js/*.js', 'dist/app/*.js'])
      .pipe($.ngAnnotate({
          // true helps add where @ngInject is not used. It infers.
          // Doesn't work with resolve, so we must be explicit there
          add: true
      }))
      .pipe($.uglify())
      .pipe(gulp.dest(function(file) {
          return file.base;
      }));

    // copy unminified CSS and maps
    gulp.src(['.tmp/styles/*.css', '.tmp/styles/skins/*.css'])
      .pipe(gulp.dest('dist/css'));

    // now minify CSS
    gulp.src('dist/css/*.css')
      .pipe(cssChannel())
      .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function () {
    return gulp.src(config.imagesPath)
        // .pipe($.cache($.imagemin({
        //   progressive: true,
        //   interlaced: true
        // })))
      .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('json', function() {
   return gulp.src(config.jsonPath)
     .pipe(gulp.dest('dist/data'));
});

gulp.task('angular', function() {
   return gulp.src('app/app/**/*.html')
     .pipe(gulp.dest('dist/app'));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
      .pipe($.flatten())
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
    gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    })
      .pipe(gulp.dest('dist'));

    // vendor folder
    gulp.src([
        'app/vendor/**/*.*'
    ])
      .pipe(gulp.dest('dist/vendor'));
});

gulp.task('favicons', function () {
    gulp.src('app/layouts/base.html')
      .pipe($.favicons({
          files: {
              src: 'app/assets/images/favicons/favicon.png',
              dest: '../assets/images/favicons',
              iconsPath: 'assets/images/favicons',
              html: 'app/layouts/base.html'
          },
          icons: {
              android: false,            // Create Android homescreen icon. `boolean`
              appleIcon: true,          // Create Apple touch icons. `boolean`
              appleStartup: false,       // Create Apple startup images. `boolean`
              coast: false,              // Create Opera Coast icon. `boolean`
              favicons: true,           // Create regular favicons. `boolean`
              firefox: false,            // Create Firefox OS icons. `boolean`
              opengraph: false,          // Create Facebook OpenGraph. `boolean`
              windows: false,            // Create Windows 8 tiles. `boolean`
              yandex: false              // Create Yandex browser icon. `boolean`
          },
      }))
      .pipe(gulp.dest('app/layouts'));
});
//Clean tp and dist
gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['views', 'styles'], function () {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
      .use(require('connect-livereload')({port: 35729}))
      .use(serveStatic('.tmp'))
      .use(serveStatic('app'))
        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components
      .use('/bower_components', serveStatic('bower_components'))
      .use(serveIndex('app'));

    require('http').createServer(app)
      .listen(9000)
      .on('listening', function () {
          console.log('Started connect web server on http://localhost:9000');
      });
});

gulp.task('serve', ['connect', 'watch'], function () {
    require('opn')('http://localhost:9000/index.html');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
      .pipe(wiredep())
      .pipe(gulp.dest('app/styles'));

    gulp.src('app/layouts/*.html')
      .pipe(wiredep({
          exclude: ['bootstrap-sass-official'],
          ignorePath: /^(\.\.\/)*\.\./
      }))
      .pipe(gulp.dest('app/layouts'));
});

gulp.task('watch', ['connect'], function () {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/app/**/*',
        'app/images/**/*'
    ]).on('change', $.livereload.changed);

    gulp.watch('app/**/*.html', ['views']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('imagemin', function () {
    return gulp.src('app/assets/images/**/*')
      .pipe($.imagemin({
          progressive: true,
          interlaced: true,
          use: [
              $.imageminOptipng(),
              $.imageminPngquant(),
              $.imageminJpegtran()
          ]
      }))
      .pipe(gulp.dest('app/assets/images'))
      .pipe($.debug({title: 'minified'}));
});

gulp.task('standard-build', config.build, function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build', ['clean'], function () {
    gulp.start('standard-build');
});
