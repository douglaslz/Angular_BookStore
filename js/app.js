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
        .when("/inputBook/edit/:id/",{
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
        {id: 1,completed: true, itemName: 'Java', date: new Date("October 3, 2014 11:30:00")},
        {id: 2,completed: true, itemName: 'Sql', date: new Date("October 5, 2014 11:30:00")},
        {id: 3,completed: true, itemName: 'Asp.Net', date: new Date("October 3, 2014 11:30:00")},
        {id: 4,completed: true, itemName: 'Phyton', date: new Date("October 1, 2014 11:30:00")},
        {id: 5,completed: true, itemName: 'Ruby', date: new Date("October 8, 2014 11:30:00")},
        {id: 6,completed: true, itemName: 'C++', date: new Date("October 4, 2014 11:30:00")},
        {id: 7,completed: true, itemName: 'C#', date: new Date("October 1, 2014 11:30:00")},
        {id: 8,completed: true, itemName: 'Visual Basic', date: new Date("October 3, 2014 11:30:00")}
    ];

    //For testing angular.element(document.body).injector().get("BookService").findById(4)
    bookService.findById = function(id){
        for(var item in bookService.bookItems){
            if(bookService.bookItems[item].id === id)
                return bookService.bookItems[item];
        }
    };




    bookService.removeItem = function(entry){

        var index = bookService.bookItems.indexOf(entry);
        bookService.bookItems.splice(index,1)
    }


    bookService.getNewId = function(){

        if(bookService.newId) {
            bookService.newId++;
            return bookService.newId;


        }else{
            var maxId= _.max(bookService.bookItems, function(entry){return entry.id;})
            bookService.newId = maxId.id + 1;
            return bookService.newId;

        }
    };


    bookService.save = function(entry){

        var updateItem = bookService.findById(entry.id);

        if(updateItem){
            updateItem.completed = entry.completed;
            updateItem.itemName = entry.itemName;
            updateItem.date = entry.date;
        }else{
            
        entry.id = bookService.getNewId();
        bookService.bookItems.push(entry);            
        }

    };
    return bookService;
});

app.controller("HomeController", ["$scope","BookService", function($scope,BookService) {
    $scope.appTitle = "Book List";
    $scope.bookItems = BookService.bookItems;
    $scope.removeItem = function(entry){
        BookService.removeItem(entry);
    }

        //$scope.appTitle = BookService.bookItems[0].itemName;
}]);

app.controller("BookListItemsController", ["$scope","$routeParams","$location","BookService", function($scope,$routeParams,$location,BookService){

    

    if(!$routeParams.id){
        $scope.bookItem = {id: 0 ,completed: true, itemName: "", date: new Date()}

    }else{
        $scope.bookItem = _.clone(BookService.findById(parseInt($routeParams.id)));        
    }

    

    $scope.save = function(){
        BookService.save($scope.bookItem);
        $location.path("/");

    }


}]);

