var app = angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'homeCtrl',
                controllerAs: 'homeController'
            })

            .when('/blog', {
                templateUrl: 'app/views/pages/blog.html',
                controller: 'blogCtrl',
                controllerAs: 'blogController'
            })
            .when('/postDetails/:postTitle', {
                templateUrl: 'app/views/pages/specificPost.html',
                controller: 'postCtrl',
                controllerAs: 'postController'
            })

            //call static html page
            .when('/seaPostDetails',{
                templateUrl: 'app/views/pages/specificPostSea.html' 
            })
            
            // Register Route            
            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })

            // Route: User Login
            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html',
                // authenticated: false
            })

            // Route: User logout
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html',
                // authenticated: false
            })
            
            .otherwise({ redirectTo: '/' });

        // this is used to remove # symbol in url  so we added $locationProvider
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        // then add <base href="/">  in your html
    });




