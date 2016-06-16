registrationModule.controller('freeDaysController', function($scope, alertFactory, freeDaysRepository) {

    //store an array of free days getting by getFreeDays function
    $scope.allDays = {};
    $scope.message = 'Buscando...';
    //Primer metodo inicial
    $scope.init = function() {
        $scope.getFreeDays();
    };
    // Función para pintar los estatus de los días
    $scope.setClass = function(status) {
        switch (status) {
            case 'OK':
                return 'gridFontGreen';
            case 'CHECK':
                return 'gridFontYellow';
            case 'OUTDATE':
                return 'gridFontRed';
            default:
                return 'gridFontGreen';
        }
    };

    //Función para mostrar las unidades en pla piso
    $scope.getFreeDays = function() {
        $scope.promise = freeDaysRepository.getFreeDays().then(function(result) {
            if (result.data.length > 0) {
                $scope.allDays = result.data;
                $scope.freeOk = 0;
                $scope.freeOut = 1;
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

                alertFactory.success("Datos cargados");
            } else {
                alertFactory.info("No se encontraron datos");
            }
        }, function(error) {
            // $('#btnTest').button('buscando');
            alertFactory.error("Error al cargar datos");
        });
    };
});
