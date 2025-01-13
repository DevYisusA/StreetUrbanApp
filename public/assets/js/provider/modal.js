let isEditMode = false;

// Función para abrir el modal en modo "Crear"
function abrirModalCrear() {
    isEditMode = false;
    document.getElementById('modalNuevoProviderLabel').innerText = 'Registro de Proveedor';
    document.getElementById('formNuevoProvider').reset();
    document.getElementById('idProvider').value = '';
    const modal = new bootstrap.Modal(document.getElementById('modalNuevoProvider'));
    modal.show();
}

// Función para abrir el modal en modo "Editar"
function abrirModalEditar(id) {
    isEditMode = true;
    document.getElementById('modalNuevoProviderLabel').innerText = 'Editar Proveedor';

    fetch(`/providers/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('idProvider').value = data.id;
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('ruc').value = data.ruc;
            document.getElementById('address').value = data.address;
            document.getElementById('phone').value = data.phone;
            const modal = new bootstrap.Modal(document.getElementById('modalNuevoProvider'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener los datos del proveedor:', error);
            alert('Hubo un problema al cargar los datos del proveedor.');
        });
}
