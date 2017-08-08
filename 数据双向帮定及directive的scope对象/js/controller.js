var app = angular.module('app',[]);

app.controller('controller',function($scope,$timeout){
    $scope.msg = '我是来自控制器的数据'
    $scope.click = function(){
        console.log('点击了')
    }
    
    $timeout(function(){
    $scope.click = function(){
        console.log('点击了乐乐乐乐')
    }
    $scope.$apply()        
    },4000)
})
.directive('directive',function(){
    return{
        restrict:'ECMA',//element class 注释 attribute
        template:`<div ng-init='click=msg3()' ng-click="click()">我是按钮</div>`,
        // templateUrl:'../index.html'
        scope:{
            msg:'=',//双向绑定
            msg2:'@',//单向传递 而且还要用{{}}传递
            msg3:'&'//传递方法的
        },    // 1写布尔值 2写对象object{}
        controller:function($scope,$timeout){
            // console.log($scope.msg3)
            
        },
        controllerAs:'controllerA',
        priority:0,
        terminal:true,
        replace:true,
        compile:function(element,attribute){//它提供了一个操作指令里面dom的机会 而且是很细节的机会
            console.log(element,attribute)//它是我们编译阶段的东东
                    var dom = angular.element('<div>aaabbb</div>')
                    console.log(element)
                    element[0].appendChild(dom[0])
            return{
                pre:function(scope,element,attribute){//这是第二阶段

                },
                post:function(scope,element,attribute){//这是我们的第三阶段

                }
            }
        },
        link:function(scope,element,attribute){
                    var dom = angular.element('<div>aaabbb</div>')
                    console.log(element)
                    element[0].appendChild(dom[0])
        }
    }
})
// .factory('¥timeout',function(){
//     return function(){

//         setTimeout

//     }
// })




// function $timeout(fn,time){

//     try{
//         setTimeout(fn,time)
//     }catch(e){

//     }finally{

//     }

// }
