/**
 * Created by Douglas on 10/25/2019.
 */

angular.module("BookStoreCtrlModule", [])

.controller("BookStoreCtrl2", ["$scope","Calculations", function($scope,Calculations){

//variables 

	$scope.name="douglas";
	$scope.BookStoreObject = {};
	$scope.BookStoreObject.title = "Main page";
	$scope.BookStoreObject.subtitle = "sub page";

	$scope.BookStoreObject.firstname = "Douglas";
	$scope.BookStoreObject.lastname = "Loaiza";

	$scope.BookStoreObject.bindOutput = 2;


	$scope.BookStoreObject.numberB = 0;
	$scope.BookStoreObject.numberA = 0;
	$scope.BookStoreObject.Result = 0;

//Functions
	$scope.timesTwo = function(){
		
		//$scope.BookStoreObject.bindOutput *= 2;		
		$scope.BookStoreObject.bindOutput = Calculations.timesTwo($scope.BookStoreObject.bindOutput);		
	}

	$scope.pythagorema = function(){
		
		//$scope.BookStoreObject.bindOutput *= 2;		
		$scope.BookStoreObject.Result = Calculations.pythagorema($scope.BookStoreObject.numberB,$scope.BookStoreObject.numberA)
	}

	

}])


//Directives
.directive("welcome-Message",function(){
	return{
		restrict:"E",
		template: "<div>Douglas how are you</div>"
	}


})

.factory("Calculations",function(){

	var calculations = {};

	calculations.timesTwo = function(a){
		return a * 3;
	};

	calculations.pythagorema = function(a,b){
		return (a * b) +  (a * b);
	};

	return calculations;


})


;





/*var BS = angular.module("BookStore", [])

.controller();
.service();
*/