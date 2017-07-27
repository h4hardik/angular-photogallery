(function () {
    'use strict';

    angular
        .module('app')
        .service('ImageService', ImageService);

    ImageService.$inject = ['$http', '$q'];

    function ImageService($http, $q) {
        this.api_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2908eab3a28884c5f400673922558a7d&format=json&nojsoncallback=1&text=cats&extras=url_s';
        this.loadImages = function (search) {
            this.api_url = (search != null && search.length > 0) ? this.api_url + '&text=' + search : this.api_url;
            return $http.get(this.api_url);
        };
    }
})();