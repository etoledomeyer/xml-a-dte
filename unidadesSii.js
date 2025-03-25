let unidadSii = '';
let direccionesRegionales=[];

direccionesRegionales={
    'SANTIAGO NORTE':['INDEPENDENCIA', 'RECOLETA', 'HUECHURABA', 'CONCHALÍ', 'QUILICURA', 'COLINA', 'LAMPA','TIL TIL'],
    'SANTIAGO CENTRO':['SANTIAGO','NUNOA', 'LA REINA', 'MACUL', 'PENALOLEN'],
    'SANTIAGO PONIENTE':['CERRO NAVIA', 'CURACAVÍ', 'ESTACIÓN CENTRAL', 'LO PRADO', 'PUDAHUEL', 'QUINTA NORMAL', 'RENCA', 'MELIPILLA', 'SAN PEDRO', 'ALHUÉ', 'MARÍA PINTO','MAIPÚ', 'CERRILLOS', 'EL MONTO', 'ISLA DE MAIPO', 'PADRE HURTADO', 'PENAFLOR', 'TALAGANTE'],
    'SANTIAGO ORIENTE':['LAS CONDES', 'VITACURA', 'LO BARNECHEA','PROVIDENCIA'],
    'SANTIAGO SUR':['SAN MIGUEL', 'LA CISTERNA', 'SAN JOAQUÍN', 'P. AGUIRRE CERDA', 'LO ESPEJO', 'LA GRANJA', 'LA PINTANA', 'SAN RAMÓN','LA FLORIDA', 'PUENTE ALTO', 'PIRQUE', 'SAN JOSÉ DE MAIPO','SAN BERNARDO', 'CALERA DE TANGO', 'EL BOSQUE']
}

function consultarUnidadSii(comuna){

    if(direccionesRegionales['SANTIAGO NORTE'].includes(comuna)){
        //console.log(Object.keys(direccionesRegionales)[0]);
        unidadSii=Object.keys(direccionesRegionales)[0];
    }
    else if (direccionesRegionales['SANTIAGO CENTRO'].includes(comuna)){
        //console.log(Object.keys(direccionesRegionales)[1]);
        unidadSii=Object.keys(direccionesRegionales)[1];
    }
    else if (direccionesRegionales['SANTIAGO PONIENTE'].includes(comuna)){
        //console.log(Object.keys(direccionesRegionales)[2]);
        unidadSii=Object.keys(direccionesRegionales)[2];
    }
    else if (direccionesRegionales['SANTIAGO ORIENTE'].includes(comuna)){
        //console.log(Object.keys(direccionesRegionales)[3]);
        unidadSii=Object.keys(direccionesRegionales)[3];
    }
    else if (direccionesRegionales['SANTIAGO SUR'].includes(comuna)){
        //console.log(Object.keys(direccionesRegionales)[4]);
        unidadSii=Object.keys(direccionesRegionales)[4];
    }

    return unidadSii;
}

//console.log(consultarUnidadSii('SAN PEDRO'));
