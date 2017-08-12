var app = angular.module('app',['ui.router','ui.router.state.events'])
    app.controller('controller',function($scope,$state){
        $scope.msg = 'hello'
        $scope.click=function(){
            $state.go('about',{params:{'key':'value'}})
        }
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
            controller:function($scope,data,$stateParams){
                $scope.msg = data
            },
            controllerAs:'homeController',
            resolve:{
                    data:function($http,$q){
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
                },
                params:{
                    key:[]
                }
            
        })
        .state('about',{
            url:'/about',
            template:'about',
            params:{
                params:{}
            },
            controller:function($stateParams){
            }
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
    .run(function($rootScope){
        $rootScope.$on('$stateChangeStart',function(){
            console.log('Start')
        })
        $rootScope.$on('$stateChangeCancel',function(){
            console.log('Cancel')
        })
        $rootScope.$on('$stateChangeSuccess',function(event,currentRoute,unknow1,previousRoute,unknow2,source,unknow3){
            console.log('Success')
            console.log(arguments);
        })
        $rootScope.$on('$stateChangeError',function(){
            console.log('Error')
        })
        $rootScope.$on('$stateNotFound',function(){
            console.log('NotFound')
        })                                
    })

// $stateChangeStart
// $stateChangeCancel
// $stateChangeSuccess
// $stateChangeError
// $stateNotFound