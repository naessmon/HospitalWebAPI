const urlAPI = "http://localhost:5010/api/Medicos";
const urlEspecialidades = "http://localhost:5010/api/especialidades";
let medicoActivoSeleccionado = true;
let medicoFechaCreacionSeleccionada = null;
let especialidadesCache = {};

document.addEventListener("DOMContentLoaded", () => {
    const btnListar = document.getElementById("btnListar");

    // LISTAR 
    btnListar.onclick = function() {
        fetch(urlAPI)
            .then(res => res.json())
            .then(data => {
                let cuerpo = document.getElementById("cuerpoTabla");
                cuerpo.innerHTML = "";
                
                const activos = data.filter(m => m.activo === true);

                activos.forEach(medico => {
                    let fecha = medico.fechaCreacion ? medico.fechaCreacion.split('T')[0] : "N/A";
                    let estadoTexto = medico.activo ? "Activo" : "Inactivo";

                    const nombreEspecialidad = especialidadesCache[medico.especialidadId] || `ID ${medico.especialidadId}`;
                    cuerpo.innerHTML += `
                        <tr>
                            <td>${medico.id}</td>
                            <td>${medico.nombre}</td>
                            <td>${medico.apellido}</td>
                            <td>${nombreEspecialidad}</td>
                            <td>${medico.telefono}</td>
                            <td>${fecha}</td>
                            <td>${estadoTexto}</td>
                            <td>
                                <button style="color:black" onclick="cargarDatos(${medico.id}, '${medico.nombre}', '${medico.apellido}', ${medico.especialidadId}, '${medico.telefono}', '${fecha}', ${medico.activo ? 1 : 0})">
                                    Seleccionar
                                </button>
                            </td>
                        </tr>`;
                });
            });
    };

    // AGREGAR 
    document.getElementById("btnAgregar").onclick = function() {
        const nuevo = {
            nombre: document.getElementById("txtNombre").value,
            apellido: document.getElementById("txtApellido").value,
            especialidadId: parseInt(document.getElementById("txtEspecialidad").value),
            telefono: document.getElementById("txtTelefono").value
        };

        fetch(urlAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo)
        })
        .then(res => res.ok ? (alert("Guardado"), btnListar.click(), limpiarFormulario()) : alert("Error al guardar"));
    };

    document.getElementById("btnModificar").onclick = function() {
        const id = document.getElementById("txtId").value;
        if (!id) return alert("Selecciona un médico");

        const editado = {
            id: parseInt(id),
            nombre: document.getElementById("txtNombre").value,
            apellido: document.getElementById("txtApellido").value,
            especialidadId: parseInt(document.getElementById("txtEspecialidad").value),
            telefono: document.getElementById("txtTelefono").value,
            activo: medicoActivoSeleccionado
        };
        if (medicoFechaCreacionSeleccionada) {
            editado.fechaCreacion = medicoFechaCreacionSeleccionada;
        }

        fetch(`${urlAPI}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editado)
        })
        .then(res => res.ok ? (alert("Actualizado"), btnListar.click()) : alert("Error"));
    };

    // ELIMINAR 
    document.getElementById("btnEliminar").onclick = function() {
        const id = document.getElementById("txtId").value;
        if (!id) return alert("Selecciona un registro");

        if (confirm("¿Seguro que deseas inactivar este médico?")) {
            fetch(`${urlAPI}/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        alert("Inactivado correctamente");
                        btnListar.click(); // Al recargar, desaparecerá por el filtro
                    } else {
                        alert("Error al eliminar");
                    }
                });
        }
    };

    cargarEspecialidades().catch(err => console.error("Error cargando especialidades:", err));
});

function cargarDatos(id, nombre, apellido, especialidad, telefono, fecha, activo) {
    document.getElementById("txtId").value = id;
    document.getElementById("txtNombre").value = nombre;
    document.getElementById("txtApellido").value = apellido;
    document.getElementById("txtEspecialidad").value = especialidad;
    document.getElementById("txtTelefono").value = telefono;
    medicoActivoSeleccionado = activo === 1;
    medicoFechaCreacionSeleccionada = fecha || null;
}

function limpiarFormulario() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtEspecialidad").value = "";
    document.getElementById("txtTelefono").value = "";
    medicoActivoSeleccionado = true;
    medicoFechaCreacionSeleccionada = null;
}

function cargarEspecialidades() {
    return fetch(urlEspecialidades)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("txtEspecialidad");
            if (!select) return;
            especialidadesCache = {};
            select.innerHTML = '<option value="">-- Seleccione especialidad --</option>';
            data.forEach(e => {
                especialidadesCache[e.id] = e.nombre;
                const opt = document.createElement("option");
                opt.value = e.id;
                opt.textContent = `${e.id} - ${e.nombre}`;
                select.appendChild(opt);
            });
        });
}