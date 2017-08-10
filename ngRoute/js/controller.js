var app = angular.module('app',['ngRoute']);

    app.controller('controller',function(){
        
    })
    .config(function($routeProvider){
        $routeProvider.otherwise('/home')
        $routeProvider.when('/home',{
            templateUrl:'./home.html',
            controller:function(){

            },
            controllerAs:'homeController'
        }).
        when('/about',{
            template:'<div>about</div>'
        }).
        when('/me',{
            template:'<div>me</div>'
        }).
        when('/history',{
            templateUrl:'./history.html',
            resolve:{
                data:function($http,$q){
                    var defer = $q.defer();
                    console.log($http)
                    $http({
                        url:'http://localhost:8030/history',
                        method:'POST',
                        data:{
                            userId:002,
                            currntPage:1,
                            showPage:10
                        }
                    })
                    .then(
                        function(result){
                            defer.resolve(result.data);
                        },function(error){
                            defer.reject(error);
                        }
                    )
                    return defer.promise.$$state
                }
            },
            controller:function($scope,data){
                $scope.data = data;
                console.log('controller',data);
            }
        })
    })