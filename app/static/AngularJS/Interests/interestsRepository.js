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
        getInterestSucursal: function(idEmpresa,idSucursal,idFinanciera) {
            return $http({
                url: interestsURL + 'interestSucursal/',
                method: "GET",
                 params: {idEmpresa:idEmpresa ,
                          idSucursal: idSucursal,
                          idFinanciera:idFinanciera
                          },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getSucursal: function(idEmpresa) {
            return $http({
                url: interestsURL + 'sucursal/',
                method: "GET",
                 params: {idEmpresa: idEmpresa },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getFinancial: function(idEmpresa) {
            return $http({
                url: interestsURL + 'financial/',
                method: "GET",
                 params: {idEmpresa : idEmpresa },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        /*getFinancialForUnit: function(empresa,financiera) {
            return $http({
                url: interestsURL + 'financialForUnit/',
                method: "GET",
                 params: {empresa: empresa,
                         financiera:financiera},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },*/
        getInterestFinanciera: function(idEmpresa, idFinanciera) {
            return $http({
                url: interestsURL + 'financialForUnit/',
                method: "GET",
                 params: {idEmpresa: idEmpresa,
                         idFinanciera:idFinanciera},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }     
    };
});
