var app = angular.module('app',[]);

    app.controller('controller',function($scope,$timeout){
        $scope.data=[{
            listName:'热菜',
            value:[
                {
                    name:'西红柿炒鸡蛋',
                    price:3
                },
                {
                    name:'鱼香肉丝',
                    price:3
                },
                {
                    name:'锅包肉',
                    price:3
                }
            ]
        },{
            listName:'凉菜',
            value:[
                {
                    name:'拍黄瓜',
                    price:6
                },{
                    name:'醋溜金针菇',
                    price:12
                },{
                    name:'老醋花生',
                    price:4
                }
            ]
        },{
            listName:'甜点',
            value:[
                {
                    name:'拔丝香蕉',
                    price:2
                },
                {
                    name:'拔丝地瓜',
                    price:0
                },
                {
                    name:'西瓜',
                    price:8
                }
            ]
        }]
        
    })
    .directive('tab',function(){
        return{
            restrict:'E',
            template:`
                <div class="box" ng-init="subData = data[0].value">
                    <div class="left">
                        <div ng-repeat="item in data" ng-click="click(item.value)" class="left-item">{{item.listName}}</div> 
                    </div>
                    <div class="right">
                        <div ng-repeat="item in subData" class="right-item">
                            <div class="name">
                            {{item.name}}
                            </div>
                            <div class="price">
                            {{item.price}}
                            </div>
                        </div> 
                    </div>
                </div>
            `,
            scope:{
                data:'='
            },
            controller:function($scope){
                $scope.click=function(value){
                    $scope.subData = value;
                }
            },
            controllerAs:'tabController'
        }
    })
