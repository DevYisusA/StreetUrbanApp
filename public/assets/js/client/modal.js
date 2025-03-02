let isEditMode = false;

// Función para abrir el modal en modo "Crear"
function abrirModalCrear() {
    isEditMode = false;
    document.getElementById('modalNuevoClienteLabel').innerText = 'Registro de Cliente';
    document.getElementById('formNuevoCliente').reset();
    document.getElementById('idCliente').value = '';
    const modal = new bootstrap.Modal(document.getElementById('modalNuevoCliente'));
    modal.show();
}

// Función para abrir el modal en modo "Editar"
function abrirModalEditar(id) {
    isEditMode = true;
    document.getElementById('modalNuevoClienteLabel').innerText = 'Editar Cliente';

    fetch(`/clients/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('idCliente').value = data.id;
            document.getElementById('name').value = data.name;
            document.getElementById('dni').value = data.dni;
            document.getElementById('ruc').value = data.ruc;
            document.getElementById('phone').value = data.phone;
            document.getElementById('address').value = data.address;
            document.getElementById('email').value = data.email;
            const modal = new bootstrap.Modal(document.getElementById('modalNuevoCliente'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener los datos del cliente:', error);
            alert('Hubo un problema al cargar los datos del cliente.');
        });
}

// Función para buscar datos por DNI
function buscarPorDNI() {
    const dniInput = document.getElementById('dni');
    const dni = dniInput.value.trim();

    if (!dni || dni.length !== 8 || isNaN(dni)) {
        Swal.fire('Error', 'Ingrese un DNI válido de 8 dígitos.', 'error');
        return;
    }

    // Codificar la URL para evitar errores con caracteres especiales
    const url = `https://cors-anywhere.herokuapp.com/https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
    console.log('URL generada:', url);

    // Realizar la solicitud a la API
    axios.get(url, {
        headers: {
            Authorization: `Bearer apis-token-12793.ndN8GZi5D3ldyMaqDMSx8Gd9GtCjiaxz`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            const data = response.data;

            // Validar si los datos existen
            if (!data || !data.nombres) {
                Swal.fire('Error', 'No se encontraron datos para este DNI.', 'error');
                return;
            }

            // Actualizar los campos del formulario
            document.getElementById('name').value = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
            document.getElementById('address').value = data.direccion || 'Dirección no registrada';

            Swal.fire({
                title: 'Información encontrada',
                icon: 'success',
                toast: true,
                position: 'top-end', // Puedes cambiar a 'center', 'top', 'bottom', etc.
                showConfirmButton: false,
                timer: 4000, // La alerta desaparecerá en 4 segundos
                timerProgressBar: true,
                customClass: {
                    popup: 'swal-success-border' // Aplica una clase CSS personalizada
                }
            });


        })
        .catch(error => {
            if (error.response) {
                console.error('Detalles del error:', error.response.data);
                Swal.fire({
                    title: 'Error',
                    text: `Error al consultar el DNI: ${error.response.data.error || 'Desconocido'}`,
                    icon: 'error',
                    toast: true,  // Hace que sea un toast
                    position: 'top-end', // Posición en la pantalla
                    showConfirmButton: false, // No muestra botón de confirmación
                    timer: 4000, // La alerta desaparecerá en 4 segundos
                    timerProgressBar: true, // Muestra una barra de progreso
                    customClass: {
                        popup: 'swal-error-border' // Puedes aplicar una clase CSS personalizada
                    }
                });
                Swal.fire('Error', `Error al consultar el DNI: ${error.response.data.error || 'Desconocido'}`, 'error');
            } else {
           console.error('Error al consultar el DNI:', error);
                Swal.fire('Error', 'No se pudo obtener la información del cliente.', 'error');     
            }
        });
}

// Asociar la función al botón
document.addEventListener('DOMContentLoaded', () => {
    const searchDniButton = document.getElementById('searchDni');
    if (searchDniButton) {
        searchDniButton.addEventListener('click', buscarPorDNI);
    }
});