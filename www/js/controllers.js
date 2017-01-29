angular.module('controllers', [])

.controller('DashCtrl', function($scope,$http) {
  // console.log("Hello from controller")
  $scope.student={}
  $scope.addStudent=function(){
    // console.log($scope.student);
    $http.post('http://localhost:1609/students/add',$scope.student).
      success(function(result){
        if(result.success){
          alert("Record added successfully")
        }
      }).
      error(function(err){
        if(err){
          console.log(err);
        }
      })
  }

})

.controller('ChatsCtrl', function($scope, Chats, $http,$state) {
  $scope.id={}
  if($state.current.name="tab.chats"){
    $http.get('http://localhost:1609/students/view').
    success(function(result){
      if(result.success){
        $scope.studentLists = result.data
      }
    }).
    error(function(err){
      if(err){
        console.log(err);
      }
    })
  }
  $scope.student ={}
  $scope.delete= function(id){
     $scope.student.id= id
     console.log($scope.student.id);
    $http.get('http://localhost:1609/students/delete/'+$scope.student.id).
      success(function(result){
        if(result.success){
          alert("deleted successfully")
          $state.reload();
        }
      }).
      error(function(err){
        if(err){
          console.log(err);
        }
      })
  }
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
