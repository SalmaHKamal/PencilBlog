angular.module('blogController', ['blogServices'])
    .controller('blogCtrl', function ($timeout, $location, $scope, Blog, $interval) {

        var app = this;


        // create a new blog
        this.addBlog = function (blogData, blogTags) {
            app.errorMsg = false; // this for don't display the error message on success
            app.loading = true;

            $scope.tags.join(',');
            console.log('the array ' + $scope.tags);

            app.blogData.tags = $scope.tags;

            Blog.createBlog(app.blogData).then(function (data) {

                console.log(' the request sent');
                console.log(data); // data is the object whicj is sent from server 
                console.log('Success => ' + data.data.success);
                console.log('message => ' + data.data.message);

                if (data.data.success) {
                    app.loading = false;
                    //create success message
                    app.successMsg = data.data.message + '... redirecting';
                    // redirect to homepage 
                    $timeout(function () {
                        $location.path('/');
                    }, 500);
                } else {
                    app.loading = false;
                    //create error message 
                    app.errorMsg = data.data.message;
                }

            });
        }


        // to get all blogs 
        this.getBlogs = function () {
            Blog.getAllBlogs().then(function (data) {
                if (data.data.success) {
                    $scope.allBlogs = data.data.fullObject;
                    // to add base64 images to the corresponding post
                    for (var i = $scope.allBlogs.length - 1; i >= 0; i--) {
                        console.log($scope.allBlogs[i])
                        if ($scope.allBlogs[i].image) {
                            $scope.allBlogs[i].postImage = data.data.postsImages.pop();
                        }
                    }

                } else {
                    console.log(data.data.message);
                }
            })
        }

        this.getBlogs();


        // to display image 
        $scope.photoChanged = function (files) {
            console.log(files)
            if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg|mp4|wav)$/)) {
                $scope.uploading = true;
                var file = files[0];
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function (e) {
                    $timeout(function () {
                        $scope.thumbnail = {};
                        $scope.thumbnail.dataUrl = e.target.result;
                        $scope.uploading = false;
                        $scope.message = false;
                    });
                };
            } else {
                $scope.thumbnail = {};
                $scope.message = false;
            }
        };

        $scope.checkUser = function () {
            console.log($scope.username);
            if ($scope.username)
                $scope.open = true;
            else {
                $scope.open = false;
                $location.path('/login');
                $('.nav-lists').removeClass('active');
                $('.login').addClass('active');
                $scope.ifBlog = true;
            }
        }



        // jquery code

        var XMark = $('.fa-times');
        var tagsInput = $('.tags-input-div #bTags');
        var postForm = $('#blog-post');
        var newSpan = $('<span class="test">salma</span>');
        $scope.arrayValues = [];
        //$scope.tags   = [];

        $(function () {

            // overlay 

            $('.overlay').on("click", function () {
                // $(this).css('display','none');
                $(this).css({
                    'display': 'none',
                    'z-index': '-1'
                });
                $('#blog-post').css({
                    'display': 'none',
                    'z-index': '-1'
                });

                $('#blog-post input , #blog-post textarea').val('');
                $('#blog-post .mythumbnail').attr('src' , 'assets/images/test.jpg');
                XMark.css('display', 'none');

            });

            $('.overlay').on('mousemove', function (event) {
                //console.log('hi');

                XMark.css({
                    'display': 'block',
                    position: 'absolute',
                    top: event.pageY,
                    left: event.pageX,
                    color: 'gray',
                })

            })

            $('#blog-post').on('mousemove', function (event) {
                XMark.css('display', 'none');
            })

            $('.ask-add-blog').on('click', function () {
                $('.overlay').css({
                    'display': 'block',
                    'z-index': '1'
                });
                $('#blog-post').css({
                    'display': 'block',
                    'z-index': '2'
                });
                XMark.css('display', 'block');



            });

            // tags input technique
            tagsInput.on('keydown', function (event) {

                //console.log(event)
                event.stopPropagation();

                if (event.keyCode == 13) {
                    event.preventDefault();

                    $('<span class="after-enter">' + tagsInput.val() + ' <i class="fa fa-times" aria-hidden="true"></i> </span>')
                        .insertBefore(tagsInput);


                    getCurrentTags();

                    // style X mark
                    $('.after-enter i').css({
                        'margin-left': '5px',
                        'cursor': 'pointer'
                    });


                    $('.after-enter i').click(function () {
                        $(this).parent().remove();
                        getCurrentTags();

                    })

                    tagsInput.val('');
                    if ($('.after-enter').length >= 6) {
                        tagsInput.css('display', 'none');
                    }

                }

            });



            // function to get tags 
            function getCurrentTags() {
                $scope.tags = [];
                $('.after-enter i').each(function () {
                    $scope.tags.push($(this).parent().text());
                });
                console.log('the current array ' + $scope.tags);
            }


        }); // end og jquery code



    }) // end of controller


    .directive("ngFileSelect", function () {

        return {
            link: function ($scope, el) {

                el.bind("change", function (e) {

                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile();
                })

            }

        }


    })