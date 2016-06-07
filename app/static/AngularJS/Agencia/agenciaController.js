registrationModule.controller('agenciaController', function($scope, alertFactory, agenciaRepository) {
    //store an array of free days getting by getFreeDays function  
    $scope.interes = {};
    $scope.message = 'Buscando...';
    // Primer metodo llamado al cargar la pagína
    $scope.init = function() {
            $scope.getInterest();
        };
        // Metodo para obtiener todos los intereses y los datos para llenar los dashboards
    $scope.getInterest = function() {
            $scope.promise = agenciaRepository.getInterest().then(function(result) {
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
                    $scope.unidadesRestantes = 0;
                    $scope.interesRestante = 0;
                    $scope.porcentajeRestante = 0;
                    $scope.total = 0;
                    setTimeout(function() {
                        $('.dataTables-example').DataTable({
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
                                },

                                {
                                    extend: 'print',
                                    customize: function(win) {
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
                            $scope.interesUnidadesVencidas += (result.data[i].interesAcumulado);
                            $scope.unidadesVencidas += 1;
                                // $scope.interesUnidadesPorVencidas = (result.data[i].interesAcumulado)
                        } else
                        if (result.data[i].diasPlanPiso <= 179 && result.data[i].diasPlanPiso >= 170) {
                            $scope.interesUnidadesPorVencidas += (result.data[i].interesAcumulado);
                            $scope.unidadesPorVencer += 1;
                        }
                        $scope.total += (result.data[i].interesAcumulado);
                        $scope.porcentajeTotalUnidades = 100;
                        $scope.porcentajeVencido = ($scope.unidadesVencidas * 100) / $scope.unidades;
                        $scope.porcentajePorVencer = ($scope.unidadesPorVencer * 100) / $scope.unidades;
                        $scope.porcentajeRestante = ($scope.porcentajeTotalUnidades - $scope.porcentajeVencido) - $scope.porcentajePorVencer;
                        $scope.unidadesRestantes = $scope.unidades - $scope.unidadesPorVencer - $scope.unidadesVencidas;
                        $scope.interesRestante = $scope.total - $scope.interesUnidadesPorVencidas - $scope.interesUnidadesVencidas;
                    }
                    alertFactory.success("Intereses cargados");
                } else {
                    alertFactory.info("No se encontraron intereses");
                }
            }, function(error) {
                alertFactory.error("Error al cargar intereses");
            });
        };
        // Función para el ng-class en el campo status
    $scope.setClass = function(status) {
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
    // Función para el ng-class en el campo días
    $scope.setClassDias = function(dias) {
        if (dias == 180) {
            return 'gridFontRed';
        } else {
            return 'gridFontGreen';
        }
    };
    // Función Principal para los filtros
    $scope.rangeFilter = function() {
        $.fn.dataTable.ext.search.push(
            function(settings, data, dataIndex) {
                var min = parseInt($('#min').val(), 10);
                var max = parseInt($('#max').val(), 10);
                var age = parseFloat(data[3]) || 0;

                if ((isNaN(min) && isNaN(max)) ||
                    (isNaN(min) && age <= max) ||
                    (min <= age && isNaN(max)) ||
                    (min <= age && age <= max)) {
                    return true;
                }

                return false;
            }
        );

    };
    // Función para filtro de todas las unidades
    $scope.getTotalInterest = function() {
        $('#min').val('');
        $('#max').val('');
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    };
    // Función para filtro unidades por vencer
    $scope.getAlmostEndingInterest = function() {
        $('#min').val(170);
        $('#max').val(179);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();

    };
    // Función para filtro unidades vencidas
    $scope.getEndingInterest = function() {
        $('#min').val(180);
        $('#max').val(180);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    };
    // Función para filtro unidades restantes
    $scope.getNormalInterest = function() {
        $('#min').val(30);
        $('#max').val(169);
        $scope.rangeFilter();
        $('#interestTable').DataTable().draw();
    };

});
