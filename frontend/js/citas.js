// archivo
const urlApi = "http://localhost:5010/api/citas";
const urlPacientes = "http://localhost:5010/api/pacientes";
const urlMedicos = "http://localhost:5010/api/medicos";
let pacientesCache = {};
let medicosCache = {};

window.onload = function () {
    const btnListar = document.getElementById("btnListar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnModificar = document.getElementById("btnModificar");
    const btnEliminar = document.getElementById("btnEliminar");

    if (btnListar) btnListar.addEventListener("click", listar);
    if (btnAgregar) btnAgregar.addEventListener("click", agregar);
    if (btnModificar) btnModificar.addEventListener("click", modificar);
    if (btnEliminar) btnEliminar.addEventListener("click", eliminar);

    cargarCombos().then(listar).catch(err => console.error("Error al preparar comboboxes:", err));
};

function listar() {
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            const tabla = document.getElementById("tablaCitas");
            tabla.innerHTML = "";
            data.forEach(cita => {
                const fila = document.createElement("tr");
                const fechaHora = cita.fechaHora ? cita.fechaHora.replace('T', ' ') : "";
                const nombrePaciente = pacientesCache[cita.pacienteId] || "Desconocido";
                const nombreMedico = medicosCache[cita.medicoId] || "Desconocido";

                fila.innerHTML = `
                    <td>${cita.id}</td>
                    <td>${cita.pacienteId} - ${nombrePaciente}</td>
                    <td>${cita.medicoId} - ${nombreMedico}</td>
                    <td>${fechaHora}</td>
                    <td>${cita.motivo || ""}</td>
                    <td>${cita.estado || ""}</td>
                    <td>${cita.fechaCreacion ? new Date(cita.fechaCreacion).toLocaleDateString() : ''}</td>
                    <td>${cita.activo ? "Sí" : "No"}</td>
                    <td><button onclick='seleccionar(${JSON.stringify(cita)})'>Seleccionar</button></td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(err => console.error("Error al listar citas:", err));
}

function agregar() {
    const data = recolectarDatos();
    if (!data.PacienteId || !data.MedicoId) return alert("Paciente ID y Médico ID son obligatorios");

    fetch(urlApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert("Cita guardada");
        listar();
        limpiar();
    })
    .catch(err => {
        console.error("Error al guardar:", err);
        alert("Error al guardar la cita: " + err.message);
    });
}

function modificar() {
    const id = document.getElementById("txtId").value;
    if (!id) return alert("Seleccione una cita primero");

    const data = recolectarDatos();
    data.Id = parseInt(id);

    fetch(`${urlApi}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert("Cita actualizada");
        listar();
        limpiar();
    })
    .catch(err => {
        console.error("Error al actualizar:", err);
        alert("Error al actualizar la cita: " + err.message);
    });
}

function eliminar() {
    const id = document.getElementById("txtId").value;
    if (!id) return alert("Seleccione una cita");

    if (confirm("¿Desea eliminar esta cita?")) {
        fetch(`${urlApi}/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                alert("Cita eliminada");
                listar();
                limpiar();
            })
            .catch(err => {
                console.error("Error al eliminar:", err);
                alert("Error al eliminar la cita: " + err.message);
            });
    }
}

function recolectarDatos() {
    return {
        PacienteId: parseInt(document.getElementById("pacienteId").value) || 0,
        MedicoId: parseInt(document.getElementById("medicoId").value) || 0,
        FechaHora: document.getElementById("fechaHora").value || new Date().toISOString(),
        Motivo: document.getElementById("motivo").value.trim(),
        Estado: document.getElementById("estado").value.trim()
    };
}

function seleccionar(cita) {
    document.getElementById("txtId").value = cita.id;
    document.getElementById("pacienteId").value = cita.pacienteId;
    document.getElementById("medicoId").value = cita.medicoId;
    if (cita.fechaHora) {
        document.getElementById("fechaHora").value = cita.fechaHora.slice(0, 16); // Para datetime-local
    }
    document.getElementById("motivo").value = cita.motivo || "";
    document.getElementById("estado").value = cita.estado || "";
}

function limpiar() {
    document.getElementById("txtId").value = "";
    document.getElementById("pacienteId").value = "";
    document.getElementById("medicoId").value = "";
    document.getElementById("fechaHora").value = "";
    document.getElementById("motivo").value = "";
    document.getElementById("estado").value = "";
}

function cargarCombos() {
    return Promise.all([listarPacientes(), listarMedicos()]);
}

function listarPacientes() {
    return fetch(urlPacientes)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("pacienteId");
            if (!select) return;
            select.innerHTML = '<option value="">-- Seleccione paciente --</option>';
            pacientesCache = {};
            data.forEach(p => {
                pacientesCache[p.id] = `${p.nombre} ${p.apellido}`;
                const option = document.createElement("option");
                option.value = p.id;
                option.textContent = `${p.id} - ${p.nombre} ${p.apellido}`;
                select.appendChild(option);
            });
        });
}

function listarMedicos() {
    return fetch(urlMedicos)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("medicoId");
            if (!select) return;
            select.innerHTML = '<option value="">-- Seleccione médico --</option>';
            medicosCache = {};
            data.forEach(m => {
                medicosCache[m.id] = `${m.nombre} ${m.apellido}`;
                const option = document.createElement("option");
                option.value = m.id;
                option.textContent = `${m.id} - ${m.nombre} ${m.apellido}`;
                select.appendChild(option);
            });
        });
}