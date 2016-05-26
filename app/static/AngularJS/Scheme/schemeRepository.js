var schemeURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('schemeRepository', function($http) {

    return {        
        getScheme: function() {
            return $http({
                url: interestsURL + 'scheme/',
                method: "GET"
            });
        }

    };

});
