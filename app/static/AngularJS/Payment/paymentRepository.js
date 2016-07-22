var paymentURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('paymentRepository', function($http) {

    return {




        getPaymentReport: function() {
            return $http({
                url: paymentURL + 'paymentreport/',
                method: "GET"
            });
        },
        getPaymentReportDetail: function(idLote) {
            return $http({
                url: paymentURL + 'paymentreportdetail/',
                method: "GET",
                params: {
                    idLote: idLote
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        }








    };










});
