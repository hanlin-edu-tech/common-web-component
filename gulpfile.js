const gulp = require("gulp");
const merge = require('merge-stream');
const uglify = require("gulp-uglify-es").default;

function minifyJS() {
  console.log("=======> minifyJS <=======");

  return function () {
    merge(gulp.src('eventLeftSide/*.js', { base: 'eventLeftSide' }))
      .pipe(
        uglify({ mangle: false }).on("error", function (error) {
          console.log(error);
        })
      )
      .pipe(gulp.dest(function (file) {
        return file.base + "/destination";
      }));
  };
}

gulp.task("minifyJS", minifyJS());