var CalculoView = require('../views/calculo'),
	CalculoModel = require('../models/dataAccess'),
	moment = require('moment');

var Calculo = function(conf){
	this.conf = conf || {};

	this.view = new CalculoView();
	this.model = new CalculoModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

//obtiene el trabajo de la cita
/*Calculo.prototype.get_trabajo_data = function(req, res, next){
	//Objeto que almacena la respuesta
	var object = {};
	//Objeto que envía los parámetros
	var params = {}; 
	//Referencia a la clase para callback
	var self = this;

	//Asigno a params el valor de mis variables
	params.name = 'idCita';
	params.value = req.params.data;
	params.type = 1;
	
	this.model.get('SEL_UNIDAD_TRABAJO',params,function(error,result){
		//Callback
		object.error = error;
		object.result = result[0];
		
		self.view.see(res, object);
	});
}*/

module.exports = Calculo;