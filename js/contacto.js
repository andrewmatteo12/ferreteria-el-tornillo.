/**
 * Ferretería El Tornillo - Lógica de Validación del Formulario de Contacto
 * Valida en el navegador que el nombre tenga al menos 2 caracteres
 * antes de presentar el mensaje de confirmación.
 */

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputMensaje = document.getElementById('mensaje');
  const alertaContenedor = document.getElementById('alerta-formulario');

  if (!formulario || !inputNombre || !alertaContenedor) {
    return;
  }

  // Función para mostrar alertas dinámicas (error o éxito)
  const mostrarAlerta = (mensaje, tipo = 'error') => {
    alertaContenedor.innerHTML = `
      <div class="alert ${tipo === 'error' ? 'alert-error' : 'alert-success'}" role="alert">
        <span aria-hidden="true">${tipo === 'error' ? '⚠️' : '✅'}</span>
        <span>${mensaje}</span>
      </div>
    `;
  };

  // Función para limpiar alertas
  const limpiarAlerta = () => {
    alertaContenedor.innerHTML = '';
    inputNombre.classList.remove('input-error');
  };

  // Limpiar advertencia visual en cuanto el usuario empiece a escribir
  inputNombre.addEventListener('input', () => {
    if (inputNombre.value.trim().length >= 2) {
      inputNombre.classList.remove('input-error');
      // Si había un mensaje de error previo, lo retiramos
      const alertElem = alertaContenedor.querySelector('.alert-error');
      if (alertElem) {
        alertaContenedor.innerHTML = '';
      }
    }
  });

  // Manejador del evento de envío del formulario
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombreValor = inputNombre.value.trim();

    // Criterio de validación: el nombre debe tener al menos 2 caracteres
    if (nombreValor.length < 2) {
      inputNombre.classList.add('input-error');
      inputNombre.focus();
      
      if (nombreValor.length === 0) {
        mostrarAlerta('Por favor completa el campo de nombre antes de enviar el mensaje.', 'error');
      } else {
        mostrarAlerta('El nombre debe contener al menos 2 caracteres.', 'error');
      }
      return;
    }

    // Si la validación es exitosa
    inputNombre.classList.remove('input-error');
    mostrarAlerta(`¡Gracias por escribirnos, ${nombreValor}! Hemos recibido tu consulta y te responderemos a la brevedad.`, 'success');

    // Restablecer formulario
    formulario.reset();
  });
});
