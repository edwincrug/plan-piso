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
    var params = [];

    this.model.query('SEL_FREE_DAYS_SP', params, function (error, result) {
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
Calculo.prototype.get_scheme = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_ESQUEMA_LISTA_SP', params, function (error, result) {
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
// Mostrar empresas
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
// Se obtiene la lista de sucursales por empresa
Calculo.prototype.get_sucursal = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'nombreCorto', value: req.query.nombreCorto, type: self.model.types.STRING}];
    this.model.query('SEL_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
// Se optiene los intereses por sucursal
Calculo.prototype.get_interestsucursal = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
     var params = [{name: 'nombreCorto', value: req.query.nombreCorto, type: self.model.types.STRING}];
    this.model.query('SEL_INTEREST_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
module.exports = Calculo;
