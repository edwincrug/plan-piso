registrationModule.controller('schemeController', function ($scope, alertFactory, schemeRepository) {
    
    $scope.message = 'Buscando...';
     $scope.esquemas = {};
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
            $scope.getScheme();
            $scope.grafica(); 
        }
        // Metodo para obtiener todos los intereses
    $scope.getScheme = function () {
        $scope.promise = schemeRepository.getScheme().then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }

    $scope.grafica = function () {
         var d1 = [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302]];
         var d2 = [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062]];
         var data1 = [
            {
                label: "Data 1"
                , data: d1
                , color: '#17a084'
            }
            , {
                label: "Data 2"
                , data: d2
                , color: '#127e68'
            }
            ];
        $.plot($("#flot-chart1"), data1, {
            xaxis: {
                tickDecimals: 0
            }
            , series: {
                lines: {
                    show: true
                    , fill: true
                    , fillColor: {
                        colors: [{
                            opacity: 1
                            }, {
                            opacity: 1
                            }]
                    }
                , }
                , points: {
                    width: 0.1
                    , show: false
                }
            , }
            , grid: {
                show: false
                , borderWidth: 0
            }
            , legend: {
                show: false
            , }
        });
         var lineData = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"]
            , datasets: [
                {
                    label: "Example dataset"
                    , fillColor: "rgba(220,220,220,0.5)"
                    , strokeColor: "rgba(220,220,220,1)"
                    , pointColor: "rgba(220,220,220,1)"
                    , pointStrokeColor: "#fff"
                    , pointHighlightFill: "#fff"
                    , pointHighlightStroke: "rgba(220,220,220,1)"
                    , data:[15, 40, 23, 45] // modificar para tener datos desde la base de datos
                    }
                , {
                    label: "Example dataset"
                    , fillColor: "rgba(26,179,148,0.5)"
                    , strokeColor: "rgba(26,179,148,0.7)"
                    , pointColor: "rgba(26,179,148,1)"
                    , pointStrokeColor: "#fff"
                    , pointHighlightFill: "#fff"
                    , pointHighlightStroke: "rgba(26,179,148,1)"
                    , data: [10, 55, 56, 45]// modificar para tener datos desde la base de datos
                    }
                ]
        };
        var  lineOptions = {
            scaleShowGridLines: true
            , scaleGridLineColor: "rgba(0,0,0,.05)"
            , scaleGridLineWidth: 1
            , bezierCurve: true
            , bezierCurveTension: 0.4
            , pointDot: true
            , pointDotRadius: 4
            , pointDotStrokeWidth: 1
            , pointHitDetectionRadius: 20
            , datasetStroke: true
            , datasetStrokeWidth: 2
            , datasetFill: true
            , responsive: true
         };
             var ctx = document.getElementById("lineChart").getContext("2d");
             var myNewChart = new Chart(ctx).Line(lineData, lineOptions);
    };
     $scope.inicia = function () {
        $('#inicioModal').modal('show');
    };
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    };
});