const urlApi = "http://localhost:5010/api/especialidades";

let especialidadActivoSeleccionada = true;
let especialidadFechaCreacionSeleccionada = null;

window.onload = function () {
    const btnListar = document.getElementById("btnListar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnModificar = document.getElementById("btnModificar");
    const btnEliminar = document.getElementById("btnEliminar");

    if (btnListar) btnListar.addEventListener("click", listar);
    if (btnAgregar) btnAgregar.addEventListener("click", agregar);
    if (btnModificar) btnModificar.addEventListener("click", modificar);
    if (btnEliminar) btnEliminar.addEventListener("click", eliminar);
    
    listar(); // Listar automáticamente al cargar
};

function listar() {
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            const cuerpo = document.getElementById("cuerpoTabla");
            cuerpo.innerHTML = "";
            data.forEach(e => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${e.id}</td>
                    <td>${e.nombre}</td>
                    <td>${e.descripcion}</td>
                    <td>${e.fechaCreacion ? new Date(e.fechaCreacion).toLocaleDateString() : ''}</td>
                    <td>${e.activo ? "Activo" : "Inactivo"}</td>
                    <td><button onclick='seleccionar(${JSON.stringify(e)})'>Seleccionar</button></td>
                `;
                cuerpo.appendChild(fila);
            });
        })
        .catch(err => console.error("Error al listar:", err));
}

function agregar() {
    const data = recolectarDatos();
    if (!data.nombre) return alert("El nombre es obligatorio");

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
        alert("Especialidad guardada");
        listar();
        limpiar();
    })
    .catch(err => {
        console.error("Error al guardar:", err);
        alert("Error al guardar la especialidad: " + err.message);
    });
}

function modificar() {
    const id = document.getElementById("txtId").value;
    if (!id) return alert("Seleccione una especialidad primero");

    const data = recolectarDatos();
    data.id = parseInt(id);
    data.activo = especialidadActivoSeleccionada;
    if (especialidadFechaCreacionSeleccionada) {
        data.fechaCreacion = especialidadFechaCreacionSeleccionada;
    }

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
        alert("Especialidad actualizada");
        listar();
        limpiar();
    })
    .catch(err => {
        console.error("Error al actualizar:", err);
        alert("Error al actualizar la especialidad: " + err.message);
    });
}

function eliminar() {
    const id = document.getElementById("txtId").value;
    if (!id) return alert("Seleccione una especialidad");

    if (confirm("¿Desea eliminar esta especialidad?")) {
        fetch(`${urlApi}/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                alert("Especialidad eliminada");
                listar();
                limpiar();
            })
            .catch(err => {
                console.error("Error al eliminar:", err);
                alert("Error al eliminar la especialidad: " + err.message);
            });
    }
}

function recolectarDatos() {
    return {
        nombre: document.getElementById("txtNombre").value.trim(),
        descripcion: document.getElementById("txtDescripcion").value.trim()
    };
}

function seleccionar(e) {
    document.getElementById("txtId").value = e.id;
    document.getElementById("txtNombre").value = e.nombre;
    document.getElementById("txtDescripcion").value = e.descripcion;
    especialidadActivoSeleccionada = e.activo;
    especialidadFechaCreacionSeleccionada = e.fechaCreacion || null;
}

function limpiar() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescripcion").value = "";
}