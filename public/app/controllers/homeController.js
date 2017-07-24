angular.module('homeController', ['newsService'])
    .controller('homeCtrl', function ($location, $scope, $route, newsService) {

        var app = this;

        // app.Test = function () {
        //     newsService.getImage().then(function (data) {
        //         if (data.data.success)
        //         $scope.news = data.data.message;
        //         $scope.images = data.data.newsImages;
        //         $scope.sponsers = data.data.newsSponsers;
        //         $scope.firstSponser = $scope.sponsers[0];
        //         $scope.sponsers.splice(0, 1); // to remove first sponser to display it in a seperated div
        //         $scope.restOfSponsers = $scope.sponsers
        //         $scope.newsDate = data.data.Date;
        //         console.log($scope.images);
        //     }, function (error) {
        //         console.log(error);
        //     })
        // }

        // app.Test();

        // //jquery code
        // $(function () {
        //     // merquee  
        //     $('.marquee').width($('#div1').width());

        //     // navigation code
        //     // $('.navigator div button:first-child').css('display','none');
        //     $('.navigator div button:not(:last-child):not(:first-child)').click(function () {
        //         $('.navigator div button').removeClass("active");
        //         $(this).addClass("active");
        //     })

        //      $('.navigator div button:last-child').click(function(){
        //          $('.navigator div button:first-child').css('display','inline-block');
        //         if($('.navigator div button:not(:last-child).active'))
        //         {
        //             $('.navigator div button:not(:last-child).active').removeClass('active').next().addClass('active');
        //         }
        //        // $('.navigator div button').removeClass("active");
        //         $(this).removeClass("active");
                
        //      })


            //   $('.navigator div button:first-child').click(function(){
            //     // if($('.navigator div button:not(:last-child).active'))
            //     // {
            //         $('.navigator div button:not(:last-child).active').removeClass('active').prev().addClass('active');
            //     // }
            //    // $('.navigator div button').removeClass("active");
            //     $(this).removeClass("active");
                
            //  })
            
       // }) //end of jquery code

    })

