var pantalla;
var resultado;
var antiguosB;
var contenidoPantalla;
var numero;

window.onload = function(){
    resultado = document.getElementById('resultado');
    cuerpo = document.getElementById('calcBody');
    pantalla = document.getElementById('pantalla');
    document.onkeydown = ponerNumeroTeclado;
}

function ponerNumero(num){
    
    if(num.length == 1){
        pantalla.innerHTML += num;
    }
    else{
        num = num.substring(7,num.length);

        switch (num){
            case 'R': raiz() ;break;
            case 'F': factorial() ;break;
            case 'P': potenciaNdos() ;break;
            case 'E': ecuacionSegundoGrado();break;
            case 'C': doCoseno() ;break;
            case '(': pantalla.innerHTML += '(' ;break;
            case ')': pantalla.innerHTML += ')' ;break;
            case 'S': doSeno() ;break;
        }
    }
}

function raiz(){
    var num = pantalla.innerHTML;
    resultado.innerHTML = Math.sqrt(num);
}

function factorial(){
    var num = pantalla.innerHTML;
    var m = 1;
    for (var i = 1; i <= num; i++){
        m = m * i;
    }

    resultado.innerHTML = m;
}

function potenciaNdos(){
    var num = pantalla.innerHTML;
    resultado.innerHTML = Math.pow(num,2);
}

function ecuacionSegundoGrado(){

}

function doCoseno(){
    var num = pantalla.innerHTML;
    num = Math.cos(num) * 10000000;
    num = Math.floor(num) / 10000000;
    resultado.innerHTML = num;
}

function doSeno(){
    var num = pantalla.innerHTML;
    num = Math.sin(num) * 10000000;
    num = Math.floor(num) / 10000000;
    resultado.innerHTML = num;

}

function cambiarBotones(){
    var nuevos = '<div class="filas"><div class="botones mod" onclick=\"ponerNumero(\'externoR\');\">√</div><div class="botones mod" onclick=\"ponerNumero(\'externoF\');\">!</div><div class="botones mod" onclick=\"ponerNumero(\'externoP\');\">x<sup>2</sup></div><div class="botones mod" onclick=\"ponerNumero(\'externoE\');\">ec<sup>2</sup></div></div>' + '<div class="filas"><div class="botones mod" onclick=\"ponerNumero(\'externoC\');\">cos()</div><div class="botones mod" onclick=\"ponerNumero(\'externo(\');\">(</div><div class="botones mod" onclick=\"ponerNumero(\'externo)\');\">)</div><div class="botones mod" onclick=\"ponerNumero(\'externoS\');\">sin()</div></div>' + '<div id="botonLateral1" onclick="atrasBotones()"><</div><div id="botonLateral2" onclick="atrasBotones()">></div>'
    antiguosB = cuerpo.innerHTML;
    cuerpo.innerHTML = nuevos;

}

function atrasBotones(){
    cuerpo.innerHTML = antiguosB;
}

function ponerNumeroTeclado(e){
    var letra  = e.code;
    var copia = letra;
    copia = eliminaUltimoString(copia);

    if(copia == 'Digit' || copia == 'Numpad'){
        pantalla.innerHTML += numero;
    }
    else if(letra == 'Backspace'){
        pantalla.innerHTML = popString(pantalla.innerHTML);
    }
    else{
        var operacion = eliminaNumpad(letra);

        switch (operacion){
            case 'Add': pantalla.innerHTML += '+';
                ;break;
            case 'Subtract': pantalla.innerHTML += '-';
                ;break;
            case 'Divide': pantalla.innerHTML += '/';
                ;break;
            case 'Multiply': pantalla.innerHTML += 'x';
                ;break;
            case 'Decimal': pantalla.innerHTML += '.';
                ;break;
            case 'Enter': calcularOperaciones();break; 
        }
    }
}

function eliminaUltimoString(s){
    s = s.split('');
    numero = s.pop();
    s = s.join('');

    return s;
}

function eliminaNumpad(c){
    return c.substring(6,c.length);
}

function borrarTodaPantalla(){
    pantalla.innerHTML = '';
    resultado.innerHTML = '';
}

function calcularOperaciones(){
    leerPantalla();
    if(operacionConParentesis(contenidoPantalla)){
        console.log('Tiene parentesis');
    }
    else{
        console.log('No tiene parentesis');
        resolverOperaciones(contenidoPantalla);
    }
    //Parentesis? -->  Resolver en caso de parentesis

}

function leerPantalla(){
    contenidoPantalla = pantalla.innerHTML;
    contenidoPantalla = contenidoPantalla.split('');
}

function operacionConParentesis(operacion){
    var parentesis = false;
    
    for (var i = 0; i < operacion.length && !parentesis; i++){
        if(operacion[i] == '('){
            parentesis = true;
        }
    }

    return parentesis;
}

function popString(c){
    c = c.split('');
    c.pop();
    c = c.join('');
    return c;
}

function resolverOperaciones(operacion){
    var numeros = sacarNumeros(operacion);
    var operaciones = sacarOperaciones(operacion);
    console.log(numeros, contenidoPantalla, operaciones);
}

function sacarNumeros(operacion){
    var n = [];
    var eliminados = 0;
    copiaVectorSinReferencia(n, operacion);

    for(var i = 0; i < (n.length - eliminados); i++){
        if(!esNumero(n[i])){
            n.splice(i,1);
            eliminados++;
        }
    }

    return n;
}

function sacarOperaciones(operacion){
    var p = [];
    var eliminados = 0;
    copiaVectorSinReferencia(p, operacion);

    for(var i = 0; i < (p.length - eliminados); i++){
        if(esNumero(p[i])){
            p.splice(i,1);
        }
    }

    if(esNumero(operacion[0])){
        p.unshift('+');
    }

    return p;
}

function esNumero(n){
    return (n != '+' && n != '-' && n != '/' && n != 'x' && n != '(' && n != ')');
}

function copiaVectorSinReferencia(copia, original){
    for (var i = 0; i < original.length; i++){
        copia[i] = original[i];
    }
}

function hayMultiplicacion(ope){
    var find = false

    for (var i = 0; i < ope.length && !find; i++){
        if(ope[i] == 'x'){
            find = true;
        }
    }

    return find;
}