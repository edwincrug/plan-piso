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
        getDetailsUnit: function(vehNumserie){
            return $http({
                url: interestsURL + 'detailsUnit/',
                method: "GET",
                params: {vehNumserie: vehNumserie},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }, 
        getCompany: function(){
            return $http({
                url: interestsURL + 'company/',
                method: "GET"
            });
        }, 
        getInterestSucursal: function(empresa,sucursal,financiera) {
            return $http({
                url: interestsURL + 'interestSucursal/',
                method: "GET",
                 params: {empresa:empresa ,
                          sucursal: sucursal,
                          financiera:financiera
                          },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getSucursal: function(nombreCorto) {
            return $http({
                url: interestsURL + 'sucursal/',
                method: "GET",
                 params: {nombreCorto: nombreCorto},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getFinancial: function(empresa) {
            return $http({
                url: interestsURL + 'financial/',
                method: "GET",
                 params: {empresa: empresa},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getFinancialForUnit: function(empresa,financiera) {
            return $http({
                url: interestsURL + 'financialForUnit/',
                method: "GET",
                 params: {empresa: empresa,
                         financiera:financiera},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
          getInterestFinanciera: function(empresa, financiera) {
            return $http({
                url: interestsURL + 'financialForUnit/',
                method: "GET",
                 params: {empresa: empresa,
                         financiera:financiera},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
        
        
    };
});
