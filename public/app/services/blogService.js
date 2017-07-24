angular.module('blogServices', [])

	.factory('Blog', function($http) {
		var blogFactory = {}; // Create the User object

		// create a new blog
		blogFactory.createBlog = function(blogData , postTags) {

            var fd = new FormData();

            fd.append('bTitle', blogData.bTitle);
            fd.append('bContent', blogData.bContent);
            fd.append('blogTags', blogData.tags);
            fd.append('postImage', blogData.postImage); 
            
            return $http.post('/api/createBlog', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
            
        };
        
        // get all blogs 
        blogFactory.getAllBlogs = function(){
            return $http.get('/api/getBlogs');
        }

        // get specific blog by its title
        blogFactory.getBlogByTitle = function(postTitle){
            return $http.get('/api/getBlogByTitle/' + postTitle);
        }

		return blogFactory;
	});
