(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$scope', 'FlashService', 'LocationService'];

    function RegisterController(UserService, $location, $scope, FlashService, LocationService) {
        var vm = this;

        vm.register = register;
        vm.fillLocationData = fillLocationData;

        (function initController() {
            LocationService.GetLocation()
                .then(function (response) {
                    $scope.countries = response;
                });
        })();

        function fillLocationData() {
            if ($scope.vm.user.country === 'USA') {
                LocationService.GetCityData()
                    .then(function (response) {
                        if (response !== null) {
                            $scope.vm.user.city = response.city !== null ? response.city : '';
                            $scope.vm.user.state = response.regionName !== null ? response.regionName : '';
                            $scope.vm.user.zip = response.zip !== null ? response.zip : '';
                        }
                    });
            } else {
                $scope.vm.user.city = '';
                $scope.vm.user.state = '';
                $scope.vm.user.zip = '';
            }
        }

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
