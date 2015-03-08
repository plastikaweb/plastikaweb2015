/* jshint node:true */
'use strict';
// generated on 2015-01-19 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var minimist = require('minimist')(process.argv.slice(2));

var config = {
  env: minimist.env || 'production'
};

switch(config.env) {
  case 'wordpress':
    config.htmlPath = 'app/wordpress/index.html';
    config.stylesPath = ['app/styles/theme.scss', 'app/styles/bootstrap.scss'];
    config.imagesPath = ['app/assets/images/*.*', 'app/assets/images/*favicons*/*.*'];
    config.build = ['jshint', 'html', 'images', 'fonts', 'minify', 'wpextras', 'htmlpretty'];
  break;
  case 'production':
  default:
    config.htmlPath = 'app/*.html';
    config.jsAngularPath = 'app/ng/**/*.js';
    config.stylesPath = 'app/styles/**/*.scss';
    config.imagesPath = 'app/assets/images/**/*';
    config.build = ['ngAnnotate', 'jshint', 'html', 'images', 'fonts', 'extras', 'minify', 'htmlpretty'];
  break;
}



gulp.task('ngAnnotate', function() {
  return gulp.src(config.jsAngularPath)
    .pipe($.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(gulp.dest('app/ng/'));
});

gulp.task('styles', function () {
  return gulp.src(config.stylesPath)
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: 'bower_components',
      compass: true
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('views', function () {
  $.nunjucksRender.nunjucks.configure(['app/']);

  return gulp.src(config.htmlPath)
    .pipe($.nunjucksRender())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['views', 'styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});
  return gulp.src(['.tmp/*.html'])
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.if('*.html',$.useref()))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlpretty', ['html'], function() {
  return gulp.src(['dist/*.html'])
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
  .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');

  // rename js to umnunified version
  gulp.src('dist/assets/js/*.js')
    .pipe($.rename(function(path) {
      path.basename = path.basename.replace(/\.min/g, '');
      return path;
    }))
    .pipe(gulp.dest('dist/assets/js'));

  // now minify JS
  gulp.src('dist/assets/js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/assets/js'));

  // copy unminified CSS and maps
  gulp.src('.tmp/styles/*.css')
    .pipe(gulp.dest('dist/assets/css'));

  // now minify CSS
  gulp.src('dist/assets/css/*.css')
    .pipe(cssChannel())
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('images', function () {
  return gulp.src(config.imagesPath)
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/assets/fonts'));
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

gulp.task('wpextras', function () {
  gulp.src([
    'app/styles/theme/_skin.scss',
    'app/styles/theme/_compass-mixins.scss',
    'app/styles/bootstrap/_oxygenna-variables.scss',
  ], {
    base: 'app/styles'
  })
  .pipe(gulp.dest('dist/assets/scss'));


  gulp.src('bower_components/compass-mixins/lib/compass/**/*', {
    base: 'bower_components/compass-mixins/lib/'
  })
  .pipe(gulp.dest('dist/assets/scss'));
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

gulp.task('demo', ['clean'], function () {
  gulp.start('standard-build');
});
