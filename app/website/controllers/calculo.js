var CalculoView = require('../views/calculo'),
    CalculoModel = require('../models/dataAccess'),
    moment = require('moment');

var Calculo = function (conf) {
    this.conf = conf || {};

    this.view = new CalculoView();
    this.model = new CalculoModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

// Se obtine los días de gracia
Calculo.prototype.get_freedays = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{name: 'nombreEmpresa', value: req.query.nombreEmpresa, type: self.model.types.STRING}];

    this.model.query('SEL_FREE_DAYS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.get_freedayssucursal = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{name: 'nombreEmpresa', value: req.query.nombreEmpresa, type: self.model.types.STRING},
                 {name: 'nombreSucursal', value: req.query.nombreSucursal, type: self.model.types.STRING}];

    this.model.query('SEL_FREE_DAYS_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se optiene los detalles de la unidad
Calculo.prototype.get_detailsUnit = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [{name: 'vehNumserie', value: req.query.vehNumserie, type: self.model.types.STRING}];

    this.model.query('SEL_DETALLE_UNIDAD_BY_ID_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//insertar nueva tiie
Calculo.prototype.post_addtiie = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Asigno a params el valor de mis variables
    var params = [{name: 'fecha', value: req.body.fecha, type:self.model.types.DATE},
                  {name: 'plazo', value: req.body.plazo, type: self.model.types.INT},
                  {name: 'monto', value: req.body.monto, type: self.model.types.DECIMAL}];
    this.model.post('INS_TIIE_SP', params, function (error, result) {
        //Callback
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}
// Se obtine los intereses de las unidades por empresa
Calculo.prototype.get_interest = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'Marca', value: req.query.Marca, type: self.model.types.STRING}];
    this.model.query('SEL_INTEREST_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//Se obtiene los esquemas 
Calculo.prototype.get_esquemaFinanciera = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.INT}];

    this.model.query('SEL_ESQUEMA_FINACIERA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Seleccionar los TIIE
Calculo.prototype.get_tiie = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_TIIE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Mostrar empresas   Cambiada
Calculo.prototype.get_company = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_EMPRESA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se obtiene la lista de sucursales por empresa   Cambiada
Calculo.prototype.get_sucursal = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT}];
    this.model.query('SEL_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se optiene los intereses por sucursal Cambiada
Calculo.prototype.get_interestsucursal = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING},
                   {name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.STRING},
                   {name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.STRING}
                  ];
    this.model.query('SEL_INTERES_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//se optione los intereses Cambiada
Calculo.prototype.get_interestFinanciera = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT},
                   {name: 'idFinanciera', value: req.query.idFinanciera, type: self.model.types.INT}
                  ];
    this.model.query('SEL_INTERES_FINANCIERA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Mostrar financieras por empresa Cambiada
Calculo.prototype.get_financial = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [{name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT}];

    this.model.query('SEL_RESUMEN_FINANCIERA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se optiene los detalles de las financieras por empresa
/*Calculo.prototype.get_financialForUnit = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'empresa', value: req.query.empresa , type: self.model.types.STRING},
                   {name: 'financiera', value: req.query.financiera, type: self.model.types.STRING}
                  ];
    this.model.query('SEL_INTEREST_FINANCIERA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};*/
Calculo.prototype.get_validaUsuario = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'usuario', value: req.query.usuario, type: self.model.types.STRING},
                  {name: 'password', value: req.query.password, type: self.model.types.STRING}];
    this.model.query('SEL_VALIDA_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.get_financiera = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_FINANCIERAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.get_detalleEsquema = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'idEsquema', value: req.query.idEsquema, type: self.model.types.INT},
                  {name: 'esfijo', value: req.query.esfijo, type: self.model.types.STRING}];
    this.model.query('SEL_DETALLE_ESQUEMA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Calculo.prototype.post_insertesquema = function(req, res, next){
    //Objeto que almacena la respuesta
    var object = {};
    
    var params = {};
	//Referencia a la clase para callback
	var self = this;
    //Objeto que envía los parámetros
    //Asigno a params el valor de mis variables
 
            var params = [{name: 'diasGracia', value: req.body.diasGracia, type: self.model.types.DECIMAL},
                 {name: 'plazo', value: req.body.plazo, type: self.model.types.DECIMAL},
                 {name: 'idFinanciera', value: req.body.idFinanciera, type: self.model.types.INT},
                 {name: 'nombre', value: req.body.nombre, type: self.model.types.STRING},
                 {name: 'descripcion', value: req.body.descripcion, type: self.model.types.STRING},
                 {name: 'esFijo', value: req.body.interesFecha, type: self.model.types.STRING},
                 {name: 'tasaInteres', value: req.body.idFinanciera, type: self.model.types.DECIMAL},
                  {name: 'rango', value: req.body.rango, type: self.model.types.DECIMAL},
                  {name: 'precedencia', value: req.body.precedencia, type: self.model.types.DECIMAL},
                  {name: 'porcentajePenetracion', value: req.body.porcentajePenetracion, type: self.model.types.DECIMAL},
                  {name: 'idTiieTipo', value: req.body.idTiieTipo, type: self.model.types.INT},
                  {name: 'fechaInicio', value: req.body.fechaInicio, type: self.model.types.STRING},
                  {name: 'fechaFin', value: req.body.fechaFin, type: self.model.types.STRING},
                  {name: 'tiie', value: req.body.tiie, type: self.model.types.INT}
                 ];
	
 this.model.post('INS_ESQUEMA_SP', params, function (error, result) {
        //Callback
   self.view.expositor(res, {
            error: error,
            result: result
        });
 });
} 

module.exports = Calculo;
