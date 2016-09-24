var browserify = require("browserify");
var gulp = require("gulp");
var typescript = require("gulp-typescript");
var nodemon = require("nodemon");
var runSequence = require("run-sequence");
var del = require("del");

gulp.task("ts", function() {
  var options = {
    out: 'main.js'
  };
  gulp.src([
        "./public/typescripts/*.ts"
      ])
      .pipe(typescript(options))
      .pipe(gulp.dest('./dest'));
});

gulp.task("watch", function(){
  gulp.watch(
    ["./public/typescripts/*.ts"],
    ["ts"]
  ); 
});

gulp.task("nodemon",function(){
  nodemon({
    script: "./bin/www",
    env: {NODE_ENV: "development"}
  });
});

gulp.task("del", function() {
  return del.sync([
    "./public/javascripts"
  ]);
});

gulp.task("default", ["watch"], function(done){
  return runSequence("del",
    [
      "ts" 
    ],
    "nodemon"
  );
});
