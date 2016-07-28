var paymentURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('paymentRepository', function($http) {

    return {




        getPaymentReport: function(idStatus) {
            return $http({
                url: paymentURL + 'paymentreport/',
                method: "GET",
                params: {
                    idStatus: idStatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
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
