angular.module('newsService', [])
    .factory('newsService', function($http) {
        var newsFactory = {};

        // post image

        // get image 
        newsFactory.getImage = function(){
            return $http.get('/api/newsData');
        }

        
        return newsFactory;
    })