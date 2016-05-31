var tiieURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('tiieRepository', function($http) {

    return {        
        getTiie: function() {
            return $http({
                url: tiieURL + 'tiie/',
                method: "GET"
            });
        }

    };
});