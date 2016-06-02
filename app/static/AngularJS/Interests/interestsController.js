registrationModule.controller('interestsController', function ($scope, alertFactory, interestsRepository) {
    //store an array of free days getting by getFreeDays function  
    $scope.interes = {};
    $scope.message = 'Buscando...';
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
        $scope.getInterest();
    }

    // Metodo para obtiener todos los intereses y los datos para llenar los dashboards
    $scope.getInterest = function () {
        $scope.promise = interestsRepository.getInterest().then(function (result) {
            if (result.data.length > 0) {
                $scope.interes = result.data;
                $scope.unidades = result.data.length;
                $scope.unidadesVencidas = 0;
                $scope.interesUnidadesVencidas = 0;
                $scope.interesUnidadesPorVencidas = 0;
                $scope.unidadesPorVencer = 0;
                $scope.porcentajeTotalUnidades = 0;
                $scope.porcentajePorVencer = 0;
                $scope.porcentajeVencido = 0;
                $scope.total = 0;
                setTimeout(function () {
                    $('.dataTables-example').DataTable({
                        dom: '<"html5buttons"B>lTfgitp'
                        , buttons: [{
                                extend: 'copy'
                            }, {
                                extend: 'csv'
                            }, {
                                extend: 'excel'
                                , title: 'ExampleFile'
                            }, {
                                extend: 'pdf'
                                , title: 'ExampleFile'
                            },

                            {
                                extend: 'print'
                                , customize: function (win) {
                                    $(win.document.body).addClass('white-bg');
                                    $(win.document.body).css('font-size', '10px');

                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ]
                    });
                }, 1000);
                for (var i = 0; i < result.data.length; i++) {

                    if (result.data[i].diasPlanPiso >= 180) {
                        $scope.interesUnidadesVencidas += (result.data[i].interesAcumulado) + (result.data[i].precioCompra)
                        $scope.unidadesVencidas += 1
                        $scope.interesUnidadesPorVencidas = (result.data[i].interesAcumulado)
                    } else
                    if (result.data[i].diasPlanPiso < 180 && result.data[i].diasPlanPiso > 170) {
                        // $scope.interesUnidadesPorVencidas += (result.data[i].interesAcumulado)
                        $scope.unidadesPorVencer += 1
                    }
                    $scope.total += (result.data[i].interesAcumulado)
                    $scope.porcentajeTotalUnidades = 100
                    $scope.porcentajeVencido = ($scope.unidadesVencidas * 100) / $scope.unidades
                    $scope.porcentajePorVencer = ($scope.unidadesPorVencer * 100) / $scope.unidades
                }
                alertFactory.success("Intereses cargados");
            } else {
                alertFactory.info("No se encontraron intereses");
            }
        }, function (error) {
            alertFactory.error("Error al cargar intereses");
        });
    }

    $scope.setClass = function (status) {
        switch (status) {
        case 'OK':
            return 'gridFontGreen';
        case 'CHECK':
            return 'gridFontYellow';
        case 'EXCEEDED':
            return 'gridFontRed';
        default:
            return 'gridFontGreen';
        }
    };
    $scope.setClassDias = function (dias) {
        if (dias == 180) {
            return 'gridFontRed';
        } else {
            return 'gridFontGreen';
        }
    };
});