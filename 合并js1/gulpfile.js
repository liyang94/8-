var gulp = require('gulp');
var browserify = require('browserify');

var source = require('vinyl-source-stream');//转换流的工具
var buffer = require('vinyl-buffer');//转换流的工具

var rev = require('gulp-rev');
var revColl = require('gulp-rev-collector');

gulp.task('module',function(){

    browserify({
        entries:['./entry.js']
    }).bundle()
      .pipe(source('javascript.js'))
      .pipe(buffer())
      .pipe(rev())
      .pipe(gulp.dest('./'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./'))
      
    setTimeout(function() {
        gulp.src(['./index.html','./rev-manifest.json'])  
            .pipe(revColl({
                replaceReved:true
            }))
            .pipe(gulp.dest('./'))    
    }, 300);

})



gulp.task('default',['module'])