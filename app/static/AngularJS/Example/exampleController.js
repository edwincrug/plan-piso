registrationModule.controller('exampleController', function($scope, exampleRepository, interestsRepository, schemeRepository, $rootScope, $location, alertFactory, localStorageService) {


    $scope.arrUnidades = [];
    $scope.arrUnidadesSeleccionadas = [];

    $scope.arrEmpresa = [];
    $scope.arrSucursal = [];
    $scope.arrFinanciera = [];


    $scope.idCompaniaActual = 0;
    $scope.idSucursalActual = 0;
    $scope.idFinancieraActual = 0;
    $scope.unidadesTotales = 0;


    $scope.showWizzard = false;
    
    $scope.wizardPanels = [
        { tabIndex: 0, name: 'Seleccionar Unidades', active: true, className: 'current', previous: 'disabled', next: '' },
        { tabIndex: 1, name: 'Seleccionar Esquema', active: false, className: 'done', previous: '', next: '' },
        { tabIndex: 2, name: 'Asignar Esquema', active: false, className: 'done', previous: '', next: 'disabled' }
    ];

    $scope.btnDisabled = [{ previous: 'disabled', next: '' }];
    $scope.tabIndex = 0;

    $scope.setNext = function(index) {

        $scope.tabIndex = parseInt(index) + 1;

        if ($scope.tabIndex >= $scope.wizardPanels.length) {
            $scope.tabIndex -= 1;
            return;
        }

        $scope.setActiveClass($scope.wizardPanels[$scope.tabIndex]);

    };


    $scope.setBack = function(index) {

        $scope.tabIndex = parseInt(index) - 1;

        if ($scope.tabIndex < 0) {
            $scope.tabIndex += 1;
            return;
        }

        $scope.setActiveClass($scope.wizardPanels[$scope.tabIndex]);
    };

    $scope.setActiveClass = function(currentTab) {

        for (var i = 0; i < $scope.wizardPanels.length; i++) {
            $scope.wizardPanels[i].active = false;
            $scope.wizardPanels[i].className = "done";
        }

        currentTab.active = true;
        currentTab.className = "current";

        $scope.btnDisabled[0].previous = currentTab.previous;
        $scope.btnDisabled[0].next = currentTab.next;
        $scope.tabIndex = currentTab.tabIndex;
        window.scrollTo(0, 0);
    };



    $scope.init = function() {


        $scope.getNewUnits();
        $scope.getCompany();
        // $scope.getFinanciera();


    };

    $scope.fillSucursal = function(objEmpresa) {

        $scope.getSucursal(objEmpresa.idEmpresa);

    };


    $scope.getNewUnits = function() {
        $scope.promise = exampleRepository.getNewUnits().then(function(result) {
            if (result.data.length > 0) {
                $scope.arrUnidades = result.data;
                $scope.unidadesTotales = $scope.arrUnidades.length;                        
                setTimeout(function() { $scope.setTablePaging('tblNewUnits'); }, 1);
            } else {
                alertFactory.info("No se encontraron detalles");
            }
        }, function(error) {
            alertFactory.error("Error al cargar detalles");
        });
    };



    $scope.getFinanciera = function() {
        $scope.promise = schemeRepository.getFinanciera().then(function(result) {
            if (result.data.length > 0) {
                $scope.arrFinanciera = result.data;
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function(error) {
            alertFactory.error("Error al cargar financieras");
        });
    };

    $scope.getCompany = function() {
        $scope.promise = interestsRepository.getCompany().then(function(result) {
            if (result.data.length > 0) {
                $scope.arrEmpresa = result.data;
            } else {
                alertFactory.info("No se encontraron Empresas");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Empresas");
        });
    };

    $scope.getSucursal = function(idEmpresa) {
        $scope.promise = interestsRepository.getSucursal(idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.arrSucursal = result.data;
                console.log($scope.arrSucursal);
            } else {
                alertFactory.info("No se encontraron Sucursales");
            }
        }, function(error) {
            alertFactory.error("Error al cargar Sucursales");
        });
    };


    $scope.setUnidad = function(objRow) {

        if ($scope.arrUnidadesSeleccionadas.length == 0 || !$scope.rowExist(objRow.idUnidad, $scope.arrUnidadesSeleccionadas)) {
            $scope.arrUnidadesSeleccionadas.push(objRow);
        } else {
            $scope.removeRow(objRow.idUnidad, $scope.arrUnidadesSeleccionadas);
        }

    };


    $scope.rowExist = function(value, objRow) {

        for (var i = 0; i < objRow.length; i++) {
            if (objRow[i].idUnidad == value) {
                return true;
            }
        }
        return false;
    };


    $scope.removeRow = function(value, objRow) {

        var index = -1;
        var dataArr = eval(objRow);

        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].idUnidad === value) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("No hay registros");
        }

        objRow.splice(index, 1);
    };

    $scope.setFinancial = function(modal) {
        //$('#mdlChangeFinancial').appendTo("body").modal('show');      
        $scope.showWizzard = true;
    };



    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            // iDisplayLength: 5,
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
