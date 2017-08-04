var gulp = require('gulp');
var server = require('gulp-webserver');

var urlTool = require('url')
var qs = require('qs');


var json = [
    {
        name:'麻辣烫',
        price:.1
    },
    {
        name:'烤鱼',
        price:.1
    },{
        name:'宫保鸡丁',
        price:.1
    },
    {
        name:'红烧肉',
        price:.1
    }
]

gulp.task('mockServer',function(){
    gulp.src('gulp')
        .pipe(server({
            port:8008,
            middleware:function(req,res,next){
                res.setHeader('Access-Control-Allow-Origin','*')

                var urlObj =  urlTool.parse(req.url);

                var method = req.method;

                var pathname = urlObj.pathname;

                // var getParam = urlObj.query;

                if(method==="POST"){

                    var postData = '';

                    req.on('data',function(chunk){

                        postData +=chunk;

                    })



                    req.on('end',function(){
                        var postParmas = qs.parse(postData)
                        

                        switch(pathname){
                            case '/goodslist':
                            res.setHeader('content-type','application/json;charset=utf-8')
                            res.write(JSON.stringify(json))
                            res.end()
                            break;
                            default : 
                        }

                        res.end()
                    })

                    
                }

            }
        }))
})


gulp.task('default',['mockServer'])