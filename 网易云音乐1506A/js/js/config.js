angular.module('config',['ui.router'])
        .config(['$stateProvider','$urlRouterProvider',function($stateProvider,b){
            
            b.otherwise('/discover');
            b.when('/discover','/discover/recommend');

            $stateProvider.state('discover',{
                url:'/discover',
                templateUrl:'./template/discover.html',
                controller:function($state){
                    $state.go('discover.recommend')
                },
                controllerAs:'discover'
            })
            .state('myMusic',{
                url:'/myMusic',
                templateUrl:'./template/myMusic.html',
                controller:function($stateParams){
                    
                },
                controllerAs:'myMusic'                
            })
            .state('friend',{
                url:'/friend',
                templateUrl:'./template/friend.html',
                controller:function($stateParams){
                   
                },
                controllerAs:'friend'
            })
            .state('discover.recommend',{
                url:'/recommend',
                templateUrl:'./template/discover/recommend.html',
                controller:['$scope',function($scope){
                    $scope.data="I'm data"
                    $scope.fn=function(index){
                    }
                    $scope.slideHasChanged = function(index){
                    }
                    $scope.page = 2;
                    $scope.imgArray = ['./img/banner1.jpg','./img/banner2.jpg','./img/banner3.jpg','./img/banner4.jpg']
                }],
                controllerAs:'recommend'
            })
            .state('discover.songlist',{
                url:'/songlist',
                templateUrl:'./template/discover/songlist.html',
                controller:function($stateParams){
                   
                },
                controllerAs:'songlist'
            })
            .state('discover.station',{
                url:'/station',
                templateUrl:'./template/discover/station.html',
                controller:function($stateParams){
                   
                },
                controllerAs:'station'
            })
            .state('discover.rank',{
                url:'/rank',
                templateUrl:'./template/discover/rank.html',
                controller:function($stateParams){
                   
                },
                controllerAs:'rank'
            })
            // 'discover.recommend','discover.songlist','discover.station','discover.rank'
        }])
