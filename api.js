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
    axios.get(`http://192.168.1.83:8000/reserveByUuid/${id}`)
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
  
    axios.put(`http://192.168.1.83:8000/reserve_update/${id}/2`, newData)
      .then(response => {
        // Manejar la respuesta exitosa
        const responseData = response.data;
        const responseContainer = document.getElementById('responseContainer');
        // Construir el HTML con la respuesta recibida
        let html = '';
        html += `<p>Estado: ${response.status}</p>`;
        html += `<p>Respuesta: ${responseData.message}</p>`;
        // Insertar el HTML en el contenedor de respuesta
        responseContainer.innerHTML = html;
      })
      .catch(error => {
        // Manejar el error
        console.error("error",error);

         // Manejar la respuesta exitosa
         const responseData = error.data;
         const responseContainer = document.getElementById('responseContainer');
         // Construir el HTML con la respuesta recibida
         let html = '';
         html += `<p>Este codigo tiene un error</p>`;
         html += `<p>${error.request.response}</p>`;
         // Insertar el HTML en el contenedor de respuesta
         responseContainer.innerHTML = html;
      });
  }

  