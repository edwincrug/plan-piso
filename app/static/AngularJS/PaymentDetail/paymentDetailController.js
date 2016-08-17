registrationModule.controller('paymentDetailController', function($scope, $location, $routeParams, alertFactory, paymentDetailRepository) {

    $scope.mdlMessage = "";
    $scope.mdlCurrent = 0;
    $scope.mdlAction = { enviar: 1, rechazar: 2, aprobar: 3 };

    //Variables que actuan sobre el grid
    $scope.loteDetalle = [];
    $scope.editControl = true;
    $scope.disableControl = false;

    //varibles de los botones de accion
    $scope.showbtnConfirm = false;
    $scope.showbtnSend = false;


    $scope.init = function() {

        $scope.showDetail($routeParams.id);
        $scope.setButtons($routeParams.lotStatus);

        if ($routeParams.mode == 'review') {
            $scope.disableControl = true;
        }
    };



    $scope.setButtons = function(idStatus) {

        switch (parseInt(idStatus)) {
            case 4:
                $scope.showbtnConfirm = false;
                $scope.showbtnSend = true;
                break;
            case 1:
                $scope.showbtnConfirm = true;
                $scope.showbtnSend = false;
                break;
            default:
                $scope.showbtnConfirm = false;
                $scope.showbtnSend = false;
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

    $scope.execActionConfirmBox = function() {

        switch ($scope.mdlCurrent) {
            case $scope.mdlAction.enviar:
                $location.path('/payment/');
                alertFactory.info("Enviado");
                break;
            case $scope.mdlAction.rechazar:
                $location.path('/payment/');
                alertFactory.info("Rechazado");
                break;
            case $scope.mdlAction.aprobar:
                $location.path('/payment/');
                alertFactory.info("Aprobado");
                break;
            default:
                $scope.mdlMessage = "";
        }
        $scope.mdlCurrent = 0;
    };


    $scope.showconfirmBox = function(type) {

        $scope.mdlMessage = "";
        $scope.mdlCurrent = 0;

        switch (type) {
            case $scope.mdlAction.enviar:
                $scope.mdlCurrent = $scope.mdlAction.enviar;
                $scope.mdlMessage = "El lote será enviado para aprobación. \n ¿Desea continuar?";
                break;
            case $scope.mdlAction.rechazar:
                $scope.mdlCurrent = $scope.mdlAction.rechazar;
                $scope.mdlMessage = "¿Esta seguro de rechazar el lote?";
                break;
            case $scope.mdlAction.aprobar:
                $scope.mdlCurrent = $scope.mdlAction.aprobar;
                $scope.mdlMessage = "¿Esta seguro de Aprobar el lote?";
                break;
            default:
                $scope.mdlCurrent = 0;
                $scope.mdlMessage = "";
        }

        $('#mldConfirmBox').appendTo("body").modal('show');
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
            order: [
                [0, "desc"]
            ],
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
