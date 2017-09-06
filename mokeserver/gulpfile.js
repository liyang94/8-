var gulp=require('gulp'),
	server=require('gulp-webserver'),
	urlTool=require('url');

	gulp.task('mockServer',function(){
		gulp.src('gulp')
			.pipe(server({
				port:8008,
				middleware:function(req,res,next){
					var method=req.method,
					urlObj=urlTool.parse(req.url,true),
					pathName=urlObj.pathName;

					if(method==="GET"){
						switch(pathName){
							case '/goodlist':
							res.setHeader('Access-Control-Allow-Origin','*')
							// res.setHeader('content-type','apllication/json;charset=utf-8;')
							res.write('{"status":"ok"}')
							res.end()
							break;
							// case:
							// break;
						}
					}else if(method==="POST"){

					}else if(method==="OPTIONS"){

					}else{
						res.end()
					}
				}
			}))
	})

	gulp.task('default',['mockServer'])