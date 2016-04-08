var gulp = require("gulp");

var cleanCSS = require("gulp-clean-css");

var uglify = require("gulp-uglify");

var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");

// var htmlmin = require("gulp-htmlmin");

gulp.task("minify-css", function(){
  return gulp.src("gulpcss/*.css")
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(gulp.dest("css"));
});

gulp.task("compress", function(){
  return gulp.src("gulpjs/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("js"));
});

// gulp.task("minifyhtml", function(){
//   return gulp.src("_site/**/*.html")
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest("_site"));
// });

gulp.task("compressimage", function(){
  return gulp.src("images/*")
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest("images"));
});

gulp.task("watch", function(){
  gulp.watch("gulpcss/*.css", ["minify-css"]);
  gulp.watch("gulpjs/*.js", ["compress"]);
  gulp.watch("images/*", ["compressimage"]);
  // gulp.watch("_site/**/*.html", ["minifyhtml"]);
});

gulp.task("default", ['minify-css', "compress", "compressimage", 'watch']);
