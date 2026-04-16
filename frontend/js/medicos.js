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
                
                data.forEach(medico => {
                    let fecha = medico.fechaCreacion ? formatearFecha(medico.fechaCreacion) : "N/A";
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
        .then(res => res.ok ? (showAlert("Guardado", "success"), btnListar.click(), limpiarFormulario()) : showAlert("Error al guardar", "error"));
    };

    document.getElementById("btnModificar").onclick = function() {
        const id = document.getElementById("txtId").value;
        if (!id) return showAlert("Selecciona un médico", "info");

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
        .then(res => res.ok ? (showAlert("Actualizado", "success"), btnListar.click()) : showAlert("Error", "error"));
    };

    // ELIMINAR 
    document.getElementById("btnEliminar").onclick = function() {
        const id = document.getElementById("txtId").value;
        if (!id) return showAlert("Selecciona un registro", "info");

        showConfirm("¿Seguro que deseas inactivar este médico?")
            .then(confirmed => {
                if (confirmed) {
                    fetch(`${urlAPI}/${id}`, { method: 'DELETE' })
                        .then(res => {
                            if (res.ok) {
                                showAlert("Inactivado correctamente", "success");
                                btnListar.click();
                            } else {
                                showAlert("Error al eliminar", "error");
                            }
                        });
                }
            });
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
function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}