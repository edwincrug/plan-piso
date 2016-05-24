var freeDaysURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('freeDaysRepository', function($http) {
    return {
        getFreeDays: function() {
            return $http({
                url: freeDaysURL + 'freedays/',
                method: "GET"
            });
        }
    };

});
