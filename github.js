var app = angular.module('GitStats', ['ngMaterial','angularMoment']);

app.controller('GitCtrl', ['$scope', '$mdSidenav','gitApi', function($scope, $mdSidenav,gitApi){
   
   var endpoint = "https://api.github.com/";
    var request =  "search/issues"
    $scope.repo = "Shippable/support";
    $scope.column1 = "";
    var url =   endpoint + request;
 $scope.getData = function(){
 	 var openIssues= "?q=is:open+repo:"+$scope.repo;
    var last24hours= moment().subtract(24, "hours").format('YYYY-MM-DD');
    var last7days= moment().subtract(7, "days").format('YYYY-MM-DD');
    console.log(last24hours);
    // search string for more last 24 hours
    var openIssues24hours= "?q=is:open+repo:"+$scope.repo+"+created:>"+last24hours;
 
 // search string for more than 24 hours less than 7 days
    var openIssues24to7hours= "?q=is:open+repo:"+$scope.repo+"+created:>"+last24hours+"+created:>"+last7days;
 
 // search string for more than 7 days
  var openIssues7hours= "?q=is:open+repo:"+$scope.repo+"+created:<"+last7days;
 
 	gitApi.get(url+openIssues,"").then(function(response){
 	console.log(response.data.total_count);
 	$scope.column1 = response.data.total_count;
 });

 	gitApi.get(url+openIssues24hours,"").then(function(response){
 	console.log(response.data.total_count);
 	$scope.column2 = response.data.total_count;
 });

 	gitApi.get(url+openIssues24to7hours,"").then(function(response){
 	console.log(response.data.total_count);
 	$scope.column3 = response.data.total_count;
 });

  gitApi.get(url+openIssues7hours,"").then(function(response){
  console.log(response.data.total_count);
  $scope.column4 = response.data.total_count;
 });
 }
 


}]);
// factory for rest api calls
app.factory('gitApi',['$http','$log',function($http,$log){
        
        return {
            get: function(url,config){
              console.log("GET:",url);
             return $http({
                method: "get",
                url: url,
            });
              //  return $http.post(url,config);
            }
        }
    }
    ]);
