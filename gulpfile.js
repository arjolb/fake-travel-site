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
del=require('del');


/* Styles tasks */
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
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
  
  });

/*Watch tasks end*/




/* Svg Sprite */
  var config={
    mode:{
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
  gulp.task('copySpriteCSS',['createSprite'],function(){
    return gulp.src('app/sprite/css/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('app/assets/styles/modules'));
  });

  gulp.task('icons',['createSprite','copySpriteCSS']);
/* Svg Sprite end*/