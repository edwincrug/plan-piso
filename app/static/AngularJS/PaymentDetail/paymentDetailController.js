registrationModule.controller('paymentDetailController', function($scope, $routeParams, alertFactory, paymentDetailRepository) {

    $scope.loteDetalle = [];
    $scope.editControl = true;
    $scope.disableControl = false;

    $scope.init = function() {
        $scope.showDetail($routeParams.id);

         //loteDetalle[0].estatus 

        if ($routeParams.mode == 'review') {
            $scope.disableControl = true;
        }

    };


    $scope.showDetail = function(idLote) {

        $('#tblLoteDetalle').DataTable().destroy();

        $scope.promise = paymentDetailRepository.getPaymentReportDetail(idLote).then(function(result) {
            if (result.data.length > 0) {
                $scope.loteDetalle = result.data;
                setTimeout(function() { $scope.setTablePaging('#tblLoteDetalle'); }, 1000);

                alertFactory.success("Detalles Cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };


    $scope.cargoKeyUp = function(key, obj) {
        if (key.keyCode == 13) {
            if (!isNaN(obj.cargoAplicar)) {
                alertFactory.info("OK");
            }
        }
    };

    $scope.showconfirmBox = function(name) {
        $('#'+ name).appendTo("body").modal('show');
    };


    $scope.savePayment = function(objeto) {

        $scope.promise = paymentDetailRepository.updateUsrPayment(objeto.idLotePagoDetalle, objeto.cargoAplicar).then(function(result) {
            if (result.data.length > 0) {
                $scope.resultado = result.data;
                alertFactory.success("Dato Actualizado");
            } else {
                alertFactory.info("No Encontrado");
            }
        }, function(error) {
            alertFactory.error("Ocurrio un error al actualizar");
        });

    };



    $scope.setClass = function(objeto) {

        if (objeto.cargoAplicar != objeto.cargoCalculado)
            return "gridFontBlue";
        else
            return "";
    };


    $scope.setTablePaging = function(idTable) {
        $(idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            iDisplayLength: 5,
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
