registrationModule.controller('paymentController', function($scope, $rootScope,$location, alertFactory, paymentRepository,localStorageService) {

    $scope.userData = localStorageService.get('userData');
    $rootScope.empleadoNombre="";
    $scope.loteNoAplicado = [];
    $scope.loteAplicado = [];

    $scope.panels = [
        { name: 'Pendiente', active: true, className: "active" },
        { name: 'Aplicado', active: false, className: "" }
    ];


    $scope.init = function() {
        $scope.getPaymentReport(5);
        $scope.getNoPaymentReport(1);
        $scope.getEmpleados();
    };

    $scope.getEmpleados = function(){
        if(!($('#lgnUser').val().indexOf('[') > -1)){
            localStorageService.set('lgnUser', $('#lgnUser').val());
            //$scope.getEmpleado();
        }
        else{
            if(($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')){
                if(getParameterByName('employee') != ''){
                    $rootScope.currentEmployee = getParameterByName('employee');
                    return;
                     $scope.getUsuario();
                    console.log('pasoaquidos')
                }
                else{
                    if($scope.userData == null){
                          alert('Inicie sesión desde panel de aplicaciones .');
                    //window.close(); 
                    location.href = '/';
                        
                    }else{
                        console.log('pasoaqui')
                        $rootScope.empleadoNombre = $scope.userData[0].nombre;
                 
                    }
                }
                
            }
        }
        //Obtengo el empleado logueado
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
    };
    
    $scope.getNoPaymentReport = function(idStatus) {

        $scope.promise = paymentRepository.getPaymentReport(idStatus).then(function(result) {
            if (result.data.length > 0) {
                $scope.loteNoAplicado = result.data;
                setTimeout(function() { $scope.setTablePaging('tblLoteNoAplicado'); }, 1000);
                //alertFactory.success("Pagos cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };


    $scope.getPaymentReport = function(idStatus) {

        $scope.promise = paymentRepository.getPaymentReport(idStatus).then(function(result) {
            if (result.data.length > 0) {
                $scope.loteAplicado = result.data;
                setTimeout(function() { $scope.setTablePaging('tblLoteAplicado'); }, 1000);
                //alertFactory.success("Pagos cargados");
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };


    $scope.allowEdit = function(idLote, idStatus) {

        switch (idStatus) {
            case 4:
                $location.path('/paymentdetail/' + idLote + '/' + idStatus + '/edit');
                break;
            case 2:
            case 3:
            case 1:
            case 5:
                $location.path('/paymentdetail/' + idLote + '/' + idStatus + '/review');
                break;
            default:
                $location.path('/paymentdetail/' + idLote + '/' + idStatus + '/review');
        }

    };



    $scope.setActiveClass = function(currentTab) {

        for (var i = 0; i < $scope.panels.length; i++) {
            $scope.panels[i].active = false;
            $scope.panels[i].className = "";
        }

        currentTab.active = true;
        currentTab.className = "active";

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
