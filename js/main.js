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
    constructor(equipo1, equipo2, golesE1, golesE2, ganador, estadio) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.golesE1 = golesE1;
        this.golesE2 = golesE2;
        this.ganador = ganador;
        this.estadio = estadio;
    }
}

let formulario = document.getElementById("equipos");

let formTitulo = document.getElementById("tituloListaEq");

formTitulo.style.visibility = "hidden";

let cantEquipos = document.getElementById("cantEquipos");

cantEquipos.style.visibility = "hidden";

let simuladorPartidos = document.getElementById("cargarPartido");

simuladorPartidos.style.visibility = "hidden";

document.getElementById("eqLocal").style.visibility="hidden";

document.getElementById("eqVisitante").style.visibility="hidden";

document.getElementById("resultado").style.visibility="hidden";

//let baseDeDatosUsuarios = []; //NUEVO - A implementar en entrega final

let scaloneta = []; //ARRAY SOLO PARA PRUEBAS

let registroEquipos = [];

let grupos = [];

let registroPartidos = [];

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

let btnCrearTorneo = document.getElementById("creaTorneo");

let btnCargarTorneo = document.getElementById("cargarTorneo");

let btnGrupos = document.getElementById("grupos");

btnGrupos.style.visibility = "hidden";

let btnPromedio = document.getElementById("promEdad");

btnPromedio.style.visibility = "hidden";

let btnIniciarJuego = document.getElementById("iniciaJuego");

btnIniciarJuego.style.visibility = "hidden";

let btnRegistroPartidos = document.getElementById("infoPartidos");

btnRegistroPartidos.style.visibility = "hidden";

let btnGuardarTorneo = document.getElementById("guardarTorneo");

btnGuardarTorneo.style.visibility = "hidden";

btnCrearTorneo.addEventListener("click", crearTorneo);

btnCargarTorneo.addEventListener("click",cargarTorneo);

btnGrupos.addEventListener("click",infoGrupos);

btnPromedio.addEventListener("click",promedioEdadTorneo);

btnIniciarJuego.addEventListener("click",iniciarJuego);

btnRegistroPartidos.addEventListener("click",infoResultadosTorneo);

btnGuardarTorneo.addEventListener("click",guardarTorneo);

function crearTorneo() {

    cantEquipos.style.visibility = "visible";

    cantEquipos.innerHTML = 
        `<h2>Ingrese la cantidad de equipos que participan (Deben ser grupos de 4 - MAXIMO 32</h2>
        <input type=number min=4 max=32 step=4>
        <button type="submit">Confirmar</button>`
    
    cantEquipos.addEventListener("submit",(e)=>{
    
    e.preventDefault();
    let equipos = e.target.children[1].value;

    if (equipos % 4 == 0 && equipos >= 4 && equipos <= 32) {
        cantEquipos.remove();
        formTitulo.style.visibility = "visible";

        formulario.innerHTML = `
            <h2>Ingrese los nombres de los equipos y sus estadios (si tienen)</h2>
            <input type="text" placeholder="nombre">
            <input type="text" placeholder="estadio">
            <button type="submit">Cargar</button>
        `

        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            let carga = e.target;
            let nombreEquipo = carga.children[1].value;
            let nombreEstadio = carga.children[2].value;
            if (carga.children[1].value == "") {
                alert("NO VALIDO");
                return;
            }
            document.getElementById("listaEquipos").innerHTML += '<tr><td>' + nombreEquipo + '</td><td>' + nombreEstadio + '</td></tr>';
            registroEquipos.push(crearEquipo(nombreEquipo, nombreEstadio, scaloneta));
            formulario.reset()
            if (registroEquipos.length == equipos) {
                formulario.remove(); //podrias deshabilitar tambien el boton de crear torneo de la misma forma o con la siguiente linea
                document.getElementById("creaTorneo").disabled = true;
                document.getElementById("creaTorneo").style.visibility="hidden";
                btnGrupos.style.visibility = "visible";
                btnIniciarJuego.style.visibility = "visible";
                btnPromedio.style.visibility = "visible";
                btnRegistroPartidos.style.visibility = "visible";
                btnGuardarTorneo.style.visibility = "visible";
                grupos = armarGrupos(registroEquipos, (equipos / 4));
            }
        });
    } else {
        alert("Deben ser grupos de a 4 - MAXIMO 32")
    }
    })
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
            aux.push(registroEquipos[equipoSeleccionado]);
            registroEquipos.splice(equipoSeleccionado, 1); //Los equipos con grupo asignado se eliminan del array
        }
        torneo.push(new Grupo(grupo, aux));
    }
    return torneo;
}

function inscripcionEquipo() { //A implementar en la Entrega Final
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

function infoGrupos(){
    document.getElementById("nomGrupos").innerHTML = "";
    document.getElementById("listaGrupos").innerHTML = "";

    for (const grupo of grupos) {
        document.getElementById("nomGrupos").innerHTML+='<th>'+grupo.nombre+'</th>';
        let col = document.createElement('td');
        for (let i = 0; i < 4; i++) {
            let row = document.createElement('tr');
            row.innerHTML = grupo.equipos[i].nombre;
            col.appendChild(row);
        }
        document.getElementById("listaGrupos").appendChild(col);
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

function iniciarJuego(){
    simuladorPartidos.style.visibility = "visible";
    let i=1;
    while(i<=grupos.length){
        let nombre = grupos[i-1].nombre;
        document.getElementById("listadoDeGrupos").innerHTML+="<option value="+(i-1)+">"+nombre+"</option>";
        i++;
    }

    let btn = document.getElementById("confirmaGrupo");
    let opc = document.getElementById("listadoDeGrupos");

    btn.onclick = (e) => {
        e.preventDefault();

        let grSelec = grupos[opc.options[opc.selectedIndex].value];
        juego(grSelec);
    };
}

function juego(grupo){

    document.getElementById("confirmaGrupo").disabled=true;
    document.getElementById("listadoDeGrupos").disabled=true;

    document.getElementById("eqLocal").style.visibility="visible";

    let listaEquipos = [grupo.equipos[0], grupo.equipos[1], grupo.equipos[2], grupo.equipos[3]];
    let i=0;
    let eqNombre="";
    let eqLocal;
    let eqVisitante;

    while(i<listaEquipos.length){
        eqNombre=listaEquipos[i].nombre;
        document.getElementById("listaGrupoLoc").innerHTML+="<option value="+i+">"+eqNombre+"</option>";
        i++;
    }

    let btnLocal = document.getElementById("local");
    let opcLocal = document.getElementById("listaGrupoLoc");

    btnLocal.onclick = (e) => {
        e.preventDefault();
        
        let seleccionL = opcLocal.options[opcLocal.selectedIndex].value;

        document.getElementById("listaGrupoLoc").innerHTML="";

        eqLocal = listaEquipos[seleccionL];
        listaEquipos.splice(seleccionL,1);

        document.getElementById("local").disabled=true;
        document.getElementById("listaGrupoLoc").disabled=true;

        document.getElementById("eqVisitante").style.visibility="visible";
    
    //FIN ELECCION LOCAL
    
    i=0;
    while(i<listaEquipos.length){
        eqNombre=listaEquipos[i].nombre;
        document.getElementById("listaGrupoVis").innerHTML+="<option value="+i+">"+eqNombre+"</option>";
        i++;
    }

    btnVisitante = document.getElementById("visitante");
    opcVisitante = document.getElementById("listaGrupoVis");

    btnVisitante.onclick = (e) => {
        e.preventDefault();

        let seleccionV = opcVisitante.options[opcVisitante.selectedIndex].value;

        document.getElementById("listaGrupoVis").innerHTML="";

        eqVisitante = listaEquipos[seleccionV];

        document.getElementById("visitante").disabled=true;
        document.getElementById("listaGrupoVis").disabled=true;

        document.getElementById("resultado").style.visibility="visible";

    //FIN ELECCION VISITANTE

    document.getElementById("resultado").innerHTML=`
        <label>`+eqLocal.nombre+`</label><input type="number" min=0 value=0 id="golLocal">
        <label> -  </label>
        <input type="number" min=0 value=0 id="golVisita"><label>`+ eqVisitante.nombre+`</label>
        <button type="submit">Confirmar Resultado</button>
    `
    document.getElementById("resultado").addEventListener("submit", (e) => {
        e.preventDefault();
        //let resFinal = e.target;
        let golesLocal = document.getElementById("golLocal").value;
        let golesVisitante = document.getElementById("golVisita").value;

        if(golesLocal==""){     //Esto evita que tengan null, se le asigna 0 goles
            golesLocal=0;
        }
        if(golesVisitante==""){
            golesVisitante=0;
        }

        let partido;

        if(golesLocal>golesVisitante){
            partido = new Partido(eqLocal, eqVisitante, golesLocal, golesVisitante,eqLocal.nombre,eqLocal.estadio);
            alert(eqLocal.nombre+" Gano "+golesLocal+" a "+golesVisitante);
        }else{
            if(golesVisitante>golesLocal){
                partido = new Partido(eqLocal, eqVisitante, golesLocal, golesVisitante,eqVisitante.nombre,eqLocal.estadio);
                alert(eqVisitante.nombre+" Gano "+golesVisitante+" a "+golesLocal);
            }else{
                partido = new Partido(eqLocal, eqVisitante, golesLocal, golesVisitante,"empate",eqLocal.estadio);
                alert(eqLocal.nombre+" y "+eqVisitante.nombre+" Empataron "+golesLocal+" a "+golesVisitante);
            }
        }

        registroPartidos.push(partido);

        document.getElementById("listadoDeGrupos").innerHTML="";

        document.getElementById("confirmaGrupo").disabled=false;
        document.getElementById("listadoDeGrupos").disabled=false;
        document.getElementById("local").disabled=false;
        document.getElementById("listaGrupoLoc").disabled=false;
        document.getElementById("visitante").disabled=false;
        document.getElementById("listaGrupoVis").disabled=false;

        simuladorPartidos.style.visibility = "hidden";
        document.getElementById("eqLocal").style.visibility="hidden";
        document.getElementById("eqVisitante").style.visibility="hidden";
        document.getElementById("resultado").style.visibility="hidden";

    })

    };};
    
}

function infoPartidos(partido){
    let resultado = partido.equipo1.nombre + " " + partido.golesE1 + " - " + partido.golesE2 + " " + partido.equipo2.nombre;
    let estadio;
    if(partido.estadio == ""){
        estadio = "Estadio Neutral";
    }else{
        estadio = "Estadio "+partido.estadio;
    }
    return resultado+" - "+estadio;
}

function infoResultadosTorneo() {
    document.getElementById("registroDePartidos").innerHTML="";
    let i = 0;
    while (i < registroPartidos.length) {
        document.getElementById("registroDePartidos").innerHTML+='<tr><td>'+infoPartidos(registroPartidos[i])+'</td></tr>';
        i++;
    }
}

function guardarTorneo(e){
    e.preventDefault();
    let registroEquiposJSON = JSON.stringify(registroEquipos);
    let registroPartidosJSON = JSON.stringify(registroPartidos);
    let gruposJSON = JSON.stringify(grupos);
    localStorage.setItem('registroEquipos',registroEquiposJSON);
    localStorage.setItem('registroPartidos',registroPartidosJSON);
    localStorage.setItem('grupos',gruposJSON);
    alert("Se guardaron todos los datos");
}

function cargarTorneo(e){
    e.preventDefault();
    registroEquipos = JSON.parse(localStorage.getItem('registroEquipos'));
    registroPartidos = JSON.parse(localStorage.getItem('registroPartidos'));
    grupos = JSON.parse(localStorage.getItem('grupos'));
    alert("Se cargaron los ultimos datos guardados");
    document.getElementById("creaTorneo").disabled = true;
    document.getElementById("creaTorneo").style.visibility="hidden";
    btnGrupos.style.visibility = "visible";
    btnIniciarJuego.style.visibility = "visible";
    btnPromedio.style.visibility = "visible";
    btnRegistroPartidos.style.visibility = "visible";
    btnGuardarTorneo.style.visibility = "visible";
}