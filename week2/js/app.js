var app = angular.module('myapp', []);
app.controller('myctl', function ($scope) {
    $scope.click = function () {
        $('.container2').stop().animate({
            left: 0,
            top: 0
        }, 1000)

    }

    new IScroll('.box', {
        scrollbars: true
    })

})

app.directive('picimgs',[function(){
    return {
        restrict:"AE",
        replace:true,
        templateUrl:"./template/picimg.html",
        // link:function($scope){
        //     $scope.imgs={
        //         "arr":[
        //             {"urll":"images/5_03.png"},
        //             {"urll":"images/5_06.png"},
        //             {"urll":"images/5_08.png"}
        //         ]
        //     }
        // }
    }
}])



app.controller('myctl2', function ($scope) {
    $scope.zhe = function () {
        $('.container2').stop().animate({
            left: '-100%',
            top: 0
        }, 400)
    }

})






	