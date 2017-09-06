var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect')
var server = require('./server');

var option = {
    port:8030,
    middleware:function(req,res,next){
        server(req,res,next);
    }
}

gulp.task('httpServer',function(){
    connect.server({
        port:8080,
        livereload:true
    })
})

gulp.task('mockeData',function(){
    gulp.src('gulp')
        .pipe(webserver(option))
})

gulp.task('default',['httpServer','mockeData']);