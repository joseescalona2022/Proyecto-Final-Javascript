//*ALERTA DE BIENVENIDA*//

Swal.fire({
    title: 'Bienvenido',
    text: 'Estás a 1 paso de tu película favorita',
    icon: 'success',
    confirmButtonText: 'Quiero elegir mis asientos'
  })
 

//*FUNCIONES*/

function estaElAsientoReservado (id){

    const reserva = asientosReservados.find( (elemento) =>  {
        return elemento.id === id

    });

    return (reserva !== undefined);
}

function renderizarAsientos() {

    contenedor.innerHTML = ""
    for (let i = 1; i <= filas; i++) {

        // CREANDO LAS FILAS //
    
        const fila = document.createElement("div");
        fila.className = "fila";
    
        for (let j = 1; j <= columnas; j++) {
    
            //ID DE LOS ASIENTOS //
    
            const id = i.toString() + j.toString();
    
    
            // CREANDO ASIENTOS // 
    
            const asiento = document.createElement("div");

            if(estaElAsientoReservado(id)){
                asiento.className = "asiento reservado";
            
            } else {
                asiento.className = "asiento";
            }


    
            // EVENTO DE CLICk//
    
            asiento.addEventListener("click", (event) => {
                validarSeleccionAsiento(event, id)
    
            });
    
            //AGREGAR ASIENTO A LA FILA// 
    
            fila.append(asiento);
    
        }
    
        //AGREGAR FILA AL CONTENEDOR// 
        contenedor.append(fila);
    
    }


}

function obtenerAsientosReservados () {

    let reservas = [];

    let asientos = [];

    const reservasLS = localStorage.getItem("reservas");

    if(reservasLS !== null){

        reservas = JSON.parse(reservasLS);

        return reservas; 

        


    }
}

function validarSeleccionAsiento(event, id) {

    const target = event.target;



    if (asientosSeleccionados.includes(id)) {

        target.className = "asiento"



        asientosSeleccionados = asientosSeleccionados.filter((elemento) => {
            return elemento !== id

        });

    } else {

        if (asientosSeleccionados.length < cantidadEntradas) {

            if(!estaElAsientoReservado(id)){

            target.className = "asiento seleccionado";

            asientosSeleccionados.push(id);

            }

        }


    }
}


/** VARIABLES GLOBALES */

const filas = 8;
const columnas = 8;
let cantidadEntradas = 0;
let asientosSeleccionados = []
let asientosReservados = obtenerAsientosReservados();



/**ELEMENTOS DEL DOM */

const contenedor = document.getElementById("contenedor");
const selectEntradas = document.getElementById("entradas");
const form =  document.getElementById("reserva")



/** INICIO  */

renderizarAsientos()



selectEntradas.addEventListener("change", () => {

    cantidadEntradas = parseInt(selectEntradas.value);


});

form.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputNombre = document.getElementById("nombre");

    const nombre = inputNombre.value;

    


    for(const asientoSeleccionado of asientosSeleccionados){
        asientosReservados.push({
            id: asientoSeleccionado,
            nombre:nombre,
        });
    }

    localStorage.setItem("reservas", JSON.stringify
    (asientosReservados));

    renderizarAsientos();


    // LIMPIEZA DE LOS INPUTS //
    cantidadEntradas = 0
    asientosSeleccionados =[]
    selectEntradas.value = "0";
    inputNombre.value = "" ;


});