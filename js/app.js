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

/*
this is to be used when you are not conecting the server
app.service("BookService",function(){*/

app.service("BookService",function($http){

    var bookService= {};

    bookService.bookItems = [

        //this is to be used when you are not conecting the server
        /*{id: 1,completed: true, itemName: 'Java', date: new Date("October 3, 2014 11:30:00")},
        {id: 2,completed: true, itemName: 'Sql', date: new Date("October 5, 2014 11:30:00")},
        {id: 3,completed: true, itemName: 'Asp.Net', date: new Date("October 3, 2014 11:30:00")},
        {id: 4,completed: true, itemName: 'Phyton', date: new Date("October 1, 2014 11:30:00")},
        {id: 5,completed: true, itemName: 'Ruby', date: new Date("October 8, 2014 11:30:00")},
        {id: 6,completed: true, itemName: 'C++', date: new Date("October 4, 2014 11:30:00")},
        {id: 7,completed: true, itemName: 'C#', date: new Date("October 1, 2014 11:30:00")},
        {id: 8,completed: true, itemName: 'Visual Basic', date: new Date("October 3, 2014 11:30:00")}*/

    ];

    //this is used if you want to conect with a api which send json data
    //$http.get("http://example.com/appid")

    $http.get("data/serve_data.json")
        .success(function(data){

            bookService.bookItems = data;

            for(var item in bookService.bookItems){

                bookService.bookItems[item].date = new Date (bookService.bookItems[item].date);

            }
        })
        .error(function(data,status){

            alert("Things went wrong");

        });

    //For testing angular.element(document.body).injector().get("BookService").findById(4)
    bookService.findById = function(id){
        for(var item in bookService.bookItems){
            if(bookService.bookItems[item].id === id)
                return bookService.bookItems[item];
        }
    };




    bookService.removeItem = function(entry){

        $http.post("data/Delete_item.json",{id:entry.id})
            .success(function(data){

                if(data.status){

                var index = bookService.bookItems.indexOf(entry);
                bookService.bookItems.splice(index,1);    
                }
                

            })
            .error(function(data,status){

            });

        //when you are working local
        //var index = bookService.bookItems.indexOf(entry);
        //bookService.bookItems.splice(index,1);
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

    bookService.markCompleted = function(entry){
        entry.completed = !entry.completed;
    }    


    bookService.save = function(entry){

        var updateItem = bookService.findById(entry.id);

        if(updateItem){


         //update data only if the variable inside is 1
         $http.post("data/updated_item.json",entry)
            .success(function(data){
            
                if(data.status==1){



                updateItem.completed = entry.completed;
                updateItem.itemName = entry.itemName;
                updateItem.date = entry.date;

                }


        })
        .error(function(data,status){

            alert("Things went wrong22");

        });



            //it is used when is working with client side
            //updateItem.completed = entry.completed;
            //updateItem.itemName = entry.itemName;
            //updateItem.date = entry.date;
        }else{


        //take the id from this file and save the book with the id 
        $http.post("data/added_item.json",entry)
            .success(function(data){
                entry.id = data.newId;
        })
        .error(function(data,status){

            alert("Things went wrong22");

        });



         //this is used when we are using only client side   
        //entry.id = bookService.getNewId();

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
    };

    $scope.markCompleted = function(entry){
        BookService.markCompleted(entry);
    
    };

        //$scope.appTitle = BookService.bookItems[0].itemName;

        //Refresh the function
        $scope.$watch(function(){return BookService.bookItems;}, function(bookItems){
            $scope.bookItems = bookItems;

        });
}]);

app.controller("BookListItemsController", ["$scope","$routeParams","$location","BookService", function($scope,$routeParams,$location,BookService){

    

    if(!$routeParams.id){
        $scope.bookItem = {id: 0 ,completed: false, itemName: "", date: new Date()}

    }else{
        $scope.bookItem = _.clone(BookService.findById(parseInt($routeParams.id)));        
    }

    

    $scope.save = function(){
        BookService.save($scope.bookItem);
        $location.path("/");

    }


}]);


app.directive("tbBookItem", function(){
    return{
        restrict: "E",
        templateUrl: "views/BookItem.html"
    }
});

//testing o the console
///angular.element(document.body).injector().get("BookService").bookItems