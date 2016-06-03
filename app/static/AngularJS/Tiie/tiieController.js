registrationModule.controller('tiieController', function ($scope, alertFactory, tiieRepository) {

    
    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
            $scope.getTiie();
            
        }
    // Metodo para obtiener todos los intereses
    $scope.getTiie = function () {
        $scope.promise = tiieRepository.getTiie().then(function (result) {
            if (result.data.length > 0) {
                $scope.tiies = result.data;
                alertFactory.success("Tiie cargado");
            } else {
                alertFactory.info("No se encontraron Tiie");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Tiie");
        });
    };
    // Función para iniciar la modal
    $scope.inicia = function () {
        $('#inicioModal').modal('show');
    };
    // Función para cerrar la modal
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    };
    
   /* $scope.addTiie = function (){
        tiieRepository.addTiie(fecha, plazo, monto).then(function(tiie){
            fecha: datetime.now;
            plazo : tiie.data.plazo;
            monto : tiie.data.monto;
        })
    }*/
});