angular .module('pageControl',[])       
       .directive('pageControl',function(){
           return{
                restrict:'E',
                template:`
                    <div ng-class="boxClass" ng-show="maxPage">
                        <div ng-class="itemClass" ng-click="goToPrevious()" ng-show="currentPage>1">上一页</div>
                        <div ng-class="[itemClass,firstButtonClass]" ng-click="go(1)">1</div>
                        <div ng-class="itemClass" ng-show="previous">...</div>
                        <div ng-class="[itemClass,{{'active'+$index}}]" ng-click="go(value)" ng-repeat="value in array track by $index">{{value}}</div>
                        <div ng-class="itemClass" ng-show="next">...</div>
                        <div ng-class="[itemClass,lastButtonClass]" ng-click="go(maxPage)" ng-show="maxPage>1">{{maxPage}}</div>
                        <div ng-class="itemClass" ng-click="goToNext()" ng-show="currentPage<maxPage">下一页</div>
                    </div>                
                `,
                scope:{
                    maxPage:'@',
                    boxClass:'@',
                    itemClass:'@',
                    showNumberButton:'@',
                    activeClass:'@',
                    url:'@',
                    data:'=',
                    method:'@',
                    params:'@'
                },
                controller:function($scope,$http){

                    function initArray(){
                        // console.log($scope.maxPage-$scope.showNumberButton)
                        if($scope.maxPage-$scope.showNumberButton>0){
                            $scope.array = new Array($scope.showNumberButton-2);
                            $scope.next = true;
                        }else if($scope.maxPage>=2){
                            $scope.array = new Array($scope.maxPage-2);
                        }
                        for(var i = 0 ,length = $scope.array.length ; i<length ; i++){
                            $scope.array[i] = i+2;
                        }
                    }    
                    function resetArray(operator){
                        angular.forEach($scope.array,function(value,index){
                            $scope.array[index] = value+operator;
                        })
                    }                    
                            //加载首屏
                            $http({
                                url:$scope.url,
                                method:$scope.method ? $scope.method:'POST',
                                data:$scope.params ? $scope.params : {}
                            }).then(function(result){
                                $scope.data = result.data;
                            },function(error){
                                throw new Error(String(error));
                            })
                            console.log($scope.showNumberButton)
                            $scope.currentPage = 1;
                            $scope.data = 1;
                            $scope.firstButtonClass = $scope.activeClass;
                            //initArray
                            initArray();

                            $scope.go = function(value){

                                console.log(this.$index)
                                $scope.data = value;
                                angular.forEach($scope.array,function(value,index){
                                    $scope[$scope.activeClass+index] = '';
                                })
                                $scope[$scope.activeClass+this.$index] = $scope.activeClass;
                                $scope.firstButtonClass = $scope.itemClass;
                                $scope.lastButtonClass = $scope.itemClass;

                                $scope.currentPage = value;
                                // $timeout(function(){
                                    $scope.data = $scope.currentPage;
                                // },300)
                                if($scope.currentPage == $scope.array[0] && $scope.currentPage>2) {
                                    //resetArray
                                    resetArray(-1)
                                    angular.forEach($scope.array,function(value,index,array){
                                        if(index==0){
                                            $scope[$scope.activeClass+index] = ''
                                        } else if(index==1){
                                            $scope[$scope.activeClass+index] = $scope.activeClass
                                        }
                                    })
                                    $scope.next = true;
                                }else if($scope.currentPage == $scope.array[$scope.array.length-1] && $scope.currentPage<$scope.maxPage-1) {
                                    //resetArray
                                    resetArray(1); 
                                    angular.forEach($scope.array,function(value,index,array){
                                        if(index==array.length-1){
                                            $scope[$scope.activeClass+index] = ''
                                        } else if(index==array.length-2){
                                            $scope[$scope.activeClass+index] = $scope.activeClass
                                        }
                                    })
                                    $scope.previous = true;   
                                }
                                if($scope.array[0] == 2){
                                    $scope.previous = false;
                                } 
                                if($scope.array[$scope.array.length-1] == $scope.maxPage-1){
                                    $scope.next = false;
                                }
                                if(value == 1){
                                    $scope.previous = false;
                                    //initArray
                                    initArray()

                                    angular.forEach($scope.array,function(value,index){
                                    $scope[$scope.activeClass+index] = '';
                                    })
                                    $scope.firstButtonClass = $scope.itemClass + ' ' + $scope.activeClass;
                                }else if(value == $scope.maxPage){
                                    $scope.next = false;
                                    if($scope.maxPage-$scope.showNumberButton>0){
                                        $scope.previous = true;
                                    }
                                    for(var i = $scope.array.length-1; i>=0; i--){
                                        $scope.array[i] = $scope.maxPage - ($scope.array.length - i);
                                    }
                                    angular.forEach($scope.array,function(value,index){
                                        $scope[$scope.activeClass+index] = '';
                                    })                    
                                    $scope.lastButtonClass = $scope.itemClass + ' ' + $scope.activeClass;
                                }

                            }
                            $scope.goToPrevious = function(){
                                $scope.currentPage--;
                                angular.forEach($scope.array,function(value,index,array){
                                    if($scope.currentPage == value){
                                        $scope.$index = index;
                                    }
                                })
                                $scope.go($scope.currentPage)
                            }
                            $scope.goToNext=function(){
                                $scope.currentPage++;
                                angular.forEach($scope.array,function(value,index,array){
                                    if($scope.currentPage == value){
                                        $scope.$index = index;
                                    }
                                })
                                $scope.go($scope.currentPage)                
                            }
                    }
           }
       })