var oDGT=new DGT();

datosIniciales();
inicializarFrmAltaMultaConductor();
inicializarFrmAltaMultaGuardia();

function datosIniciales() {
	oDGT.altaConductor(new Conductor("12312312F","Alberto","Gómez Gómez","swqds 71","2020-03-12"));
	oDGT.altaConductor(new Conductor("47586921G","María","Jiménez Jiménez","fsdfe 42","2020-07-12"));
	oDGT.altaConductor(new Conductor("28591456Y","Jesús","Castañas Castañas","dsadasdas 43","2021-09-15"));

	oDGT.altaGuardia(new Guardia("12342312F","Mario","Alonso Marr","Duwsasd 70",1));
	oDGT.altaGuardia(new Guardia("47586924G","Juan Carlos","Riririri","DDdidii º0",4));
	oDGT.altaGuardia(new Guardia("47586941G","Isabel","Compass","Bibilsa",1));
	oDGT.altaGuardia(new Guardia("47583921G","Maria","Renerene","Buho 1",15));

	oDGT.altaMulta(new Leve("a","12312312F","47586924G","120","yes", "Horrible aparcamiento","2020-03-12","True"));
	oDGT.altaMulta(new Grave("b","47586921G","47586924G","150","no","Atropello a un coche", "2020-03-12","2"));
	oDGT.altaMulta(new Leve("c","28591456Y","47583921G","200","no","Borracho", "2020-03-12","False"));

}


function ocultarFormularios(){
	document.getElementById("bienvenida").classList.add('d-none');
	document.getElementById("divAltaConductor").classList.add('d-none');
	document.getElementById("divAltaGuardia").classList.add('d-none');
	document.getElementById("divAltaMulta").classList.add('d-none');
	document.getElementById("divPagaMulta").classList.add('d-none');
	document.getElementById("divImprimeMulta").classList.add('d-none');
	document.getElementById("filtroMultasPeriodo").classList.add('d-none');

}


function fOcultarTablasListado(){
    document.getElementById("tabla").style.display = "none";
    
}

// Mostrar listados 
document.getElementById("mostrarListadoConductores").addEventListener("click",fMostrarListadoConductores,false);
document.getElementById("mostrarListadoGuardia").addEventListener("click",fMostrarListadoGuardias,false);
document.getElementById("mostrarListadoSaldo").addEventListener("click",fMostrarListadoSaldo,false);
document.getElementById("mostrarListadoPuntos").addEventListener("click",fMostrarListadoPuntos,false);
document.getElementById("mostrarListadoMultaGuard").addEventListener("click",fMostrarMultaGuard,false);


function formTipo(){
	let x = document.getElementById("tipo").value;

	switch(x){
		case "Seleccione un tipo....":
		document.getElementById("leve").style.display = "none";
		document.getElementById("grave").style.display = "none";
		document.getElementById("puntos").style.display = "none";
		break;
		
		case "Leve":
		document.getElementById("leve").style.display = "block";
		document.getElementById("grave").style.display = "none";
		document.getElementById("puntos").style.display = "none";
		break;

		case "Grave":
		document.getElementById("grave").style.display = "block";
		document.getElementById("leve").style.display = "none";
		document.getElementById("puntos").style.display = "block";
		break;

		default:
		document.getElementById("leve").style.display = "none";
		document.getElementById("grave").style.display = "none";
		document.getElementById("puntos").style.display = "none";
		break;
	}

}





function mostrarFrm(idCapa){
	ocultarFormularios();
	fOcultarTablasListado();
	document.getElementById(idCapa).classList.remove('d-none');
	
		if (idCapa == "divAltaMulta"){
        inicializarFrmAltaMultaConductor();
		inicializarFrmAltaMultaGuardia();
	}
}

function altaConductor(){
	
	fOcultarTablasListado();
	
	var sNif = frmAltaConductor.txtNIF.value.trim();
	var sNombre = frmAltaConductor.txtNombre.value.trim();
	var sApellidos = frmAltaConductor.txtApellidos.value.trim();
	var sDireccion = frmAltaConductor.txtDireccion.value.trim();
	var dFechaCaducidad = frmAltaConductor.txtCaducidadCarnet.value.trim();
	
	
    mensaje(oDGT.altaConductor(new Conductor(sNif,sNombre,sApellidos,sDireccion,dFechaCaducidad)));
    frmAltaConductor.reset();
}

function altaGuardia(){
	
	fOcultarTablasListado();
	
	var sNif = frmAltaGuardia.txtNIF.value.trim();
	var sNombre = frmAltaGuardia.txtNombre.value.trim();
	var sApellidos = frmAltaGuardia.txtApellidos.value.trim();
	var sDireccion = frmAltaGuardia.txtDireccion.value.trim();
	var sPuesto = frmAltaGuardia.txtPuesto.value.trim();
    mensaje(oDGT.altaGuardia(new Guardia(sNif,sNombre,sApellidos,sDireccion,sPuesto)));
    frmAltaGuardia.reset();
}

function altaMulta(){

	
	fOcultarTablasListado();
	
	var sID=frmAltaMulta.txtID.value.trim();
	var sNifConductor=frmAltaMulta.lstConductor.value;
	var sNifGuardia=frmAltaMulta.lstGuardia.value;
	var sImporte=frmAltaMulta.txtImporte.value.trim();
	var bPagada=frmAltaMulta.rbtPagado.value.trim();
	let pagado;
	let pBoni;
	let pPoints = 0;
	var sDescripcion=frmAltaMulta.txtDescripcion.value.trim();
	var dFecha=frmAltaMulta.txtFechaMulta.value.trim();


		if (document.getElementById("rbtPagado-0").checked)
			{
				pagado = true;
			}
		else
			{
				pagado = false;
			}
	
	
	let x = document.getElementById("tipo").value;
	
		if (x == "Leve") 
		{
	        if (document.getElementById("siBoni").checked) 
			{
	        	pBoni = true;
	        }
	        else 
			{
	        	pBoni = false;
	        }

					let oMulta = new Leve(sID,sNifConductor,sNifGuardia,sImporte,bPagada,sDescripcion,dFecha,pBoni);
		        

					mensaje(oDGT.altaMulta(oMulta))
					frmAltaMulta.reset();
					//	 }
				// }
		}	
		else
			{
				let x = document.getElementById("tipo").value;
				
				if(x == "Seleccione un tipo....") 
					mensaje( "Alerta, no has seleccionado el tipo de multa. ");
				
				if(x == "Grave")
				{
					pPoints = parseInt(frmAltaMulta.puntos.value.trim());

						let oMulta = new Grave(sID,sNifConductor,sNifGuardia,sImporte,bPagada,sDescripcion,dFecha,pPoints);
		        					
							mensaje(oDGT.altaMulta(oMulta))
							frmAltaMulta.reset();
						
					}
					
			//	else (x == "Seleccione un tipo....") 
			//		mensaje( "Alerta, no has seleccionado el tipo de multa. ");
			}
	
	

	
}



function mensaje(sTexto) {
    alert(sTexto);
}

// listados

function fMostrarListadoConductores(){
		
		fOcultarTablasListado();
		ocultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oDGT.listadoConductores();
        document.getElementById("tabla").append(tablaAMostrar);
}

function fMostrarListadoGuardias(){
		fOcultarTablasListado();
		ocultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oDGT.listadoGuardias();
        document.getElementById("tabla").append(tablaAMostrar);
}

function fMostrarListadoSaldo(){
		fOcultarTablasListado();
		ocultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oDGT.listadoSaldo();
        document.getElementById("tabla").append(tablaAMostrar);
}

function fMostrarListadoPuntos(){
		fOcultarTablasListado();
		ocultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oDGT.listadoPuntos();
        document.getElementById("tabla").append(tablaAMostrar);	
}

function fMostrarMultaGuard(){
		fOcultarTablasListado();
		ocultarFormularios();
        document.getElementById("tabla").style.display = "table";
        fVaciarTabla();
        let tablaAMostrar = oDGT.listadoMultaGuardia();
        document.getElementById("tabla").append(tablaAMostrar);	
}

function fVaciarTabla(){
    let hijosTabla = document.querySelectorAll('#tabla > *');
    if(hijosTabla.length > 0){
        hijosTabla.forEach(hijo=>{
            hijo.remove();
        })
    }
}

function listarMultas() {
	let ventana = open("","_blank");
	ventana.document.head.innerHTML = "<title>Listado Multa</title><meta charset='utf-8'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous'>";
	let idMulta = frmImprimeMulta.txtIDMulta.value.trim();
	ventana.document.body.innerHTML = oDGT.listarMultas(idMulta);
	frmImprimeMulta.reset();
/*
	let cadena;
	let idMulta = frmImprimeMulta.txtIDMulta.value.trim();
	cadena="<h1>Listado Multa</h1><table class='table table-hover table-bordered table-striped'>";
	cadena+="<thead class='thead-dark'><th>IDMulta</th><th>NIFConductor</th><th>NIFGuardia</th><th>Importe</th><th>Pagado</th><th>Descripcion</th><th>Fecha</th></thead>";
	

	for(let i=0;i<oDGT.multa;i++)
	{
		if(multa[i] = idMulta)
		{
			cadena+="<tr>";
			cadena+=multa[i].toString("extra");
			cadena+="</tr>";
		}
		else
		{
			alert("No hay registrada ninguna multa con ese ID.");
		}
	}
	cadena+="</table>";
	cadena+="<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>";
	cadena+="<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>";
		ventana.document.body.innerHTML = cadena;  
*/

}

function pagaMulta(){
	let idMulta = frmPagaMulta.txtIDMulta.value.trim();
	mensaje(oDGT.pagaMulta(idMulta));
	frmAltaMulta.reset();
}

// Combo de arrays

function inicializarFrmAltaMultaConductor(){

	let oOptionsConductor = document.querySelectorAll("#lstConductor option");
	
	for(let i=0; i < oOptionsConductor.length;i++){
		oOptionsConductor.remove();
	}

	
	oOptionsConductor = oDGT.getOptionsConductores();

	
	for(let i=0; i < oOptionsConductor.length;i++){
		document.querySelector("#lstConductor").appendChild(oOptionsConductor[i]);
	}

	
	oOptionsConductor = document.querySelectorAll("#lstConductorSeleccionados option");
	
	for(let i=0; i < oOptionsConductor.length;i++){
		oOptionsConductor.remove();
	}

}


function inicializarFrmAltaMultaGuardia(){
	let oOptionsGuardia = document.querySelectorAll("#lstGuardia option");
	
	for(let i=0; i < oOptionsGuardia.length;i++){
		oOptionsGuardia.remove();
	}

	
	oOptionsGuardia = oDGT.getOptionsGuardias();

	
	for(let i=0; i < oOptionsGuardia.length;i++){
		document.querySelector("#lstGuardia").appendChild(oOptionsGuardia[i]);
	}

	
	oOptionsGuardia = document.querySelectorAll("#lstGuardiaSeleccionados option");
	
	for(let i=0; i < oOptionsGuardia.length;i++){
		oOptionsGuardia.remove();
	}
}


//Validacion de fecha
function formatoFecha(fecha)
	{
    	return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }

function fechaValida(fFecha)
    {
    	let afechaValida = true;
    	let fDia = parseInt(fFecha.substring(0,fFecha.indexOf("/")));
    	let fMes = parseInt(fFecha.substring(fFecha.indexOf("/")+1,fFecha.lastIndexOf("/")));
    	let fAño = parseInt(fFecha.substring(fFecha.lastIndexOf("/")+1));

    	if (fDia>0 && fDia<32 && fMes>0 && fMes<13)
    	{
    		if ((fMes == 4 || fMes == 6 || fMes == 9 || fMes == 11))
    		{
    			if(fDia==31)
    				bfechaValida = false;
    		}
    		else if(fMes == 2)
    		{
    			if (fDia>28)
    			{
    				afechaValida = false;
    			}
    			if (fDia == 29 && iAño%4==0)
    			{
    				afechaValida = true;
    			}
    		}

    	}
    	else 
    		afechaValida = false;	

    	return afechaValida;
    }
	
function buscarMultaFecha() {
	
	//var dtDesde = frmBuscarMultaFecha.fecha1.value.trim();
	//var dtHasta = frmBuscarMultaFecha.fecha2.value.trim();	
	
	//formatoFecha(dtDesde);
	//formatoFecha(dtHasta);
	 let dtDesde = formatoFecha(frmBuscarMultaFecha.fecha1.value);
	 let dtHasta = formatoFecha(frmBuscarMultaFecha.fecha2.value);

	if (!fechaValida(dtDesde) || !fechaValida(dtHasta))
	{
		alert("Introduzca fecha válida");
	}
	else
	{
		let ventana = open("","_blank");
		ventana.document.head.innerHTML = "<title>Listado multas por fecha</title><meta charset='utf-8'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'>";
		ventana.document.body.innerHTML = oDGT.listadoMultaFechas(dtDesde,dtHasta);
		/*
		let cadena;
		cadena="<h3>Listado Multas puestas desde "+dtDesde+" hasta "+dtHasta+"</h3>";
		cadena+="<table class='table table-hover table-bordered table-striped'>";
		cadena+="<thead class='thead-dark'><th>IDMulta</th><th>NIFConductor</th><th>NIFGuardia</th><th>Importe</th><th>Pagado</th><th>Descripcion</th><th>Fecha</th><th>Bonificada/Puntos</th></thead>";

		let aMultas = [];

		let d1 = dtDesde.split("/");
		let d2 = dtHasta.split("/");

		for (let i = 0; i < oDGT.multas.length; i++){
			let c = oDGT.multas[i].fecha.split("/");
			let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
			let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
			let check = new Date(c[2], parseInt(c[1])-1, c[0]);

			if (check >= from && check <= to){
				aMultas.push(oDGT.multas[i]);
			}
		}

		aMultas.sort((a,b) => (a.fecha > b.fecha) ? -1 : ((b.fecha > a.fecha) ? 1 : 0));

		for (let i = 0; i < aMultas.length; i++) {
			cadena+="<tr>";
			cadena+=aMulta[i].multas.toHTMLRow("extra");
			cadena+="<td>"+aMultas[i].IDMulta+"</td>";
			cadena+="<td>"+aMultas[i].NIFConductor+"</td>";
			cadena+="<td>"+aMultas[i].NIFGuardia+"</td>";
			cadena+="<td>"+aMultas[i].Importe+"  €</td>";
			cadena+="<td>"+aMultas[i].Pagado+"</td>";
			cadena+="<td>"+aMultas[i].Descripcion+" €</td>";
			cadena+="<td>"+aMultas[i].fecha+"</td>";
			cadena+="<td>"+aMultas[i].Bonificada/Puntos+"</td>";
			cadena+=aMultas[i].multa.toHTMLRow("otra");
			cadena+="</tr>";
		}

		cadena+="</table>";
		cadena+="<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>";
		cadena+="<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>";

		ventana.document.body.innerHTML = cadena;
		*/
		frmBuscarMultaFecha.reset();
	}
}
