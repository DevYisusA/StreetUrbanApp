import { cargarCompras } from './listado.js';

export function cambiarEstadoCompra(id) {
    console.log('ID de compra recibido para cambiar estado:', id); // Log para verificar el ID

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cambiar el estado de esta compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cambiar',
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Confirmado por el usuario. Enviando solicitud al backend...');
            axios.post(`/purchases/change-status/${id}`)
                .then(response => {
                    console.log('Respuesta del backend:', response.data); // Log para la respuesta
                    Swal.fire(
                        'Cambiado',
                        `Estado cambiado a: ${response.data.status}`,
                        'success'
                    );
                    cargarCompras(); // Recarga la tabla para reflejar el cambio
                })
                .catch(error => {
                    console.error('Error al cambiar el estado:', error); // Log completo
                    console.error('Detalles del error:', error.response?.data); // Log de la respuesta si está presente
                    Swal.fire('Error', error.response?.data?.message || 'No se pudo cambiar el estado.', 'error');
                });
        } else {
            console.log('El usuario canceló la operación.');
        }
    });
};
