var app = angular.module('app',['ngRoute']);
    app.config(function($routeProvider){
        console.log($routeProvider)
        $routeProvider.when('/home',{
            templateUrl:'./home.html',
            controller:function($scope,data){
                $scope.msg = data;
            },
            resolve:{
                    data:function($http,$q){
                        var defer = $q.defer();
                            $http({
                                url:'http://localhost:8030/history',
                                method:'POST',
                                data:{
                                    showPage:10,
                                    currentPage:1,
                                    userId:002
                                }
                            }).then(function(result){

                               defer.resolve(result.data)

                            },function(error){
                                defer.reject(error)
                            })
                        return defer.promise.$$state
                    }
                }
            
        })
        .when('/about',{
            template:'about'
        })
        .when('/me',{
            template:'me'
        })
        $routeProvider.otherwise('/home')
    })
    .controller('controller',function($scope,$location){
        $scope.click = function(path){
            $location.url(path);
        }
    })