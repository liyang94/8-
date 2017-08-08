var app = angular.module('app',[]);

    app.run(function($rootScope){
       
    })

    app.controller('controller',function($scope,http){//注入我们的自定义服务


        $scope.data = http.getData()//调用自定义服务

        console.log($scope.data);//查看结果

    })

    app.controller('controllerB',function(http){//注入我们的自定义服务

    })
    
    app.service('http',function($http,$q){//service 是angular 的五大服务之一 它是一个构造函数

        var _this = this;

        this.url = 'http://localhost:8030/tab';
        this.method = "GET";

        this.setUrl = function(url){
            this.url = url
        }

        this.getData =function(url,method,parmas){

            url ? _this.url = url : '';

            method ? _this.method = method : '';

            var defer = $q.defer();

            $http({
                url:_this.url,
                method:_this.method,
                data:parmas
            }).then(function(result){
                defer.resolve(result.data);//告诉promise请求数据成功 把成功的信息带出去
            },function(error){
                defer.reject(error);//告诉promise请求数据失败 把失败的信息带出去
            })

            return defer.promise.$$state //返回一个promise 的结果
        }


    })