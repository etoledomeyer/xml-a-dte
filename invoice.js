var fileText = localStorage.getItem('archivo');
//console.log(fileText);
const fileXML = parseTextAsXml(fileText);
const opcionFecha = {day:'numeric', month:'long', year:'numeric'};

//DATOS EMISOR
let xmlEmisor=fileXML.getElementsByTagName("RznSoc")[0].textContent;
let xmlGiroEmisor=fileXML.getElementsByTagName("GiroEmis")[0].textContent;
let xmlDireccionEmisor = fileXML.getElementsByTagName("DirOrigen")[0].textContent;
let xmlComunaEmisor = fileXML.getElementsByTagName("CmnaOrigen")[0].textContent;
let xmlCiudadEmisor = !(fileXML.getElementsByTagName("CiudadOrigen")[0])?'':fileXML.getElementsByTagName("CiudadOrigen")[0].textContent;
let xmlRutEmisor = fileXML.getElementsByTagName("RUTEmisor")[0].textContent;

//DATOS DTE
let xmlTipoDte = fileXML.getElementsByTagName("TipoDTE")[0].textContent;
let xmlDte = xmlTipoDte==33?"FACTURA ELECTRONICA":"FACTURA EXENTA";
let xmlFolioDte = fileXML.getElementsByTagName("Folio")[0].textContent;
let xmlFechaDte = new Date(fileXML.getElementsByTagName("FchEmis")[0].textContent);
let xmlFormaPago = !(fileXML.getElementsByTagName("TermPagoGlosa")[0])?"--":fileXML.getElementsByTagName("TermPagoGlosa")[0].textContent;
let xmlFechaVencimiento = !(fileXML.getElementsByTagName("FchVenc")[0])?"":fileXML.getElementsByTagName("FchVenc")[0].textContent;
let xmlNeto =!(fileXML.getElementsByTagName("MntNeto")[0])?0:fileXML.getElementsByTagName("MntNeto")[0].textContent;
let xmlExento = !(fileXML.getElementsByTagName("MntExe")[0])?0:fileXML.getElementsByTagName("MntExe")[0].textContent;
let xmlTasaIVA = !(fileXML.getElementsByTagName("TasaIVA")[0])?0:fileXML.getElementsByTagName("TasaIVA")[0].textContent;
let xmlIVA = !(fileXML.getElementsByTagName("IVA")[0])?0:fileXML.getElementsByTagName("IVA")[0].textContent;
let xmlTotal = fileXML.getElementsByTagName("MntTotal")[0].textContent;

//DATOS RECEPTOR
let xmlReceptor= fileXML.getElementsByTagName("RznSocRecep")[0].textContent;
let xmlGiroReceptor= fileXML.getElementsByTagName("GiroRecep")[0].textContent;
let xmlDireccionReceptor =fileXML.getElementsByTagName("DirRecep")[0].textContent;
let xmlComunaReceptor = fileXML.getElementsByTagName("CmnaRecep")[0].textContent;
let xmlCiudadReceptor = !(fileXML.getElementsByTagName("CiudadRecep")[0])?'':fileXML.getElementsByTagName("CiudadRecep")[0].textContent;
let xmlRutReceptor = fileXML.getElementsByTagName("RUTRecep")[0].textContent;

//REFERENCIAS
let referenciasDte=[];
let xmlReferencias= fileXML.getElementsByTagName("Referencia");
for(let i=0;i<xmlReferencias.length;i++){
    if (xmlReferencias[i].getElementsByTagName('TpoDocRef')[0].textContent == '801'){   
        referenciasDte.push('OC');
        referenciasDte.push(xmlReferencias[i].getElementsByTagName('FolioRef')[0].textContent);
        referenciasDte.push(xmlReferencias[i].getElementsByTagName('FchRef')[0].textContent);
    }
}

//DETALLE
let detalleDte = "";
let xmlDetalle = fileXML.getElementsByTagName("Detalle");
let xmlDctosRcgosGlobales = fileXML.getElementsByTagName("DscRcgGlobal");
detalleDte="<tr>";
for(let i=0; i<xmlDetalle.length;i++){
    let sku=!(xmlDetalle[i].getElementsByTagName('VlrCodigo')[0])?'':xmlDetalle[i].getElementsByTagName('VlrCodigo')[0].textContent;
    let qty=!(xmlDetalle[i].getElementsByTagName('QtyItem')[0])?'':xmlDetalle[i].getElementsByTagName('QtyItem')[0].textContent;
    let punit=!(xmlDetalle[i].getElementsByTagName('PrcItem')[0])?'':Intl.NumberFormat('es-CL').format(xmlDetalle[i].getElementsByTagName('PrcItem')[0].textContent);
    let montoItem=Intl.NumberFormat('es-CL').format(xmlDetalle[i].getElementsByTagName('MontoItem')[0].textContent);
    
    detalleDte +="<td>" + xmlDetalle[i].getElementsByTagName('NroLinDet')[0].textContent + "</td>";
    detalleDte +="<td>" + sku + "</td>";
    detalleDte +="<td>" + xmlDetalle[i].getElementsByTagName('NmbItem')[0].textContent + "</td>";
    detalleDte +="<td>" + qty + "</td>";
    detalleDte +="<td>" + punit + "</td>";
    detalleDte +="<td>" + '' + "</td>";
    detalleDte +="<td>" + montoItem + "</td>";
    detalleDte +="</tr>";
}
if (xmlDctosRcgosGlobales.length>0){

     detalleDte += "<tr>";

    for(let i=0; i < xmlDctosRcgosGlobales.length; i++){
        let tipoDR = xmlDctosRcgosGlobales[i].getElementsByTagName('TpoMov')[0].textContent;
        let sku = tipoDR=='D'?'DESCUENTO':'RECARGO';
        let montoItem=Intl.NumberFormat('es-CL',{signDisplay :'auto'}).format(xmlDctosRcgosGlobales[i].getElementsByTagName('ValorDR')[0].textContent);

        detalleDte +="<td>" + xmlDctosRcgosGlobales[i].getElementsByTagName('NroLinDR')[0].textContent + "</td>";
        detalleDte +="<td>" + sku + "</td>";
        detalleDte +="<td>" + xmlDctosRcgosGlobales[i].getElementsByTagName('GlosaDR')[0].textContent + "</td>";
        detalleDte +="<td>" + '' + "</td>";
        detalleDte +="<td>" + '' + "</td>";
        detalleDte +="<td>" + '' + "</td>";
        tipoDR=='D'? detalleDte +="<td><label>-</label>" + montoItem + "</td>": detalleDte +="<td>" + montoItem + "</td>";
        detalleDte +="</tr>";
    }
}

//console.log(detalleDet);

//INPUT HTML
nombreEmisor.innerHTML=xmlEmisor;
giroEmisor.innerHTML=xmlGiroEmisor;
direccionEmisor.innerHTML=xmlDireccionEmisor;
comunaEmisor.innerHTML=xmlComunaEmisor;
ciudadEmisor.innerHTML=xmlCiudadEmisor;
rutEmisor.innerHTML=formatearRut(xmlRutEmisor);
tipoDte.innerHTML=xmlDte;
folioDte.innerHTML=xmlFolioDte;
fechaDte.innerHTML=xmlFechaDte.toLocaleDateString(undefined,opcionFecha);
referencias.innerHTML=(referenciasDte.length > 0)?referenciasDte[0]+' '+referenciasDte[1]+' '+referenciasDte[2]:"";
detalle.innerHTML=detalleDte;
nombreReceptor.innerHTML=xmlReceptor;
giroReceptor.innerHTML=xmlGiroReceptor;
rutReceptor.innerHTML=formatearRut(xmlRutReceptor);
direccionReceptor.innerHTML=xmlDireccionReceptor;
ciudadReceptor.innerHTML=xmlCiudadReceptor;
comunaReceptor.innerHTML=xmlComunaReceptor;
formaPago.innerHTML=xmlFormaPago;
fechaVencimiento.innerHTML=xmlFechaVencimiento;
monto_total_palabras.innerHTML=NumeroALetras(parseInt(xmlTotal));
montoNeto.innerHTML=Intl.NumberFormat('es-CL').format(xmlNeto);
montoExento.innerHTML=Intl.NumberFormat('es-CL').format(xmlExento);
tasa.innerHTML=xmlTasaIVA;
montoIVA.innerHTML=Intl.NumberFormat('es-CL').format(xmlIVA);
montoTotal.innerHTML=Intl.NumberFormat('es-CL').format(xmlTotal);



//FUNCIONES

/*****Monto a Letras****/
function Unidades(num){

    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    let strMiles = Miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'PESOS', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}
/**Fin Monto a Letras**/

function formatearRut(rutSinPuntos){
    let rut = rutSinPuntos.replace(/[.-]/g, '').replace( /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');

    return rut;
}


//LECTURA DE XML
function parseTextAsXml(text) {
    var parser = new DOMParser(),
    xmlDom = parser.parseFromString(text, "text/xml");

    return xmlDom;
}
