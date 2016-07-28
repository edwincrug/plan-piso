registrationModule.controller('paymentController', function($scope, $location, alertFactory, paymentRepository) {


    $scope.lote = [];


    $scope.init = function() {

        $scope.getPaymentReport();
    };

    $scope.getPaymentReport = function() {

        $scope.promise = paymentRepository.getPaymentReport().then(function(result) {
            if (result.data.length > 0) {
                $scope.lote = result.data;
                setTimeout(function() { $scope.setTablePaging('tblLote'); }, 1000);
                alertFactory.success("Pagos cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };


    $scope.showDetail = function(idLote) {
        $location.path('/paymentdetail/' + idLote +'/add' );
    };




    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                extend: 'copy'
            }, {
                extend: 'csv'
            }, {
                extend: 'excel',
                title: 'ExampleFile'
            }, {
                extend: 'pdf',
                title: 'ExampleFile'
            }, {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }]
        });

    };








});
