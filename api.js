import { ATRACCION, API_HOST } from "./utils/const.js";

let uuid = ""
let errorApi = ''

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchById();
    console.log("uuid", uuid)
    console.log("actualizando", uuid);
  });
  
  function searchById() {
    const id = document.getElementById('idInput').value;
    uuid = id
    //cambiar ip 
    axios.get(`http://${API_HOST}/reserveByUuid/${id}`)
      .then(response => {
        // Manejar la respuesta exitosa
        const data = response.data;
        // const dataContainer = document.getElementById('dataContainer');
        // // Construir el HTML con los datos recibidos
        // let html = '';
        // html += `<p>ID: ${data.id}</p>`;
        // html += `<p>Nombre: ${data.nombre}</p>`;
        // html += `<p>Grupo: ${data.grupo}</p>`;

        // // Insertar el HTML en el contenedor
        // dataContainer.innerHTML = html;

        let reserve = data.reserve
        let group = data.grupo
        // console.log(group);
        updateData(uuid, data)
      })
      .catch(error => {
        // Manejar el error
        console.error(error);
        
      });
  }
  
  function updateData(id, data) {
    // console.log(persona);
    const newData = {
        status: 'espera',
        qr_code: '5554444',
        grupo: data.grupo,
        reserve: data.reserve,
        usuarios: [
          3,4
        ]
    }
  
    axios.put(`http://${API_HOST}/reserve_update/${id}/${ATRACCION}`, newData)
      .then(response => {
        // Manejar la respuesta exitosa
        const responseData = response.data;
        const responseContainer = document.getElementById('responseContainer');
        // Construir el HTML con la respuesta recibida
        let html = '';
        html += `<div style="text-align: center;">
        <div style="background-color: #E2D7C7; padding: 10px; margin-top: 20px; border-radius: 10px; display: inline-block; height: 30px; display: flex; align-items: center; justify-content: center;">
          <p style="font-size: 20px; font-weight: bold; text-align: center; color: #8f6d5a;">
          ${responseData.message}
          </p>
        </div>
      </div>`;
         
        // Insertar el HTML en el contenedor de respuesta
        responseContainer.innerHTML = html;
      })
      .catch(error => {
        // Manejar el error
        console.error("error hola", error.request.response);
        let errorNotAtraction = error.request.response
        let errorNotAtractionStr = "'" + errorNotAtraction + "'";

        console.log("error not atr", errorNotAtraction == error.request.response);

        if (errorNotAtraction
          == '{"error":"Esta no es la atracción correspondiente"}'){
          const responseData = error.data;
          const responseContainer = document.getElementById('responseContainer');
          // Construir el HTML con la respuesta recibida
          let html = '';
          html += `
          <div style="text-align: center;">
   <div style="background-color: #E2D7C7; padding: 10px; margin-top: 20px; border-radius: 10px; display: inline-block; height: 30px; display: flex; align-items: center; justify-content: center;">
     <p style="font-size: 20px; font-weight: bold; text-align: center; color: #610600;">
     Esta no es la atracción correspondiente
     </p>
   </div>
 </div>`;
 responseContainer.innerHTML = html;

        }else{
         // Manejar la respuesta exitosa
         const responseData = error.data;
         const responseContainer = document.getElementById('responseContainer');
         // Construir el HTML con la respuesta recibida
         let html = '';
         html += `
         <div style="text-align: center;">
  <div style="background-color: #E2D7C7; padding: 10px; margin-top: 20px; border-radius: 10px; display: inline-block; height: 30px; display: flex; align-items: center; justify-content: center;">
    <p style="font-size: 20px; font-weight: bold; text-align: center; color: #610600;">
      Este Codigo ya fue ejecutado
    </p>
  </div>
</div>`;
         // Insertar el HTML en el contenedor de respuesta
         responseContainer.innerHTML = html;
        }
      });
  }

  