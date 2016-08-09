var paymentURL = global_settings.urlCORS + 'api/calculo/';


registrationModule.factory('paymentDetailRepository', function($http) {

    return {




      //  updateScheme: function (idEsquema,vehNumserie) {
        updateUsrPayment: function (idDetallePago,monto) {
            return $http({
                url: interestsURL + 'updateusrpayment/',
                method: "POST",
                data: {
                    idDetallePago: idDetallePago,
                    monto: monto
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
