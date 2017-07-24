angular.module('mainController', ['authServices'])
    .controller('mainCtrl', function (Auth, $timeout, $location, $rootScope, $scope) {

        var app = this;
        app.loadme = false;

        $scope.$on("$locationChangeStart", function (e, currentLocation, previousLocation) {
            $scope.previousLocation = previousLocation.split('/');
        })


        // Will run code every time a route changes
        $rootScope.$on('$routeChangeStart', function () {
            //if (!app.checkingSession) app.checkSession();

            // Check if user is logged in
            if (Auth.isLoggedIn()) {
                // Custom function to retrieve user data
                Auth.getUser().then(function (data) {
                    app.loadme = true;

                    if (data.data.username === undefined) {
                        app.isLoggedIn = false; // Variable to deactivate ng-show on index
                        Auth.logout();
                        $location.path('/');
                    } else {
                        app.isLoggedIn = true; // Variable to activate ng-show on index
                        app.username = data.data.username; // Get the user name for use in index
                        app.loadme = true;
                        app.useremail = data.data.email; // Get the user e-mail for us ein index

                    }
                });
            } else {
                app.isLoggedIn = false; // User is not logged in, set variable to falses
                app.username = ''; // Clear username
                app.loadme = true; // Show main HTML now that data is obtained in AngularJS
            }
            if ($location.hash() == '_=_') $location.hash(null); // Check if facebook hash is added to URL
            app.disabled = false; // Re-enable any forms
            app.errorMsg = false; // Clear any error messages

            // to deside if we in blog page of specific post
            var link = $location.path();
            var linkSplitted = link.split('/');
            console.log(linkSplitted[1]);

            if (linkSplitted[1] == 'postDetails') {
                $scope.inPostDetailsPage = true;
            } else
                $scope.inPostDetailsPage = false;

        });


        // Function to submit form and login user
        this.doLogin = function (loginData) {
            app.loading = true; // To activate spinning loading icon w/bootstrap
            app.errorMsg = false; // Clear error message each time the user presses submit

            // Initiate service to save the user into the dabase            
            Auth.login(app.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false; // Once data is retrieved, loading icon should be cleared
                    app.successMsg = data.data.message + '...Redirecting'; // Create Success Message

                    // Redirect to home page after 2000 miliseconds
                    $timeout(function () {
                        if ($scope.previousLocation[$scope.previousLocation.length - 1] == 'blog') {
                            $location.path('/blog');
                            $('.nav-lists').removeClass('active');
                            $('.blog').addClass('active');
                        } else {
                            $location.path('/');
                            $('.nav-lists').removeClass('active');
                            $('.home').addClass('active');
                        }

                        app.loginData = null; // Clear login form
                        app.successMsg = false; // CLear success message
                        app.disabled = false; // Enable form on submission
                        // app.checkSession(); // Activate checking of session
                        //$route.reload();
                    }, 2000);
                } else {
                    app.loading = false; // Once data is retrieved, loading icon should be cleared
                    app.errorMsg = data.data.message; // Create an error message
                }
            });
        };


        // Function to logout the user
        app.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $('.nav-lists').removeClass('active');
            $('.logout').addClass('active');
            $timeout(function () {
                $location.path('/');
                $('.nav-lists').removeClass('active');
                $('.home').addClass('active');
            }, 2000);
            //showModal(2); // Activate modal that logs out user
        };



        // JQuery code 
        $(function () {

            // navigation bar style

            var nav_lists = $('.nav-lists li a');

            nav_lists.on("click", function () {
                nav_lists.removeClass('active');

            })


        })

    });