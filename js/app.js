/**
 * Created by Douglas on 10/25/2019.
 */

var app = angular.module("BookStoreListApp",["ngRoute"]);


app.config(function($routeProvider){

    $routeProvider
        .when("/",{
            templateUrl:"Views/BookList.html",
            controller: "BookListItemsController"
        })
        .when("/inputBook",{
            templateUrl:"Views/inputBook.html",
            controller: "BookListItemsController"
        })
        .when("/inputBook/:id",{
            templateUrl:"Views/inputBook.html",
            controller: "BookListItemsController"
        })
        .otherwise({
            redirectTo: "/"
        })
});


app.service("BookService",function(){

    var bookService= {};


    bookService.bookItems = [
        {completed: true, itemName: 'Java', date: '2014-10-01'},
        {completed: true, itemName: 'Sql', date: '2014-10-01'},
        {completed: true, itemName: 'Asp.Net', date: '2014-10-02'},
        {completed: true, itemName: 'Phyton', date: '2014-10-02'},
        {completed: true, itemName: 'Ruby', date: '2014-10-03'},
        {completed: true, itemName: 'C++', date: '2014-10-03'},
        {completed: true, itemName: 'C#', date: '2014-10-04'},
        {completed: true, itemName: 'Visual Basic', date: '2014-10-04'}
    ];

    return bookService;
})

app.controller("HomeController", ["$scope","BookService", function($scope,BookService) {
    //$scope.appTitle = "Book List";
        $scope.appTitle = BookService.bookItems[0].itemName;
}]);

app.controller("BookListItemsController", ["$scope","$routeParams","BookService", function($scope,$routeParams,BookService){

    $scope.bookItems = BookService.bookItems;

    $scope.rp = "Route Paramater Value: " + $routeParams.id;

}]);

