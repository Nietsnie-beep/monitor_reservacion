import { API_HOST, ATRACCION, HORARIO } from "./utils/const.js";

// var request = new XMLHttpRequest();

console.log("apihost", API_HOST);

// Obtener la referencia a la tabla
var tabla = document.getElementById('tabla-datos');
// recargarPagina()
// Realizar la solicitud GET a la API utilizando Axios
console.log("recaRGANDO");
const date = new Date();
const hour = String(date.getHours()).padStart(2, '0');
const minute = String(date.getMinutes()).padStart(2, '0');
const second = String(date.getSeconds()).padStart(2, '0');

const timeString = `${hour}:${minute}:${second}`;

const horariosArray = []
let horariosArrayPushsort = null
let horariosProx = null
console.log("time ", timeString);
async function obtenerDatos(){
await axios.get(`http://${API_HOST}/attractionHour/`)
    .then(response => {
        let datos2 = response.data
        const datos = datos2.filter((valor) => valor.atraction == ATRACCION); //NOTE - change value to config file
        console.log('datos ', datos);

        
            // console.log('datos-h', newHorariosArrays);

            for(let i = 0; i <  datos.length; i++){
                console.log('datosarray',datos[i]);
                horariosArray.push(datos[i])
            }
            console.log(horariosArray)

            const horariosArrayPush = [...horariosArray].sort((a,b) => a.startTime.localeCompare(b.startTime))

            horariosArrayPushsort = horariosArrayPush

            console.log('sort',horariosArrayPushsort);

            const valoresMyores = horariosArrayPushsort.filter((valor) => valor.startTime > timeString);
            
            horariosProx = valoresMyores
            
            console.log('valoresMayores',horariosProx); // Resultado: [5, 8, 3]
        })
    

    .catch(error => console.error(error))


await axios.get(`http://${API_HOST}/reserve_filter/?filtro=espera&reserve=${horariosProx[0].id}`)
// await axios.get(`${API_HOST}/reserve_filter/?filtro=espera&reserve=${horariosProx[0].id}`)
    .then(response => {
        var datos = response.data;
        console.log('horariosProx', horariosProx[0].id);
        // Generar filas de la tabla con los datos recibidos
        datos.forEach(dato => {

            axios.get(`http://${API_HOST}/team_detail/${dato.grupo}`)
                .then(response => {
                    let grupo = response.data.name
                    var fila = tabla.insertRow();

                    console.log('hola', grupo);
                    var celdaId = fila.insertCell();
                    celdaId.innerHTML = dato.id;

                    var celdaNombre = fila.insertCell();
                    celdaNombre.innerHTML = grupo;

                    // Agrega aquí más celdas según tus datos

                    // celdaId.style.backgroundColor = 'yellow';
                    celdaId.style.fontSize = '50px';
                    celdaId.style.fontWeight = 'bold';
                    celdaId.classList.add('text-center');
                    celdaId.classList.add('align-middle');

                    celdaNombre.style.fontSize = '50px';
                    celdaNombre.style.fontWeight = 'bold';
                    celdaNombre.classList.add('text-center');
                    celdaNombre.classList.add('align-middle');

                })
                .catch(error => console.error(error))

        });
    })
    .catch(error => console.error(error));
}
function recargarPagina() {
    setTimeout(function () {
        location.reload();
    }, 10000); // 5 segundos en milisegundos
}

obtenerDatos()
