axios.get('http://192.168.1.83:8000/reserve_filter/?filtro=espera&reserve=34')
  .then(response => {
    const datos = response.data;
    console.log('datos',datos[0].id);
    // Llama a la función para mostrar los datos en HTML
    mostrarDatos(datos);
    recargarPagina()
  })
  .catch(error => {
    console.error(error);
  });


  function mostrarDatos(datos) {
    const contenedorDatos = document.getElementById('contenedor-datos');
  
    datos.forEach(dato => {
      const elemento = document.createElement('td');
      elemento.textContent = dato.id;
      
      contenedorDatos.appendChild(elemento);

      const team = document.createElement('p'); 
      team.textContent = dato.grupo;
       
      contenedorDatos.appendChild(team);
    });
  }

  // Función para recargar la página cada 10 segundos (10000 milisegundos)
function recargarPagina() {
    setTimeout(function() {
      location.reload();
    }, 10000); // 10 segundos en milisegundos
  }
  
  // Llama a la función para iniciar la recarga automática de la página
  recargarPagina();