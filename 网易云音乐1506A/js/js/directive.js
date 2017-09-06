var directive = angular.module('directive',['ngTouch'])
    .directive('ngTouch',['$swipe',function($swipe){
        return{
            restrict:'A',
            link:function($scope,$element,$attribute){
                $swipe.bind($element,{
                    start:function(coords,event){
                        $scope.$event = event;
                        $scope.$apply($attribute['ngTouch'])
                    },
                    move:function(coords){
                        
                    },
                    end:function(coords){
                        
                    },
                    cancel:function(coords){
                        
                    }
                })
            }
        }
    }])
    .directive("ngTouchstart", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {
                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    $scope.$event = event;
                    var method = $element.attr("ng-touchstart");
                    $scope.$apply(method);
                }
            }]
        }
    })
    .directive("ngTouchmove", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchstart", onTouchStart);
                function onTouchStart(event) {
                    $scope.$event = event;
                    event.preventDefault();
                    $element.bind("touchmove", onTouchMove);
                    $element.bind("touchend", onTouchEnd);
                }
                function onTouchMove(event) {
                    $scope.$event = event;
                    var method = $element.attr("ng-touchmove");
                    $scope.$apply(method);
                }
                function onTouchEnd(event) {
                    $scope.$event = event;
                    event.preventDefault();
                    $element.unbind("touchmove", onTouchMove);
                    $element.unbind("touchend", onTouchEnd);
                }

            }]
        }
    })
    .directive("ngTouchend", function () {
        return {
            controller: ["$scope", "$element", function ($scope, $element) {

                $element.bind("touchend", onTouchEnd);

                function onTouchEnd(event) {
                    $scope.$event = event;
                    var method = $element.attr("ng-touchend");
                    $scope.$apply(method);
                }

            }]
        }
    })
