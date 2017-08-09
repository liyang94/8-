var app = angular.module('app',[]);


    app.config(function(constValue){ 

        console.log('config运行了');

    }).run(function(constValue,variableValue){

        console.log('run运行了');

    }).directive('myDirective',function(){

        console.log('directive运行了');

        return{
            restrict:'E',
            template:'<div>111</div>'
        }
    })
    

    app.controller('controller',function($scope,provider){
            console.log(provider);
    })
    .constant('constValue',{
        item1:'字符串1',
        item2:1000,
        // item3:function(){},
        item4:{
            value:'我是item4'
        },
        item5:[1,2,3,4,5],
        item6:true
    })
    .value('variableValue',{
        value1:1,
        value2:2
    })
    .factory('factory',function(variableValue){
        var value3 = variableValue.value1 + variableValue.value2

        return{
            item:value3,
            click:function(){
                console.log('点击了')
            }
        }
    })
    .service('service',function(){
        var _this = this;
        this.name = "张三";
        this.age = 18;
        this.eat = function(){
            console.log('eat something')
            _this.growup()
            return '吃完了'
        }
        this.sleep = function(){
            console.log('go to sleep')
            _this.growup()
        }
        this.die = function(){
            console.log('go die')
        }
        this.growup=function(){
            console.log('长大');
        }
    })
    .provider('provider',function(){

        return{
            $get:function(){

                return {
                    name:'aaa',
                    baseUrl:'http://baidu.com',
                    PI:3.1415926
                }

            }
        }
    })
