document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. VALIDACIÓN DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); // Detener el envío por defecto

            // Capturar valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const correoConfirm = document.getElementById('correo-confirm').value.trim();
            const password = document.getElementById('password').value.trim();
            const passwordConfirm = document.getElementById('password-confirm').value.trim();
            const region = document.getElementById('region').value;
            const comuna = document.getElementById('comuna').value;

            // Expresión regular básica para correo
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Reglas de validación
            if (nombre === '') {
                alert('Por favor, ingresa tu nombre completo.');
                return;
            }

            if (!regexEmail.test(correo)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            if (correo !== correoConfirm) {
                alert('Los correos electrónicos no coinciden.');
                return;
            }

            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (password !== passwordConfirm) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (region === '') {
                alert('Por favor, selecciona una región.');
                return;
            }

            if (comuna === '') {
                alert('Por favor, selecciona una comuna.');
                return;
            }

            // Éxito
            alert('¡Registro exitoso!');
            formRegistro.reset();
        });
    }

    // ==========================================
    // 2. LÓGICA DINÁMICA DEL CARRITO DE COMPRAS
    // ==========================================
    const cantInput = document.querySelector('.cant-input');
    const totalPrecioElem = document.getElementById('total-precio');
    const btnEliminar = document.querySelector('.btn-eliminar');
    const precioBase = 24990; // Valor del producto de prueba

    if (cantInput && totalPrecioElem) {
        // Actualizar el subtotal/total al cambiar la cantidad
        cantInput.addEventListener('input', (e) => {
            let cantidad = parseInt(e.target.value);

            if (isNaN(cantidad) || cantidad < 1) {
                cantidad = 1;
                e.target.value = 1;
            }

            const total = cantidad * precioBase;
            totalPrecioElem.textContent = `$${total.toLocaleString('es-CL')}`;
        });
    }

    if (btnEliminar) {
        // Eliminar fila del carrito
        btnEliminar.addEventListener('click', (e) => {
            const fila = e.target.closest('tr');
            if (fila) {
                fila.remove();
                if (totalPrecioElem) {
                    totalPrecioElem.textContent = '$0';
                }
            }
        });
    }

});