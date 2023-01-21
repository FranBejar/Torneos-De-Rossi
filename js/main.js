class Jugador {
    constructor(nombre, numero, edad, posicion) {
        this.nombre = nombre;
        this.numero = numero;
        this.edad = edad;
        this.posicion = posicion;
    }
}

class Equipo {
    constructor(nombre, estadio, jugadores) {
        this.nombre = nombre;
        this.estadio = estadio;
        this.jugadores = jugadores;
    }
}

class Grupo {
    constructor(nombre, equipos) {
        this.nombre = nombre;
        this.equipos = equipos;
    }
}

class Partido {
    constructor(equipo1, equipo2, golesE1, golesE2, resultado, estadio) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.golesE1 = golesE1;
        this.golesE2 = golesE2;
        this.resultado = resultado;
        this.estadio = estadio;
    }
}


alert("BIENVENIDO A TORNEOS DE ROSSI, EL ADMINISTRADOR DE TUS TORNEOS DE FUTBOL");

let scaloneta = []; //ARRAY SOLO PARA PRUEBAS

let registroEquipos = [];

let grupos = [];

let registroPartidos = [];

let equipos = parseInt(prompt("Ingrese la cantidad de equipos que participan (Deben ser grupos de a 4 - MAXIMO 32)"));

let multiploCuatro = (equipos % 4 == 0);

//CARGA DE ARRAY DE PRUEBA
scaloneta.push(new Jugador("Franco Armani", 1, 36, "Arquero"));
scaloneta.push(new Jugador("Juan Foyth", 2, 24, "Defensor"));
scaloneta.push(new Jugador("Nicolas Tagliafico", 3, 30, "Defensor"));
scaloneta.push(new Jugador("Gonzalo Montiel", 4, 25, "Defensor"));
scaloneta.push(new Jugador("Leandro Paredes", 5, 28, "Mediocampista"));
scaloneta.push(new Jugador("German Pezzella", 6, 31, "Defensor"));
scaloneta.push(new Jugador("Rodrigo De Paul", 7, 28, "Mediocampista"));
scaloneta.push(new Jugador("Marcos Acuña", 8, 31, "Defensor"));
scaloneta.push(new Jugador("Julian Alvarez", 9, 22, "Delantero"));
scaloneta.push(new Jugador("Lionel Messi", 10, 35, "Delantero"));
scaloneta.push(new Jugador("Angel Di Maria", 11, 34, "Delantero"));
scaloneta.push(new Jugador("Geronimo Rulli", 12, 30, "Arquero"));
scaloneta.push(new Jugador("Cristian Romero", 13, 24, "Defensor"));
scaloneta.push(new Jugador("Exequiel Palacios", 14, 24, "Mediocampista"));
scaloneta.push(new Jugador("Angel Correa", 15, 27, "Delantero"));
scaloneta.push(new Jugador("Thiago Almada", 16, 21, "Delantero"));
scaloneta.push(new Jugador("Alejandro Gomez", 17, 34, "Mediocampista"));
scaloneta.push(new Jugador("Guido Rodriguez", 18, 28, "Mediocampista"));
scaloneta.push(new Jugador("Nicolas Otamendi", 19, 34, "Defensor"));
scaloneta.push(new Jugador("Alexis MacAllister", 20, 23, "Mediocampista"));
scaloneta.push(new Jugador("Paulo Dybala", 21, 29, "Delantero"));
scaloneta.push(new Jugador("Lautaro Martinez", 22, 25, "Delantero"));
scaloneta.push(new Jugador("Emiliano Martinez", 23, 30, "Arquero"));
scaloneta.push(new Jugador("Enzo Fernandez", 24, 21, "Mediocampista"));
scaloneta.push(new Jugador("Lisandro Martinez", 25, 24, "Defensor"));
scaloneta.push(new Jugador("Nahuel Molina", 26, 24, "Defensor"));

//CARGO TODOS LOS EQUIPOS QUE VAN A PARTICIPAR EN EL TORNEO
if (equipos > 0 && equipos <= 32 && multiploCuatro) {
    let i = 1;
    let nombreEquipo = "";
    let nombreEstadio = "";
    //let plantel = [];
    do {
        nombreEquipo = prompt("Ingrese Nombre del Equipo");
        while (nombreEquipo == "") {
            alert("NOMBRE NO VALIDO");
            nombreEquipo = prompt("Ingrese Nombre del Equipo");
        }
        nombreEstadio = prompt("Ingrese Nombre del Estadio"); //Puedo cargarlo vacio, significa que no tiene estadio

        //Para pruebas se cargo un plantel predeterminado, para la idea final se tienen que ejecutar estas lineas

        //plantel = inscripcionEquipo();
        //registroEquipos.push(crearEquipo(nombreEquipo, nombreEstadio, plantel));

        registroEquipos.push(crearEquipo(nombreEquipo, nombreEstadio, scaloneta)); //Para pruebas, se carga a cada equipo a La Scaloneta
        i++;
    } while (i <= equipos)

    grupos = armarGrupos(registroEquipos, (equipos / 4));

    console.log(grupos); //Linea agregada para ver los grupos cargados en Consola

    infoGrupos();
}

function crearEquipo(nombre, estadio, jugadores) {
    return new Equipo(nombre, estadio, jugadores);
}

//ESTA FUNCION SIMULA EL SORTEO DE FASE DE GRUPOS, SOLO QUE EN LUGAR DE SER X BOLILLEROS ES UNO CON LA TOTALIDAD DE EQUIPOS
function armarGrupos(registroEquipos, cantidadGrupos) {
    const grupos_aux = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H"];
    let listaGrupos = grupos_aux.slice(0, cantidadGrupos);
    let torneo = []; //retorna los grupos armados

    for (const grupo of listaGrupos) { //para cada grupo que se determino
        let aux = []; //local al ciclo, se reinicia en cada iteracion
        for (let i = 0; i <= 3; i++) {
            let equipoSeleccionado = getRndInteger(0, registroEquipos.length); //Saca un equipo al azar de la lista
            //console.log(equipoSeleccionado);
            aux.push(registroEquipos[equipoSeleccionado]);
            registroEquipos.splice(equipoSeleccionado, 1); //Los equipos con grupo asignado se eliminan del array
        }
        torneo.push(new Grupo(grupo, aux));
    }
    return torneo;
}

function inscripcionEquipo() {
    const posiciones = ["Arquero", "Defensor", "Mediocampista", "Delantero"];
    let plantel = [];
    let nombreCompleto = "";
    let edad = 0;
    let pos = 0;
    for (let i = 1; i < 26; i++) {
        nombreCompleto = prompt("Ingrese nombre completo del jugador numero " + i); //La idea es cargar a los jugadores segun el numero de camiseta
        while (nombreCompleto == "") {
            alert("NOMBRE NO VALIDO");
            nombreCompleto = prompt("Ingrese nombre completo del jugador numero " + i);
        }
        edad = parseInt(prompt("Ingrese edad del Jugador"));
        pos = parseInt(prompt("Ingrese posicion del Jugador:\n1) Arquero\n2) Defensor\n3) Mediocampista\n4) Delantero"));
        while (pos <= 0 || pos >= 5) {
            alert("SELECCION NO VALIDA");
            pos = parseInt(prompt("Ingrese posicion del Jugador:\n1) Arquero\n2) Defensor\n3) Mediocampista\n4) Delantero"));
        }
        plantel.push(new Jugador(nombreCompleto, i, edad, posiciones[pos - 1]));
    }

    return plantel;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min));
}

//Funciones para brindar informacion acerca de los Equipos

function infoGrupos() {
    let i = 0;
    while (i < grupos.length) {
        let j = 0;
        console.log(grupos[i].nombre);
        console.log("\n");
        while (j < grupos[i].equipos.length) {
            console.log(grupos[i].equipos[j].nombre);
            j++;
        }
        console.log("\n");
        i++;
    }
}

function promedioEdadTorneo() {
    let i = 0;
    let cantidadJugadores = grupos.length * grupos[i].equipos.length * grupos[i].equipos[i].jugadores.length
    let sumaEdades = 0;
    //lo cargo con grupos[i] porque todos los grupos tienen la misma cantidad de equipos y cada equipo tiene la misma cantidad de jugadores
    while (i < grupos.length) {
        let j = 0;
        while (j < grupos[i].equipos.length) {
            let k = 0;
            while (k < grupos[i].equipos[j].jugadores.length) {
                sumaEdades += grupos[i].equipos[j].jugadores[k].edad;
                k++;
            }
            j++;
        }
        i++;
    }
    alert("El promedio de edad de todo el torneo es de: " + sumaEdades / cantidadJugadores + " años");
}

function iniciarJuego() {
    let msj = "";
    let i = 1;
    while (i <= grupos.length) {
        msj = msj + i + ") " + grupos[i - 1].nombre + "\n";
        i++;
    }
    let grupoElegido = parseInt(prompt("Seleccione uno de los siguientes grupos: \n" + msj));
    juego(grupos[grupoElegido - 1]);
}

function juego(grupo) { //En primer instancia solo pueden jugar partidos equipos del mismo grupo
    let listaEquipos = [grupo.equipos[0], grupo.equipos[1], grupo.equipos[2], grupo.equipos[3]]; //lo cargue como grupo.equipos pensando que hacia una copia del mismo, pero al sacar a uno mas abajo me lo sacaba de la lista definitiva
    let e1 = 0;
    let e2 = 0;
    while (e1 <= 0 || e1 >= 5) {
        e1 = parseInt(prompt("Ingrese al equipo Local: Equipos del grupo " + grupo.nombre + "\n1) " + listaEquipos[0].nombre + "\n2) " + listaEquipos[1].nombre + "\n3) " + listaEquipos[2].nombre + "\n4) " + listaEquipos[3].nombre));
    }
    e1 = e1 - 1; //Como un array se maneja desde el valor 0, le resto 1 para que coincida la seleccion con su posicion en el array
    let eqLocal = listaEquipos[e1];
    listaEquipos.splice(e1, 1);

    while (e2 <= 0 || e2 >= 5) {
        e2 = parseInt(prompt("Ingrese al equipo Visitante: Equipos del grupo " + grupo.nombre + "\n1) " + listaEquipos[0].nombre + "\n2) " + listaEquipos[1].nombre + "\n3) " + listaEquipos[2].nombre));
    }
    e2 = e2 - 1;
    let eqVisitante = listaEquipos[e2];
    //Aca ya no es necesario que lo quite de listaEquipos, ya que solo necesito 2 equipos

    let golesLocal = -1;
    while (golesLocal < 0) {
        golesLocal = parseInt(prompt("Cuantos goles metio " + eqLocal.nombre));
    }
    let golesVisitante = -1;
    while (golesVisitante < 0) {
        golesVisitante = parseInt(prompt("Cuantos goles metio " + eqVisitante.nombre));
    }

    let resultado = golesLocal + " a " + golesVisitante;
    //Se carga siempre igual, ya que en el registro se ve que el 1er numero es del local y el 2do es del visitante, no se lee por quien gano o perdio
    let partido = new Partido(eqLocal, eqVisitante, golesLocal, golesVisitante, resultado, eqLocal.estadio); //Se supone que siempre se juega en la cancha del local
    if (golesLocal == golesVisitante) {
        alert(eqLocal.nombre + " y " + eqVisitante.nombre + " Empataron " + resultado);
    } else {
        if (golesLocal > golesVisitante) {
            alert(eqLocal.nombre + " le gano a " + eqVisitante.nombre + " " + resultado);
        } else {
            alert(eqVisitante.nombre + " le gano a " + eqLocal.nombre + " " + golesVisitante + " a " + golesLocal);
            //en este caso no se usa resultado, ya que Visitante le gano a Local 0 a 1 por ejemplo no se ve bien
        }
    }

    registroPartidos.push(partido);
}

function infoPartidos(partido) {
    console.log(partido.equipo1.nombre + " " + partido.golesE1 + " - " + partido.golesE2 + " " + partido.equipo2.nombre);
    if (partido.estadio == "") {
        console.log("Estadio Neutral");
    } else {
        console.log("Estadio " + partido.estadio);
    }
}

function infoResultadosTorneo() {
    let i = 0;
    while (i < registroPartidos.length) {
        infoPartidos(registroPartidos[i]);
        console.log("\n");
        i++;
    }
}