(function () {
    'use strict';

    angular
        .module('app')
        .factory('LocationService', LocationService);

    LocationService.$inject = ['$http'];

    function LocationService($http) {

        var service = {};
        service.GetLocation = GetAllLocation;
        service.GetCityData = GetCityData;
        return service;

        function GetAllLocation() {
            return $http.get('json/location.json').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetCityData() {
            return $http.get('http://ip-api.com/json').then(handleSuccess, handleError('Error getting all users'));
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();