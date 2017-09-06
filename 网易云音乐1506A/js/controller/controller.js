var app = angular.module('app',['config','run','directive','ionic'])
          .factory('song',['$interval',function($interval){
                  return{
                     intervalForProgress:null,
                     progressBar:null,
                     remainingTime:null,
                     updataProgress:function(song){
                        song.intervalForProgress = $interval(function(){
                                song.progressBar.style.width = window.screen.width*2*audio.currentTime/audio.duration+'px';
                                var second = String(Math.round(audio.duration - audio.currentTime)%60);
                                second = second.length>1 ? second : '0'+second;
                                song.remainingTime.innerText = Math.floor((audio.duration - audio.currentTime)/60) + ' : ' +second;
                                if(audio.currentTime/audio.duration==1){

                                        if(audio.currentTime){//没有下一曲
                                                $scope.playButtonClass = 'icon-bofang';
                                        }else{//有下一曲
                                                
                                        }
                                }
                        },100);
                     }
                  }
          }])
        .factory('$style',function(){
                return{
                        get:function(dom,attributeName){
                                var style = window.getComputedStyle ? window.getComputedStyle(dom,null) : dom.currentStyle ;
                                return parseInt(style[attributeName]);
                        }
                }
        })
          .controller('main',['$scope','song','$interval','$style',function($scope,song,$interval,$style){
                  song.progressBar = document.querySelector('.progress');
                  song.progressBar.style.width = 0;
                  song.remainingTime = document.querySelector('.remainingtime');
                  $scope.touch = function($event){

                  }
                  $scope.path = './img/songimages/songimg.png';
                  $scope.songName = '小燕子';
                  $scope.singerName = '朱晓琳';
                  $scope.playButtonClass = 'icon-bofang';
                //   $scope.songSrc = './music/王力宏 - 你不知道的事.mp3';
                  audio.src="./music/王力宏 - 你不知道的事.mp3";
                  $scope.imagePathArray = [];
                  $scope.playpause = function(){
                        if($scope.playButtonClass == 'icon-bofang'){
                                $scope.playButtonClass = 'icon-stop';
                                audio.play();
                                song.updataProgress(song);
                                
                        }else if($scope.playButtonClass == 'icon-stop'){
                                $scope.playButtonClass = 'icon-bofang';
                                audio.pause();
                                $interval.cancel(song.intervalForProgress);
                        }
                        
                  }
                $scope.willChangeProgress = function(event){
                        song.progressBar.style.width =  event.touches[0].clientX+'px';
                        console.log(event.touches[0].clientX+'px')
                }
                $scope.changeProgress = function(event){
                        $interval.cancel(song.intervalForProgress);
                        audio.pause();
                        audio.currentTime = $style.get(song.progressBar,'width')/(window.screen.width*2) * audio.duration;
                        audio.play();
                        song.updataProgress(song);
                        $scope.playButtonClass = 'icon-stop';
                }       
          }])
