//clase DGT - nueva forma
class DGT {
  constructor(){
	this.conductores=[];
	this.guardias=[];
	this.multas=[];
  }

  //metodos
  altaConductor(oConductor){
  	//no puede haber dos conductores con el mismo nif
    var resultado="El conductor ya existe.";
    if (this.buscarConductor(oConductor.nif)==null) {
        this.conductores.push(oConductor);
        resultado="Conductor dado de alta.";
    }
        return resultado;
  	//devuelve string
  }


  altaGuardia(oGuardia){
  	//no puede haber dos guardias con el mismo nif
    var resultado="El nif del guardia ya existe.";
    if (this.buscarGuardia(oGuardia.nif)==null) {
        this.guardias.push(oGuardia);
        resultado="Guardia dado de alta.";
    }
        return resultado;
  	//devuelve string
  }

  buscarConductor(sNif){
  	var oConductor = null;
    var array=this.conductores.filter(conductor => conductor.nif == sNif);
    if (array.length>0)
        oConductor=array[0];
    return oConductor;
  	//devuelve oConductor si está o nulo si no está en la tabla
  }

  buscarGuardia(sNif){
  	var oGuardia = null;
    var array=this.guardias.filter(guardia => guardia.nif == sNif);
    if (array.length>0)
        oGuardia=array[0];
    return oGuardia;
  	//devuelve oGuardia si está o nulo si no está en la tabla
  }

  buscarMulta(sId){
  	var oMulta=null;
  	var array=this.multas.filter(multa => multa.id == sId);
  	if(array.length>0)
  		oMulta=array[0];
  	return oMulta;
  	//devuelve oMulta si está o nulo si no está en la tabla
  }


//  multa(sID,sNifConductor,sNifGuardia,sImporte,bPagada,sDescripcion,dFecha){
	altaMulta(oMulta){
  	//devuelve string
  	 var resultado="El id de la multa ya existe.";
	 if (this.buscarMulta(oMulta.id)==null) {
        this.multas.push(oMulta);
		// this.multas.push(new multa(sID,sNifConductor,sNifGuardia,sImporte,bPagada,sDescripcion,dFecha));
        resultado="Multa dado de alta.";
		}	
	return resultado;
	}
	

/*
  listadoConductores(){
  	//ordenacion conductores antes de mostrar
  	//ordenado por apellidos ascendentemente.
	for(var i=0;i<(this.conductores.length-1);i++){
		for(var j=i+1;j<this.conductores.length;j++){
			if(this.conductores[i].apellidos>this.conductores[j].apellidos)
				this.conductores.swap(i,j);
		}
	}
	//devuelve tabla
	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">NIF</th>';
	sTabla+='<th scope="col">Nombre</th>';
	sTabla+='<th scope="col">Apellidos</th>';
	sTabla+='<th scope="col">Direccion</th>';
	sTabla+='<th scope="col">Caducidad Carnet</th>';
	sTabla+='</tr>';
		//cada conductor en fila
		for(var i=0;i<this.conductores.length;i++){
            sTabla+=this.conductores[i].toString();
        }
	sTabla+='</thead><tbody>';
  	return sTabla;
  }
*/

listadoConductores(){
	let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "NIF conductor";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
    celda.textContent = "Apellidos";
    celda = fila.insertCell(-1);
    celda.textContent = "Direccion";
	celda = fila.insertCell(-1);
    celda.textContent = "Caducidad Carnet";

    let cuerpito = document.createElement("tbody");

     for(var i=0; i< this.conductores.length; i++){
       cuerpito.append(this.conductores[i].toHTMLrow());
    }
    return cuerpito;
}

listadoGuardias(){
	let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
    celda.textContent = "NIF guardia";
    celda = fila.insertCell(-1);
    celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
    celda.textContent = "Apellidos";
    celda = fila.insertCell(-1);
    celda.textContent = "Direccion";
	celda = fila.insertCell(-1);
    celda.textContent = "Puesto";

    let cuerpito = document.createElement("tbody");

     for(var i=0; i< this.guardias.length; i++){
       cuerpito.append(this.guardias[i].toHTMLrow());
    }
    return cuerpito;
  }


listadoMultas(){
  	//ordenacion multas antes de mostrar
  	//ordenado por id
	for(var i=0;i<(this.multas.length-1);i++){
		for(var j=i+1;j<this.multas.length;j++){
			if(this.multas[i].id>this.multas[j].id)
				this.multas.swap(i,j);
		}
	}
	//devuelve tabla
	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">ID</th>';
	sTabla+='<th scope="col">NIF conductor</th>';
	sTabla+='<th scope="col">NIF guardia</th>';
	sTabla+='<th scope="col">Importe</th>';
	sTabla+='<th scope="col">Pagada</th>';
	sTabla+='<th scope="col">Descripcion</th>';
	sTabla+='<th scope="col">Fecha</th>';
	sTabla+='</tr>';
		//cada conductor en fila
		for(var i=0;i<this.multas.length;i++){
            sTabla+=this.multas[i].toHTMLrow();
        }
	sTabla+='</thead><tbody>';
  	return sTabla;
  }
  
listarMultas(idMulta){
	let cadena;
	cadena="<h1>Listado Multa</h1><table class='table table-hover table-bordered table-striped'>";
	cadena+="<thead class='thead-dark'><th>IDMulta</th><th>NIFConductor</th><th>NIFGuardia</th><th>Importe</th><th>Pagado</th><th>Descripcion</th><th>Fecha</th><th>Bonificada/Puntos</th></thead>";
	

	for(let i=0;i<this.multas.length;i++)
	{
		let id = this.multas[i].id;
		if(id == idMulta)
		{
			cadena+="<tr>";
			cadena+=this.multas[i].toHTMLrow("extra");
			cadena+="</tr>";

		}
		if(this.buscarMulta(idMulta)==null)
			{
				alert("No hay registrada ninguna multa con ese ID.");
			}
	}
	cadena+="</table>";
	cadena+="<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>";
	cadena+="<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>";
	return cadena;
	}
	
pagaMulta(idMulta){
	var mensaje = "" ;
	for(let i=0;i<this.multas.length;i++)
	{
		let id = this.multas[i].id;
		if(id == idMulta)
		{
			if (this.multas[i].pagada == "no")
			{
				this.multas[i].pagada = "yes";
				mensaje = "Multa actualizada";
			}
			
			else {
				if(this.multas[i].pagada == "yes")
				{
				mensaje = "Multa ya pagada.";
				}
			}
			
		}
		if(this.buscarMulta(idMulta)==null)
			{
				mensaje = "No hay registrada ninguna multa con ese ID.";
			}
	}
	
	return mensaje;
	
	}

listadoMultaFechas(dtDesde,dtHasta){
	let cadena;
		cadena="<h3>Listado Multas puestas desde "+dtDesde+" hasta "+dtHasta+"</h3>";
		cadena+="<table class='table table-hover table-bordered table-striped'>";
		cadena+="<thead class='thead-dark'><th>IDMulta</th><th>NIFConductor</th><th>NIFGuardia</th><th>Importe</th><th>Pagado</th><th>Descripcion</th><th>Fecha</th><th>Bonificada/Puntos</th></thead>";

		let aMultas = [];

		let d1 = dtDesde.split("/");
		let d2 = dtHasta.split("/");

		for (let i = 0; i < this.multas.length; i++){
			let c = this.multas[i].fecha.split("/");
			let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
			let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
			let check = new Date(c[2], parseInt(c[1])-1, c[0]);

			if (check >= from && check <= to){
				aMultas.push(this.multas[i]);
			}
		}

		aMultas.sort((a,b) => (a.fecha > b.fecha) ? -1 : ((b.fecha > a.fecha) ? 1 : 0));

		for (let i = 0; i < aMultas.length; i++) {
			cadena+="<tr>";
			//cadena+=aMulta[i].toHTMLrow("extra");
			cadena+="<td>"+this.aMultas[i].id+"</td>";
			cadena+="<td>"+this.aMultas[i].conductor+"</td>";
			cadena+="<td>"+this.aMultas[i].guardia+"</td>";
			cadena+="<td>"+this.aMultas[i].importe+"  €</td>";
			cadena+="<td>"+this.aMultas[i].pagada+"</td>";
			cadena+="<td>"+this.aMultas[i].descripcion+" €</td>";
			cadena+="<td>"+this.aMultas[i].fecha+"</td>";
			cadena+="<td>"+this.aMultas[i].bonificada/puntos+"</td>";
			//cadena+=aMultas[i].toHTMLrow("otra");
			cadena+="</tr>";
		}

		cadena+="</table>";
		cadena+="<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>";
		cadena+="<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>";

		
		return cadena;
	}


listadoSaldo(){
	let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
	let saldo = 0;
	
    celda.textContent = "Conductor";
    celda = fila.insertCell(-1);
    celda.textContent = "Bonificada";
    celda = fila.insertCell(-1);
	celda.textContent = "Puntos";
    celda = fila.insertCell(-1);
	celda.textContent = "Saldo";
    celda = fila.insertCell(-1);

    let cuerpito = document.createElement("tbody");

     for(var i=0; i< this.multas.length; i++){
		 
		if(this.multas[i].pagada == "no"){
			cuerpito.append(this.multas[i].toHTMLrow2());
			}
		
		}
		return cuerpito;
	}

listadoPuntos(){
	let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
	
    celda.textContent = "NIF conductor";
    celda = fila.insertCell(-1);
	celda.textContent = "Puntos";
    celda = fila.insertCell(-1);

    let cuerpito = document.createElement("tbody");

     for(var i=0; i< this.multas.length; i++){
		 
		if(!this.multas[i].puntos == ""){
			cuerpito.append(this.multas[i].toHTMLrow3());
			}
		
		}
		return cuerpito;
	}

listadoMultaGuardia(){
	let tabla = document.getElementById("tabla");
    let cabecera = tabla.createTHead();
    let fila= cabecera.insertRow(-1);
    let celda = fila.insertCell(-1);
	let numero = 0;
	
    celda.textContent = "NIF guardia";
    celda = fila.insertCell(-1);
	celda.textContent = "Nombre";
    celda = fila.insertCell(-1);
	celda.textContent = "Apellidos";
    celda = fila.insertCell(-1);
	celda.textContent = "Puesto";
    celda = fila.insertCell(-1);
	celda.textContent = "Nº Multas";
    celda = fila.insertCell(-1);

    let cuerpito = document.createElement("tbody");

     for(var i=0; i< this.guardias.length; i++){
		cuerpito.append(this.guardias[i].toHTMLrow2());
		}
		return cuerpito;
	}	

}

var oDGT=new DGT();

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

//clase conductor 
class Conductor{
	constructor(sNif,sNombre,sApellidos,sDireccion,dFechaCaducidad){
	this.nif=sNif;
	this.nombre=sNombre;
	this.apellidos=sApellidos;
	this.direccion=sDireccion;
	this.caducidadCarnet=dFechaCaducidad;
	}
	// para hacer listados 
	toHTMLrow(){
		let linea = document.createElement("tr");
				
				let celda = linea.insertCell(-1);
				celda.textContent=this.nif;
				
				celda = linea.insertCell(-1);
				celda.textContent=this.nombre;
				
				celda = linea.insertCell(-1);
				celda.textContent=this.apellidos;
				
				celda = linea.insertCell(-1);
				celda.textContent=this.direccion;
				
				celda = linea.insertCell(-1);
				celda.textContent=this.caducidadCarnet;
				
				return linea;
	}
	

}
Conductor.prototype.toString=function(){
	//devuelve fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.nif+"</td>";
	sFila+="<td>"+this.nombre+"</td>";
	sFila+="<td>"+this.apellidos+"</td>";
	sFila+="<td>"+this.direccion+"</td>";
	sFila+="<td>"+this.caducidadCarnet+"</td>";
	sFila+="</tr>";
	return sFila;
}


//clase multa 
function Multa(sId,oConductor,oGuardia,sImporte,bPagada,sDescripcion,dFecha){
	this.id=sId;
	this.conductor=oConductor;
	this.guardia=oGuardia;
	this.importe=sImporte;
	this.pagada=bPagada;
	this.descripcion=sDescripcion;
	this.fecha=dFecha;
}
Multa.prototype.toHTMLrow=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.id+"</td>";
	sFila+="<td>"+this.conductor+"</td>";
	sFila+="<td>"+this.guardia+"</td>";
	sFila+="<td>"+this.importe+"</td>";
	sFila+="<td>"+this.pagada+"</td>";
	sFila+="<td>"+this.descripcion+"</td>";
	sFila+="<td>"+this.fecha+"</td>";
	sFila+="</tr>";
	return sFila;	
}

// Para el saldo de conductor

Multa.prototype.toHTMLrow2=function(){
	let linea = document.createElement("tr");
	let saldo = 15;

			
			celda = linea.insertCell(-1);
			celda.textContent=this.conductor;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.bonificada;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.puntos;
			
			celda = linea.insertCell(-1);
			for(let i=0; i<oDGT.multas.length;i++){
				if(this.conductor == oDGT.multas[i].conductor)
				{
					saldo = saldo - oDGT.multas[i];
					celda.textContent=saldo;
				}
			}
			return linea;
}

// Para el saldo de puntos

Multa.prototype.toHTMLrow3=function(){
	let linea = document.createElement("tr");
			
			
			celda = linea.insertCell(-1);
			celda.textContent=this.conductor;
			
			
			celda = linea.insertCell(-1);
			celda.textContent=this.puntos;
			
			return linea;
}

// Los tipos de multas 

	// Leve

	function Leve(sId,oConductor,oGuardia,sImporte,bPagada,sDescripcion,dFecha,bBonificada)
	{
		Multa.call(this,sId,oConductor,oGuardia,sImporte,bPagada,sDescripcion,dFecha);
		this.bonificada = bBonificada;
	}

	Leve.prototype = Object.create(Multa.prototype);
	Leve.prototype.constructor = Leve;

	Leve.prototype.toHTMLrow=function(){
		//fila tabla
		var sFila="<tr>";
		sFila+="<td>"+this.id+"</td>";
		sFila+="<td>"+this.conductor+"</td>";
		sFila+="<td>"+this.guardia+"</td>";
		sFila+="<td>"+this.importe+"</td>";
		sFila+="<td>"+this.pagada+"</td>";
		sFila+="<td>"+this.descripcion+"</td>";
		sFila+="<td>"+this.fecha+"</td>";
		sFila+="<td>"+this.bonificada+"</td>";
		sFila+="</tr>";
		return sFila;	
	}
	

	
	// Grave
	
	function Grave(sId,oConductor,oGuardia,sImporte,bPagada,sDescripcion,dFecha,sPuntos)
	{
		Multa.call(this,sId,oConductor,oGuardia,sImporte,bPagada,sDescripcion,dFecha);
		this.puntos = sPuntos;
	}

	Grave.prototype = Object.create(Multa.prototype);
	Grave.prototype.constructor = Grave;

	Grave.prototype.toHTMLrow=function(){
		//fila tabla
		var sFila="<tr>";
		sFila+="<td>"+this.id+"</td>";
		sFila+="<td>"+this.conductor+"</td>";
		sFila+="<td>"+this.guardia+"</td>";
		sFila+="<td>"+this.importe+"</td>";
		sFila+="<td>"+this.pagada+"</td>";
		sFila+="<td>"+this.descripcion+"</td>";
		sFila+="<td>"+this.fecha+"</td>";
		sFila+="<td>"+this.puntos+"</td>";
		sFila+="</tr>";
		return sFila;	
	}	





Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=dia+"/"+mes+"/"+anio;
	return sCadena;
}

//clase guardia - antigua forma
class Guardia{
		constructor(sNif,sNombre,sApellidos,sDireccion,iPuesto){
		this.nif=sNif;
		this.nombre=sNombre;
		this.apellidos=sApellidos;
		this.direccion=sDireccion;
		this.puesto=iPuesto;
	}
	toHTMLrow(){
		let linea = document.createElement("tr");
			
			let celda = linea.insertCell(-1);
			celda.textContent=this.nif;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.nombre;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.apellidos;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.direccion;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.puesto;
			
			return linea;
	}
	
	// Para el numero de multas
	
	toHTMLrow2(){
		let linea = document.createElement("tr");
		let numero = 0;
		
			let celda = linea.insertCell(-1);
			celda.textContent=this.nif;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.nombre;
			
			celda = linea.insertCell(-1);
			celda.textContent=this.apellidos;

			celda = linea.insertCell(-1);
			celda.textContent=this.puesto;
		
			celda = linea.insertCell(-1);
		
			for(var i=0;i<oDGT.guardias.length; i++){
				numero=0;
				for(var j=0; j<oDGT.multas.length; j++){
					if(oDGT.guardias[i].nif == oDGT.multas[j].nif)
						numero=numero+1;
						celda.textContent=numero;
					}
				}
			
			
			


			
			return linea;		
	
	}
	
}
Guardia.prototype.toString=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.nif+"</td>";
	sFila+="<td>"+this.nombre+"</td>";
	sFila+="<td>"+this.apellidos+"</td>";
	sFila+="<td>"+this.direccion+"</td>";
	sFila+="<td>"+this.puesto+"</td>";
	sFila+="</tr>";
	return sFila;
}

// Listados despegables

  DGT.prototype.getOptionsConductores = function(){

	let oOptions = [];

	for(let i=0; i < this.conductores.length; i++){
		let oOptionConductor = document.createElement("option");
		oOptionConductor.value = this.conductores[i].nif;
		oOptionConductor.textContent =  this.conductores[i].nif + " - " + this.conductores[i].apellidos + ", " + this.conductores[i].nombre;

		// insertamos el option generado en el array
		oOptions.push(oOptionConductor);
	}

	return oOptions; // Devolvemos array de options
  }
  
  DGT.prototype.getOptionsGuardias = function(){
	  
	let oOptions = [];
	  
	for(let i=0; i < this.guardias.length; i++){
		let oOptionGuardia = document.createElement("option");
		oOptionGuardia.value = this.guardias[i].nif;
		oOptionGuardia.textContent =  this.guardias[i].nif + " - " + this.guardias[i].apellidos + ", " + this.guardias[i].nombre;

		// insertamos el option generado en el array
		oOptions.push(oOptionGuardia);
	}

	return oOptions; // Devolvemos array de options
  }