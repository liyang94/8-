var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');
gulp.task('fuwu', function () {
    connect.server({
        port: '8080',
        livereload: true
    })
})

gulp.task('hotreload', function () {
    gulp.watch('./index.html', function () {
        gulp.src('.')
            .pipe(connect.reload())
    })

    gulp.watch('./css/style.css', function () {
        gulp.src('.')
            .pipe(connect.reload())
    })

})
gulp.task('default', ['fuwu', 'hotreload'])
