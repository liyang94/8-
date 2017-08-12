var app = angular.module('app',['ngRoute'])
app.controller('controller',function(){

    })
    .config(function($routeProvider){
        $routeProvider.when('/home',{
            template:'home'
        })
        .when('/about',{
             templateUrl:'./about.html'
        })
        .when('/me',{
             template:'me'
        })
        .otherwise('/home')
    })
    .run(function($rootScope,$location){

        $rootScope.$on('$routeChangeStart',function(event,currentRoute,previousRoute){//页面跳转之前可以做一些预操作

        })
        $rootScope.$on('$routeChangeSuccess',function(event,currentRoute,previousRoute){//比如页面出现后可以查询这个页面的dom并操作它
  
        })
        $rootScope.$on('$routeChangeError',function(event,currentRoute,previousRoute,error){//比如页面跳转失败后可以统一跳转到404页面 说明非常抱歉页面加载失败我们会尽快修复
            // $location.url('/404')
        })

    })