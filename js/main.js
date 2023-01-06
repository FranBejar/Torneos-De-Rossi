alert("BIENVENIDO A TORNEOS DE ROSSI, EL ADMINISTRADOR DE TUS TORNEOS DE FUTBOL");

let equipos = parseInt(prompt("Ingrese la cantidad de equipos que participan (Deben ser grupos de a 4 - MAXIMO 48)"));

let multiploCuatro = (equipos%4==0);

if(equipos>0 && equipos<=48 && multiploCuatro){
    let i=1;
    let nombreEquipo=""; //Variable Inicializada
    do{
        if((i-1)%4==0){ //Cada 4 equipos crea un grupo, al arrancar en i=1 le resto una unidad para generar grupos desde el 1er equipo
            creacionGrupo(i);
        }
        nombreEquipo=prompt("Ingrese Nombre del Equipo");
        if(nombreEquipo==""){
            alert("NOMBRE NO VALIDO");
        }else{
            registro(i,nombreEquipo);
            i++;
        }
    }while(i<=equipos);
}else{
    alert("CANTIDAD DE EQUIPOS NO VALIDA, POR FAVOR RECARGUE LA PAGINA E INGRESE UN NUMERO VALIDO!");
}

function registro(numero,nombre){ //La funcion informa que el equipo se registro correctamente y lo imprime en consola
    alert("Equipo "+numero+": "+nombre+" registrado");
    console.log("Equipo "+numero+": "+nombre);
}

//Cada 4 grupos se genera un nuevo grupo, estos no pueden llamarse igual y regularmente el nombre de los grupos son letras
//Se definio un maximo de 12 grupos para no generar infinitos grupos y un codigo inmenso
function creacionGrupo(numero){
    switch(numero){
        case 1: console.log("======GRUPO A======"); break;
        case 5: console.log("======GRUPO B======"); break;
        case 9: console.log("======GRUPO C======"); break;
        case 13: console.log("======GRUPO D======"); break;
        case 17: console.log("======GRUPO E======"); break;
        case 21: console.log("======GRUPO F======"); break;
        case 25: console.log("======GRUPO G======"); break;
        case 29: console.log("======GRUPO H======"); break;
        case 33: console.log("======GRUPO I======"); break;
        case 37: console.log("======GRUPO J======"); break;
        case 41: console.log("======GRUPO K======"); break;
        case 45: console.log("======GRUPO L======"); break;
    }
}