registrationModule.controller('schemeController', function ($scope, alertFactory, schemeRepository) {

    $scope.message = 'Buscando...';
    $scope.tasaFecha = '';
    $scope.tasaRango = '';
    $scope.esquema = [];

    

    $scope.lstSchemeType =[
    {value:true,text:'Esquema por rango de fechas'},
    {value:false,text:'Esquema por rango de días'}
    ];

    $scope.selectedOption = $scope.lstSchemeType[0];

    // Primer metodo llamado al cargar la pagína
    $scope.init = function () {
            $scope.getFinanciera();
            $scope.getEsquemaFinanciera.show = false;            
        }
        // Función para seleccionar las financieras y mostrar la tabla con los esquemas 
    $scope.seleccionarFinanciera = function (idFinanciera, nombreFinanciera) {
            $scope.idFinanciera = idFinanciera;
            $scope.nombreFinanciera = nombreFinanciera;
            $scope.getEsquemaFinanciera();
            $scope.getEsquemaFinanciera.show = true;
        }
        // Función para mostrar las financieras disponibles
    $scope.getFinanciera = function () {
        $scope.promise = schemeRepository.getFinanciera().then(function (result) {
            if (result.data.length > 0) {
                $scope.financieras = result.data;
                //$scope.diasGracia = result.data.diasGracia;
                alertFactory.success("financieras cargados");
            } else {
                alertFactory.info("No se encontraron financieras");
            }
        }, function (error) {
            alertFactory.error("Error al cargar financieras");
        });
    }

    // Funcion para llamar modal con detalles de esquemas
    $scope.seleccionarEsquema = function (idEsquema, esFijo) {
        $('#detallesEsquemas').appendTo("body").modal('show');
        $scope.idEsquema = idEsquema;
        $scope.esFijo = esFijo;
        $scope.getDetalleEsquema();
        $scope.nombreEsquema = '';
        if ($scope.esFijo == 1) {
            console.log($scope.esFijo);
            $scope.nombreEsquema = 'Tasa por Fechas';
            $scope.tasaRango.show = false;
            $scope.tasaFecha.show = true;
        } else {
            $scope.nombreEsquema = 'Tasa por Rango';
            $scope.tasaFecha.show = false;
            $scope.tasaRango.show = true;
            console.log($scope.esFijo);
        }
    }

    $scope.tasaFecha = function () {

    }
    $scope.tasaRango = function () {

    }

    // Metodo para mostrar los esquemas por financiera
    $scope.getEsquemaFinanciera = function () {
        $('#esquemasFinanciera').DataTable().destroy();
        $scope.promise = schemeRepository.getEsquemaFinanciera($scope.idFinanciera).then(function (result) {
            if (result.data.length > 0) {
                $scope.esquemas = result.data;
                setTimeout(function () {
                    $('#esquemasFinanciera').DataTable({
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
                            }

                            
                            , {
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
                alertFactory.success("Esquemas cargados");
            } else {
                alertFactory.info("No se encontraron Esquemas");
            }
        }, function (error) {
            alertFactory.error("Error al cargar Esquemas");
        });
    }

    // Función para mostrar detalles del esquema
    $scope.getDetalleEsquema = function () {
        $scope.promise = schemeRepository.getDetalleEsquema($scope.idEsquema, $scope.esFijo).then(function (result) {
            if (result.data.length > 0) {
                $scope.detalleEsquema = result.data;
                alertFactory.success("destalles cargados");
            } else {
                alertFactory.info("No se encontraron destalles");
            }
        }, function (error) {
            alertFactory.error("Error al cargar destalles");
        });
    }

    // Función para llamar la modal
    $scope.nuevoEsquema = function () {
        $('#agregarNuevoEsquema').appendTo("body").modal('show');
        $scope.calendario();
    };
    // Función para cerrar la modal
    $scope.cerrar = function () {
        $('#inicioModal').modal('toggle');
    };
    // Función para cargar calendario
    $scope.calendario = function () {
            $('#calendar .input-group.date').datepicker({
                todayBtn: "linked"
                , keyboardNavigation: true
                , forceParse: false
                , calendarWeeks: true
                , autoclose: true
                , todayHighlight: true
            });
        }


        //Expresiones Regulares 
        var expresion =
        {
            todo:'.',
            entero:'^\\d+$',
            entero1:'^\\d{1,3}$',
            decimal:'^-?[0-9]+([,\\.][0-9]*)?$',
            decimal1:'^\\d{1,2}(\\.\\d{1,4})?$'

        };




        $scope.getControlByRange = function(){

            var controlesPorRango =[
                    { value:$scope.esquema.diasGracia,name: 'Días de gracia', regExp:expresion.entero1},
                    { value:$scope.esquema.plazo,name: 'Plazo', regExp:expresion.entero1},
                    { value:$scope.esquema.nombre,name: 'Nombre', regExp: expresion.todo},
                    { value:$scope.esquema.descripcion,name: 'Descripción', regExp:expresion.todo},
                    { value:$scope.esquema.tasaInteres,name: 'Tasa interes', regExp:expresion.decimal1},
                    { value:$scope.esquema.rango,name: 'Rango', regExp:expresion.entero1},
                    { value:$scope.esquema.precedencia,name: 'Precedencia', regExp:expresion.entero1},
                    { value:$scope.esquema.porcentajePenetracion,name: 'Porcentaje penetración', regExp:expresion.decimal1},
                    { value:$scope.esquema.idTiieTipo,name: 'TIIE tipo', regExp:expresion.entero1},                
                ];

                return controlesPorRango;
        };


        $scope.getControlByDate = function(){
            var controlesPorFecha =[
                    { value:$scope.esquema.diasGracia,name: 'Días de gracia', regExp:expresion.entero1},
                    { value:$scope.esquema.plazo,name: 'Plazo', regExp:expresion.entero1},
                    { value:$scope.esquema.nombre,name: 'Nombre', regExp: expresion.todo},
                    { value:$scope.esquema.descripcion,name: 'Descripción', regExp:expresion.todo},
                    { value:$scope.esquema.tasaInteres,name: 'Tasa interes', regExp:expresion.decimal1},                
                    { value:$scope.esquema.porcentajePenetracion,name: 'Porcentaje penetración', regExp:expresion.decimal1},                
                    { value:$scope.esquema.fechaInicio,name: 'Fecha inicio', regExp:expresion.todo},
                    { value:$scope.esquema.fechaFin,name: 'Fecha fin', regExp:expresion.todo},
                    { value:$scope.esquema.tiie,name: 'TIIE', regExp:expresion.decimal1}
                ];

                return controlesPorFecha;
        };




        $scope.formIsValid = function(controls){

            var esValido =  false;
            
            for (i = 0; i < controls.length; i++) {

                if(controls[i].value == null || controls[i].value == ''){
                alertFactory.info(controls[i].name +  ' es requerido');
                esValido = false;
                break;
                }

                var pattern =  new RegExp(controls[i].regExp);   
                //console.log(pattern,controls[i].value, pattern.test(controls[i].value)); 
                if(pattern.test(controls[i].value) == false ){
                alertFactory.info(controls[i].name +  ' formato no correcto');
                esValido = false;
                break;
                }

                esValido=true;
            }

            return esValido;

        };



    $scope.clearControls = function (){

        $scope.esquema.diasGracia = null;
        $scope.esquema.plazo = null;
        // $scope.idFinanciera = null;
        $scope.esquema.nombre = null;
        $scope.esquema.descripcion = null;
        $scope.checked = false;
        $scope.esquema.tasaInteres = null;
        $scope.esquema.rango = null;
        $scope.esquema.precedencia = null;
        $scope.esquema.porcentajePenetracion = null;
        $scope.esquema.idTiieTipo = null;
        $scope.esquema.fechaInicio = null;
        $scope.esquema.fechaFin = null;
        $scope.esquema.tiie = null;


    };



    $scope.lstDateScheme =[];
    $scope.indexDate =1;

    $scope.addByDate = function ()
    {
        var controlsToValidate = $scope.getControlByDate();
        
        if(!$scope.formIsValid(controlsToValidate)) return;
        

        var scheme = { 
            indexDate: $scope.indexDate++,
            diasGracia: $scope.esquema.diasGracia,
            plazo: $scope.esquema.plazo,
            nombre: $scope.esquema.nombre,
            descripcion: $scope.esquema.descripcion,
            tasaInteres: $scope.esquema.tasaInteres,
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            fechaInicio: $scope.esquema.fechaInicio,
            fechaFin: $scope.esquema.fechaFin,
            tiie: $scope.esquema.tiie,            
        }

        
        $scope.lstDateScheme.push(scheme);    
        $scope.clearControls();
    };


    $scope.removeDateRow= function(value)
    {

        var index = -1;     
        var dataArr = eval( $scope.lstDateScheme );

        for( var i = 0; i < dataArr.length; i++ ) {
            if( dataArr[i].indexDate === value ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }

        $scope.lstDateScheme.splice( index, 1 );    

    

    };


    $scope.lstRangeScheme =[];
    $scope.indexRange =1;

    $scope.addByRange = function ()
    {

        var controlsToValidate = $scope.getControlByRange();
        
        if(!$scope.formIsValid(controlsToValidate)) return;


        var scheme = { 
            indexRange: $scope.indexRange++,
            diasGracia: $scope.esquema.diasGracia,
            plazo: $scope.esquema.plazo,
            nombre: $scope.esquema.nombre,
            descripcion: $scope.esquema.descripcion,
            tasaInteres: $scope.esquema.tasaInteres,
            rango: $scope.esquema.rango,
            precedencia: $scope.esquema.precedencia,
            porcentajePenetracion: $scope.esquema.porcentajePenetracion,
            idTiieTipo: $scope.esquema.idTiieTipo
        }


        $scope.lstRangeScheme.push(scheme);    
        $scope.clearControls();

    };


     $scope.removeRangeRow= function(value)
    {

        var index = -1;     
        var dataArr = eval( $scope.lstRangeScheme );

        for( var i = 0; i < dataArr.length; i++ ) {
            if( dataArr[i].indexRange === value ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }

        $scope.lstRangeScheme.splice( index, 1 );    

      
    };



    $scope.showConfirmSave = function () {

       swal({
                        title: "¿Estas seguro?",
                        text: "No se podrá  deshacer la accion",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, Guardar",
                        cancelButtonText: "No, cancelar",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function (isConfirm) {
                        if (isConfirm) { 

                            swal("Guardado", "Guardar", "success"); 
                            insertEsquemas();

                        } else {
                            swal("Cancelado", "No se guardo", "error");
                        }        

                    });
}






$scope.showConfirmDelete = function (type,index) {

       swal({
                        title: "¿Estas seguro?",
                        text: "No se podrá  deshacer la accion",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, Eliminar",
                        cancelButtonText: "No, cancelar",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function (isConfirm) {
                        if (isConfirm) {                        


                            if(type==1) //elimina por fecha
                            {
                            $scope.removeDateRow(index);
                            swal("Eliminado", "Eliminado", "success"); 
                            }


                            if(type==2) //elimina por Rango
                            {
                            $scope.removeDateRow(index);
                            swal("Eliminado", "Eliminado", "success"); 
                            }

                        } else {
                            swal("Cancelado", "No se elimino", "error");
                        }        

                    });
}



$scope.insertEsquemas = function () {

        var controls =[];

        if($scope.checked) {
        controls= $scope.lstRangeScheme;
        }
        else {
        controls = $scope.lstDateScheme;}        


        console.log(controls);
         
        
        for (var i = 0; i < controls.length; i++) {
            console.log(controls[i]);
            $scope.insertFields(controls[i]);
        };

/*
        $scope.lstRangeScheme=[];
        $scope.lstDateScheme=[];
*/    
    };





$scope.insertFields = function (object) 
{

    var esRango = !$scope.checked;


    schemeRepository.insertEsquema( 
        object.diasGracia,
        object.plazo,
        $scope.idFinanciera,
        object.nombre,
        object.descripcion,
        esRango,
        object.tasaInteres,
        object.rango,
        object.precedencia,
        object.porcentajePenetracion,
        object.idTiieTipo,
        object.fechaInicio,
        object.fechaFin,
        object.tiie
        ).then(function (result)
             {

            if (result.data.length > 0) {                    
                alertFactory.success("Esquema Agregado");
                $scope.clearControls();
                $scope.getEsquemaFinanciera();
            } else {
                alertFactory.info("Esquema No Agregado");
            }
        }, function (error) {
            alertFactory.error("Error al guardar Esquema");
        });
 
}

















});