
var fileChooser = document.getElementById('file-input');

fileChooser.addEventListener('change', handleFileSelection, false);

/*function parseTextAsXml(text) {
    var parser = new DOMParser(),
        xmlDom = parser.parseFromString(text, "text/xml");

    //ahora, extraer los elementos del xmlDom y asignarlos a los imputs
    var datos=[];
    datos.push(xmlDom.getElementsByTagName("RUTEmisor")[0]);
    datos.push(xmlDom.getElementsByTagName("RznSoc")[0]);
    datos.push(xmlDom.getElementsByTagName("GiroEmis")[0]);
    console.log (datos[2].textContent);
    //document.getElementById('contenido-archivo').innerHTML = nodo_emisor[0].textContent;
    
}*/

function waitForTextReadComplete(reader) {
    reader.onloadend = function(event) {
        var text = event.target.result;
        //console.log(text);
        localStorage.removeItem("archivo");
        localStorage.setItem("archivo",text);  
        window.location.href="http://127.0.0.1:5500/invoice.html";    
        //var lectura = localStorage.getItem("archivo");
        //parseTextAsXml(text);
        //parseTextAsXml(lectura);             
    }
}

function handleFileSelection() {
    var file = fileChooser.files[0],
    reader = new FileReader();
    waitForTextReadComplete(reader);
    reader.readAsText(file);
}







