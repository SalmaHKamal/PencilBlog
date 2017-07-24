angular.module('postController', ['blogServices'])

    .controller('postCtrl', function($http, $location , $scope , Blog) {

        var app = this;

        // get the blog tilte from the url 
        var fullPath = $location.path();
        $scope.blogTitle = fullPath.split('/')[2];
        //console.log('the blog title' + $scope.blogTitle);

        // send a request to the server to get the blog by its title
        this.getSpecificBlog = function(blogTitle){

            Blog.getBlogByTitle($scope.blogTitle).then(function(data){

                if(data.data.success){
                    $scope.currentBlog = data.data.fullObject;
                    $scope.currentBlog.postImage = data.data.postImage;
                    
                    console.log($scope.currentBlog);
                }else
                {
                    console.log(data.data.message);
                }
            });
        } 

        this.getSpecificBlog();

    });