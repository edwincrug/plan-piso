registrationModule.controller('paymentController', function($scope, alertFactory, paymentRepository) {


    $scope.lote = [];
    $scope.loteDetalle = [];

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
                
        $scope.showModal('mdlDetail');
        $('#tblLoteDetalle').DataTable().destroy();
        

        $scope.promise = paymentRepository.getPaymentReportDetail(idLote).then(function(result) {
            if (result.data.length > 0) {
                $scope.loteDetalle = result.data;                
                setTimeout(function() { $scope.setTablePaging('tblLoteDetalle'); }, 1000);

                alertFactory.success("Detalles Cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        }); 
    };

    $scope.showModal = function(idModal) {
        $('#' + idModal).appendTo("body").modal('show');
    };

    $scope.closeModal = function(idModal) {
        $('#' + idModal).appendTo("body").modal('show');
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
