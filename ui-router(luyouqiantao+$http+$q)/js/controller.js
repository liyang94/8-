var app = angular.module('app',['ui.router'])
    app.controller('controller',function(){

    })
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/home');//一级路由的 默认页面
        $urlRouterProvider.when('/home','/home/a');//二级路由的 默认页面
        // $urlRouterProvider.when('/home','/about');//重定向
        $stateProvider.state('home',{
            url:'/home',
            template:`
            <style>
            .home-top{
                display:flex;
                width:100%;
            }
            .home-top div{
                flex:1;
                text-align:center;
            }
            .home-active{
                background:red
            }
            .container{
                flex:1;
                overflow-y:auto;
                overflow-x:hidden;
            }
            </style>
            <div class="container">
            <div class="home-top">
                <div ui-sref="home.a" ui-sref-active="home-active">a</div>
                <div ui-sref="home.b" ui-sref-active="home-active">b</div>
                <div ui-sref="home.c" ui-sref-active="home-active">c</div>            
            </div>
            {{msg.value.data}}
            <ui-view></ui-view>
            </div>
            `,
            controller:function($scope,data){
                $scope.msg = data
            },
            controllerAs:'homeController',
            resolve:{
                    data:function($http,$q){//异步转同步
                        var defer = $q.defer();
                        $http({
                            url:'http://localhost:8030/history',
                            method:'POST',
                            data:{
                                currentPage:1,
                                showPage:10,
                                userId:1
                            }
                        }).then(function(result){
                            defer.resolve(result.data)
                        },function(error){
                            defer.reject(error);
                        })
                        return defer.promise.$$state;
                    }
                }
            
        })
        .state('about',{
            url:'/about',
            template:'about'
        })
        .state('me',{
            url:'/me',
            template:'me'
        })
        .state('home.a',{
            url:'/a',
            template:'a'
        })
        .state('home.b',{
            url:'/b',
            template:'b'
        })
        .state('home.c',{
            url:'/c',
            template:'c'
        })
    })