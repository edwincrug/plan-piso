var interestsURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('interestsRepository', function($http) {

    return {

        getFreeDays: function() {
            return $http({
                url: interestsURL + 'freedays/',
                method: "GET"
            });
        }

    };

});
