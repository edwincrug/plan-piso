var interestsURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('interestsRepository', function($http) {

    return {        
        getInterest: function(Marca) {
            return $http({
                url: interestsURL + 'interest/',
                method: "GET",
                 params: {Marca: Marca},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getDetailsUnit: function(VEH_NUMSERIE){
            return $http({
                url: interestsURL + 'detailsUnit/',
                method: "GET",
                params: {VEH_NUMSERIE: VEH_NUMSERIE},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
    };
});
