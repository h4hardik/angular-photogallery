(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'ImageService', '$rootScope', '$scope'];

    function HomeController(UserService, ImageService, $rootScope, $scope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.loadFlickerImages = loadFlickerImages;

        initController();

        function initController() {
            loadCurrentUser();
            loadFlickerImages();
        }

        function loadCurrentUser() {
            $scope.username = $rootScope.globals.currentUser.username;
        }

        function loadFlickerImages(search) {
            vm.dataLoading = true;
            ImageService.loadImages(search).then(function (data) {
                $scope.pics = data.data.photos.photo;
                vm.dataLoading = false;
            });
        }
    }
})();