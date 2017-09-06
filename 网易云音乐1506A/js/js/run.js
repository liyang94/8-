angular.module('run',[])
        .run(['$rootScope',function($rootScope){
            $rootScope.discoverItemArray = ['个性推荐','歌单','主播电台','排行榜'];
            $rootScope.discoverSubRouteName = ['discover.recommend','discover.songlist','discover.station','discover.rank'];
        }])