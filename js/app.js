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
        {id: 1,completed: true, itemName: 'Java', date: '2014-10-01'},
        {id: 2,completed: true, itemName: 'Sql', date: '2014-10-01'},
        {id: 3,completed: true, itemName: 'Asp.Net', date: '2014-10-02'},
        {id: 4,completed: true, itemName: 'Phyton', date: '2014-10-02'},
        {id: 5,completed: true, itemName: 'Ruby', date: '2014-10-03'},
        {id: 6,completed: true, itemName: 'C++', date: '2014-10-03'},
        {id: 7,completed: true, itemName: 'C#', date: '2014-10-04'},
        {id: 8,completed: true, itemName: 'Visual Basic', date: '2014-10-04'}
    ];


        bookService.getNewId = function(){
        if(bookService.newId) {
            bookService.newId++;
            return bookService.newId;


        }
        else {
            var maxId= _.max(bookService.bookItems, function(entry){return entry.id;})
            bookService.newId = maxId.id + 1;
            console.log(maxId);

            return bookService.newId;

        }
    };


    bookService.save = function(entry){
        entry.id = bookService.getNewId();

        bookService.bookItems.push(entry);
    };
    return bookService;
});

app.controller("HomeController", ["$scope","BookService", function($scope,BookService) {
    $scope.appTitle = "Book List";
        //$scope.appTitle = BookService.bookItems[0].itemName;
}]);

app.controller("BookListItemsController", ["$scope","$routeParams","$location","BookService", function($scope,$routeParams,$location,BookService){

    $scope.bookItems = BookService.bookItems;

    $scope.bookItem = {id: 0 ,completed: true, itemName: "", date: new Date()}

    $scope.save = function(){
        BookService.save($scope.bookItem);
        $location.path("/");



    }

console.log($scope.bookItems);

}]);

