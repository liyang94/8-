var dataBase = require('./DB_server');
var urlTool = require('url')



function queryAccount(account){
    var result = false;
    var data = dataBase.users;
    for(var i = 0,length = data.length; i<length ; i++){
        if(account === data[i].account){
            result = true;
        }
    }
    return result;
}

function login(account,password){
    var result = false;
    var data = dataBase.users;
    for(var i = 0,length = data.length; i<length ; i++){
        if(account === data[i].account && password===data[i].password){
            result = true;
        }
    }    
    return result;
}
 

function server(req,res,next){

      
    var method = req.method,
        urlObj = urlTool.parse(req.url,true),
        pathName = urlObj.pathname;
        if ( method === "GET" ) {
            res.setHeader('Access-Control-Allow-Origin','*')
            switch(pathName){
                case '/index':
                res.setHeader('content-type','text/html;charset="utf-8"');
                res.write(dataBase['主页']);
                res.end();
                break;
                case '/me':
                res.setHeader('content-type','application/json;charset="utf-8"');
                res.write(JSON.stringify(dataBase['我的']));
                res.end();
                break;     
                case '/tab': 
                res.setHeader('content-type','application/json;charset="utf-8"');
                res.write(JSON.stringify(dataBase['dataList']));
                res.end();                
                break;        
                default :
                res.setHeader('content-type','text/html;charset="utf-8"');
                res.write(dataBase['默认']);
                res.end();               
            }

        } else if ( method === "POST" ) {
            res.setHeader('Access-Control-Allow-Origin','*')

            var postData = '';

            req.on('data',function(chunk){
                postData+=chunk;
            })

            req.on('end',function(){

                    if(postData.indexOf('{')!==-1){
                        var params = JSON.parse(postData);
                    } else {
                        var params= {};
                        var arr = postData.split('&');
                        for(var i=0; i<arr.length; i++){
                            var itemArr = arr[i].split('=');
                            params[itemArr[0]] = itemArr[1]
                        }
                    }

                console.log(params);
                switch(pathName){
                    case '/register':
                        var ok = true;
                        for(var i=0; i<dataBase.users.length; i++){
                            if(dataBase.users[i].account === String(params.account)){
                                    ok = false;
                                    break;
                            }
                        }
                        if(ok){
                            var userId = String(dataBase.users.length+1);
                            switch(userId.length){
                                case 1:
                                    userId = '00'+userId;
                                break;
                                case 2:
                                    userId = '0'+userId;
                                break;
                                default :
                            }
                            dataBase.users.push({
                                                    userID:userId,
                                                    account:String(params.account),
                                                    password:String(params.password)
                                                })
                            res.setHeader('content-type','application/json')
                            res.write('{"state":"1","msg":"注册成功"}');
                            res.end();
                        }else{
                            res.setHeader('content-type','application/json')
                            res.write('{"state":"0","msg":"账号已存在"}');
                            res.end();
                        }
                        

                    break;
                    case '/login':
                        var exist = queryAccount(params.account);
                        if(exist){
                        var success = login(String(params.account),String(params.password))
                        if(success){
                            res.write('{"state":"1"}')
                        }else{
                            res.write('{"state":"0"}')
                        }
                        }else{
                            res.write('{"state":"-1"}')
                        }
                        res.end();
                    break;
                    case '/history':
                        console.log('收到history');
                        var userHistoryArray = dataBase['history']
                        userHistoryArray.forEach(function(value,index){
                           if( value.userId == params.userId ){

                                var numPrepage = params.showPage
                                var currentPage = params.currentPage
                                console.log((currentPage-1)*numPrepage,numPrepage);
                                var arr = value.data.slice((currentPage-1)*numPrepage,currentPage*numPrepage);
                                console.log(arr);
                                var page = Math.ceil(value.data.length/numPrepage); 
                                var result = {
                                    data:arr,
                                    page:page
                                }
                                res.write(JSON.stringify(result));

                           }
                        })
                        res.end();
                    break;
                    case '/stuMsg':
                    
                    break;
                    case '/register':

                    break;

                    default :
                }


            })


            // res.end();
        } else if ( method === "OPTIONS" ) {

            console.log("OPTIONS")
            res.writeHead(200,{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            });            
            res.end();
        }

}

module.exports = server;