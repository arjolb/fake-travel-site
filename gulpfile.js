var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create()
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins=require('postcss-mixins'),
svgSprite=require('gulp-svg-sprite'),
rename=require('gulp-rename'),
del=require('del'),
hexrgba=require('postcss-hexrgba'),
webpack=require('webpack'),
svg2png=require('gulp-svg2png'),
modernizr=require('gulp-modernizr'),
imagemin=require('gulp-imagemin')
usemin=require('gulp-usemin'),
rev=require('gulp-rev'),
uglify=require('gulp-uglify'),
cssnano=require('gulp-cssnano'),
htmlmin = require('gulp-htmlmin'),
cleanCss = require('gulp-clean-css');

/* Styles tasks */
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested,hexrgba, autoprefixer]))
  .on('error',function (e) {  
        console.log(e.toString());
    })
    .pipe(gulp.dest('./app/css'));
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/css/styles.css')
      .pipe(browserSync.stream());
  });
/*Styles task* end/

/*Watch tasks*/
gulp.task('watch', function() {

    browserSync.init({
      notify: false,
      server: {
        baseDir: "app"
      }
    });
  
    watch('./app/index.html', function() {
      browserSync.reload();
    });
  
    watch('./app/assets/styles/**/*.css', function() {
      gulp.start('cssInject');
    });
  
    watch('./app/assets/scripts/**/*.js',function(){
      gulp.start('scriptsRefresh');
    });
  });

/*Watch tasks end*/




/* Svg Sprite */
  var config={
    shape:{
      spacing:{
        padding:1
      }
    },
    mode:{
      variables:{
          replaceSvgWithPng: function () {
            return function (sprite,render) { 
              return render(sprite).split('.spg').join('.png');
             }
          }
      },
      css:{
        render:{
          css:{
            template: 'templates/sprite.css'
          }
        }
      }
    }
  }
  gulp.task('createSprite',function(){
    return gulp.src('app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('app/sprite'));
  });

  gulp.task('createPngCopy',['createSprite'],function(){
    return gulp.src("./app/sprite/css/svg/*.svg")
    .pipe(svg2png())
    .pipe(gulp.dest("./app/sprite/css/svg"));
  });

  gulp.task('copySpriteCSS',['createSprite'],function(){
    return gulp.src('app/sprite/css/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('app/assets/styles/modules'));
  });

  gulp.task('icons',['createSprite','createPngCopy','copySpriteCSS']);
/* Svg Sprite end*/

/* Scripts tasks*/
  gulp.task('scripts',function(){
    webpack(require('./webpack.config.js'),function(error,stats){
      if (error) {
        console.log(error.toString());
      }
      console.log(stats.toString());
    });
  });
  gulp.task('scriptsRefresh',['scripts'],function(){
    browserSync.reload();
  });
/* Scripts tasks end */



/* Modernizr */
  gulp.task('modernizr',function(){
    return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
  .pipe(modernizr({
    "options":[
      "setClasses"
    ]
  }))
  .pipe(gulp.dest('./app/assets/scripts/modules'));
  });
  
/* Modernizr end */


/* Build Task */

  gulp.task('optimizeImages',function () { 
    return gulp.src(['./app/assets/images/**/*','!./app/assets/images/icons',
    '!./app/assets/images/icons/*','./app/sprite/css/svg/*'])
    .pipe(imagemin({
      progressive:true,
      interlaced:true,
      multipass:true
    }))
    .pipe(gulp.dest("./dist/assets/images"));
   });

   gulp.task('usemin', function() {
    return gulp.src('./app/*.html')
      .pipe(usemin({
        css: [ rev() ],
        html: [ htmlmin({ collapseWhitespace: true }) ],
        js: [ uglify(), rev() ],
        inlinejs: [ uglify() ],
        inlinecss: [ cleanCss(), 'concat' ]
      }))
      .pipe(gulp.dest('dist'));
  });
   
  gulp.task('build',['optimizeImages','usemin']);