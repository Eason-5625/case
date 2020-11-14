const gulp = require('gulp')
const sass = require("gulp-sass");
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify')
const connect = require('gulp-connect')
gulp.task("html",function(){
  return gulp.src("html/*.html")
  .pipe(gulp.dest("dist/html"))
  .pipe(connect.reload());
})
gulp.task("copy",function(){
  return gulp.src("index.html")
  .pipe(gulp.dest("dist/"))
  .pipe(connect.reload());
})
gulp.task("images",function(){
  return gulp.src("images/**/*")
  .pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());
})
gulp.task('scss',function(){
  return gulp.src('css/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename(function(path){
    path.basename = path.basename + '.min'
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload())
})
gulp.task("script",function(){
  return gulp.src('js/*.js')
  .pipe(gulp.dest("dist/js"))
  .pipe(uglify())
  .pipe(rename(function(path){
    path.basename = path.basename + '.min'
  }))
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload())
})
gulp.task("build", ['html', 'copy','images','scss','script'],function(){
  console.log("项目建立成功");
})
gulp.task("watch",function(){
  gulp.watch("html/*.html", ['html']);
  gulp.watch("index.html", ['copy']);
  gulp.watch("images/**/*", ['images']);
  gulp.watch("css/*.scss", ['scss']);
  gulp.watch('js/*.js', ['script']);
})
gulp.task("server",function(){
  connect.server({
    root: 'dist', //服务器根目录
    port: 8686, //配置端口号 0~65535
    livereload: true //启动实时刷新
  })
})
gulp.task("default", ['watch', 'server']);