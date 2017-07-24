angular.module('userApp', ['appRoutes','mainController','userControllers','userServices','authServices','postController','blogController','blogServices','fileModelDirective','newsService' , 'homeController']) 

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});