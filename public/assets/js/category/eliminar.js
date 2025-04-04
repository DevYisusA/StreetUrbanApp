// Función para eliminar una categoría
function borrarCategoria(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarla',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Eliminada!',
                        'La categoría ha sido eliminada.',
                        'success'
                    ).then(() => {
                        cargarCategorias(); // Recargar la tabla
                    });
                } else {
                    throw new Error('No se pudo eliminar la categoría');
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar la categoría.',
                    'error'
                );
            });
        }
    });
}
