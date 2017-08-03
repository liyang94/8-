var gulp = require('gulp');
var imagemin = require('gulp-imagemin');//压缩image
//压缩图片
gulp.task('minifyImg',function(){
	gulp.src('./images/*.png')
		.pipe(imagemin())
		.pipe(gulp.dest('./building/images'));
});


var uglify = require('gulp-uglify');//压缩js文件
//压缩js
gulp.task('uglify',function(){
	gulp.src('./js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./building/js'));
});


var htmlmin = require('gulp-htmlmin');//压缩html
//压缩html
gulp.task('TestHtmlmin',function(){

	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	}

	gulp.src('./*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('./building'));
});

minify = require('gulp-clean-css');

//压缩css
gulp.task('clean',function(){
	gulp.src('./css/*.css')
		.pipe(minify())
		.pipe(gulp.dest('./building/css'));
});

gulp.task('default',['minifyImg','uglify','TestHtmlmin','clean'])
