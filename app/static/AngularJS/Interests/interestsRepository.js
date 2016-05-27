var interestsURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('interestsRepository', function($http) {

    return {        
        getInterest: function() {
            return $http({
                url: interestsURL + 'interest/',
                method: "GET"
            });
        }

    };
});
