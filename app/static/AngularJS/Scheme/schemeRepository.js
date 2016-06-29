var schemeURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('schemeRepository', function($http) {

    return {        
        getEsquemaFinanciera: function(idFinanciera) {
            return $http({
                url: schemeURL + 'esquemafinanciera/',
                method: "GET",
                 params: {idFinanciera: idFinanciera },
                headers: {
                'Content-Type': 'application/json'
                }
                
            });
        },
        getDetailsScheme: function(idEsquema){
            return $http.get(schemeURL+'details/'+idEsquema);
        },
         getFinanciera: function() {
            return $http({
                url: schemeURL + 'financiera/',
                method: "GET"
            });
        },
        getDetalleEsquema: function(idEsquema,esfijo) {
            return $http({
                url: schemeURL + 'detalleEsquema/',
                method: "GET",
                 params: {idEsquema: idEsquema,
                         esfijo: esfijo},
                headers: {
                'Content-Type': 'application/json'
                }
                
            });
        },

        insertEsquema: function(diasGracia,plazo,idFinanciera,nombre,descripcion,esFijo,tasaInteres,rango,precedencia,porcentajePenetracion
                                ,idTiieTipo,fechaInicio,fechaFin,tiie) {
            var esquema ={
                diasGracia:diasGracia,
                plazo:plazo, 
                idFinanciera:idFinanciera
                , nombre:nombre, descripcion:descripcion, esFijo:esFijo
                , tasaInteres:tasaInteres, rango:rango,precedencia:precedencia, porcentajePenetracion:porcentajePenetracion
                , idTiieTipo:idTiieTipo, fechaInicio:fechaInicio, fechaFin:fechaFin
                , tiie:tiie
            }
            return $http({
                url: schemeURL + 'insertesquema/',
                method: "POST",
                 data: esquema,
                headers: {
                'Content-Type': 'application/json'
                }
                
            });
        }
        
};      
});

