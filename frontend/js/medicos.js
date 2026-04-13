var urlAPI = "http://localhost:5122/api/Medicos";

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
                    let estadoNum = medico.activo ? 1 : 0;

                    cuerpo.innerHTML += `
                        <tr>
                            <td>${medico.id}</td>
                            <td>${medico.nombre}</td>
                            <td>${medico.apellido}</td>
                            <td>${medico.especialidadId}</td>
                            <td>${medico.telefono}</td>
                            <td>${fecha}</td>
                            <td>${estadoNum}</td>
                            <td>
                                <button style="color:black" onclick="cargarDatos(${medico.id}, '${medico.nombre}', '${medico.apellido}', ${medico.especialidadId}, '${medico.telefono}', '${fecha}', ${estadoNum})">
                                    Seleccionar
                                </button>
                            </td>
                        </tr>`;
                });
            });
    };

    // AGREGAR 
    document.getElementById("btnAgregar").onclick = function() {
        const estadoInput = document.getElementById("txtActivo").value;
        
        const nuevo = {
            nombre: document.getElementById("txtNombre").value,
            apellido: document.getElementById("txtApellido").value,
            especialidadId: parseInt(document.getElementById("txtEspecialidad").value),
            telefono: document.getElementById("txtTelefono").value,
            fechaCreacion: new Date(document.getElementById("txtFecha").value).toISOString(),
            activo: estadoInput == "1" // Si pones 1 es true, si pones 0 es false
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
            fechaCreacion: new Date(document.getElementById("txtFecha").value).toISOString(),
            activo: document.getElementById("txtActivo").value == "1"
        };

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
});

function cargarDatos(id, nombre, apellido, especialidad, telefono, fecha, activo) {
    document.getElementById("txtId").value = id;
    document.getElementById("txtNombre").value = nombre;
    document.getElementById("txtApellido").value = apellido;
    document.getElementById("txtEspecialidad").value = especialidad;
    document.getElementById("txtTelefono").value = telefono;
    document.getElementById("txtFecha").value = fecha;
    document.getElementById("txtActivo").value = activo;
}

function limpiarFormulario() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtEspecialidad").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtFecha").valueAsDate = new Date();
    document.getElementById("txtActivo").value = 1;
}