
    const formulario = document.getElementById('formulario-tarea');
    const inputTarea = document.getElementById('nueva-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    // Mostrar tareas al cargar
    document.addEventListener('DOMContentLoaded', mostrarTareas);

    // Agregar tarea
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      const texto = inputTarea.value.trim();
      if (texto !== '') {
        const nuevaTarea = { id: Date.now(), texto, completada: false };
        tareas.push(nuevaTarea);
        guardarYActualizar();
        inputTarea.value = '';
      }
    });

    // Delegar eventos para marcar o eliminar
    listaTareas.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar')) {
        const id = Number(e.target.parentElement.dataset.id);
        tareas = tareas.filter(t => t.id !== id);
        guardarYActualizar();
      }

      if (e.target.classList.contains('texto-tarea')) {
        const id = Number(e.target.parentElement.dataset.id);
        const tarea = tareas.find(t => t.id === id);
        tarea.completada = !tarea.completada;
        guardarYActualizar();
      }
    });

    function mostrarTareas() {
      listaTareas.innerHTML = '';
      tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.dataset.id = tarea.id;
        li.innerHTML = `
          <span class="texto-tarea ${tarea.completada ? 'completada' : ''}">
            ${tarea.texto}
          </span>
          <button class="eliminar">🗑️</button>
        `;
        listaTareas.appendChild(li);
      });
    }

    function guardarYActualizar() {
      localStorage.setItem('tareas', JSON.stringify(tareas));
      mostrarTareas();
    }
 