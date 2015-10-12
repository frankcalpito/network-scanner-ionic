angular.module('starter.controllers', [])

.constant('$ionicLoadingConfig', {
  template: 'scanning'
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ScanCtrl', function($scope, $http, $ionicLoading) {

 $scope.message = "Tap to start a port scan";
 $scope.ports = [];
 

$scope.doScan = function() {

    $ionicLoading.show();
    
    console.log("scan start");

    //test loop
    $scope.ports = [];

    var start = 1;
    while( start < 100 ){

      $http.get("api/NetworkScanner/scan_ports/" + start)
      .success(function (response) {
        angular.forEach(response,function(item) {
           $scope.ports.push(item);
        });

        console.log($scope.ports);

      })
      .then(function () {
          $ionicLoading.hide();
      });

      start++;

    }

  };

})

.controller('ScanCommonCtrl', function($scope, $http, $ionicLoading) {

 $scope.message = "Tap to start a port scan";
 $scope.ports = [];
 

$scope.doScan = function() {

    $ionicLoading.show();
    
    console.log("scan start");

    //test loop
    $scope.ports = [];

    // var start = 1;
    // while( start < 100 ){

      $http.get("api/NetworkScanner/scan_common_ports/")
      .success(function (response) {
        angular.forEach(response,function(item) {
           $scope.ports.push(item);
        });

        console.log($scope.ports);

      })
      .then(function () {
          $ionicLoading.hide();
      });

    //   start++;

    // }

  };

});


