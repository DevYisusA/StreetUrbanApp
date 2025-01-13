// Función para eliminar un cliente
function borrarCliente(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Eliminado!',
                        'El cliente ha sido eliminado.',
                        'success'
                    ).then(() => {
                        cargarClientes(); // Recargar la tabla o actualizar la lista
                    });
                } else {
                    throw new Error('No se pudo eliminar el cliente');
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el cliente.',
                    'error'
                );
            });
        }
    });
}