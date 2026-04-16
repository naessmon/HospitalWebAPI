const urlApi = "http://localhost:5010/api/pacientes";

let pacienteActivoSeleccionado = true;
let pacienteFechaCreacionSeleccionada = null;

window.onload = function () {
    console.log("Página cargada. Inicializando eventos...");

    // 0. PRUEBA DE CONEXIÓN INICIAL
    fetch("https://localhost:5010/api/pacientes")
        .then(res => res.json())
        .then(data => console.log("Conexión inicial exitosa. Datos:", data))
        .catch(err => console.error("Error de conexión (Posible CORS o API apagada):", err));

    // Asignación de eventos con verificación de existencia
    const btnListar = document.getElementById("btnListar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnModificar = document.getElementById("btnModificar");
    const btnEliminar = document.getElementById("btnEliminar");

    if (btnListar) btnListar.addEventListener("click", listar);
    if (btnAgregar) btnAgregar.addEventListener("click", agregar);
    if (btnModificar) btnModificar.addEventListener("click", modificar);
    if (btnEliminar) btnEliminar.addEventListener("click", eliminar);
};

// 1. FUNCIÓN LISTAR (GET)
function listar() {
    fetch(urlApi)
        .then(res => {
            if (!res.ok) throw new Error("Error en la respuesta del servidor");
            return res.json();
        })
        .then(data => {
            const cuerpo = document.getElementById("cuerpoTabla");
            if (!cuerpo) return;
            cuerpo.innerHTML = "";
            data.forEach(p => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nombre} ${p.apellido}</td>
                    <td>${p.fechaNacimiento ? formatearFecha(p.fechaNacimiento) : ''}</td>
                    <td>${p.dni}</td>
                    <td>${p.telefono}</td>
                    <td>${p.fechaCreacion ? formatearFecha(p.fechaCreacion) : ''}</td>
                    <td>${p.activo ? "Activo" : "Inactivo"}</td>
                    <td><button onclick='seleccionar(${JSON.stringify(p)})'>Seleccionar</button></td>
                `;
                cuerpo.appendChild(fila);
            });
        })
        .catch(err => showAlert("Error al listar: " + err.message, "error"));
}

// 2. FUNCIÓN AGREGAR (POST)
function agregar() {
    const data = recolectarDatos();
    if (!data) return;

    if (!data.nombre || !data.apellido || !data.dni) {
        showAlert("Campos obligatorios faltantes.", "info");
        return;
    }

    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async res => {
        if (res.ok) {
            showAlert("¡Paciente guardado!", "success");
            listar();
            limpiar();
        } else {
            const texto = await res.text();
            console.error("Error servidor:", texto);
            showAlert("El servidor rechazó los datos (400/500).", "error");
        }
    })
    .catch(err => showAlert("Error de red: " + err.message, "error"));
}

// 3. FUNCIÓN MODIFICAR (PUT)
function modificar() {
    const id = document.getElementById("txtId").value;
    if (!id) return showAlert("Seleccione un registro", "info");

    const data = recolectarDatos();
    if (!data) return;

    data.id = parseInt(id);
    data.activo = pacienteActivoSeleccionado;
    if (pacienteFechaCreacionSeleccionada) {
        data.fechaCreacion = pacienteFechaCreacionSeleccionada;
    }

    fetch(`${urlApi}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) { showAlert("Actualizado", "success"); listar(); limpiar(); }
        else showAlert("Error al actualizar.", "error");
    })
    .catch(err => showAlert("Error de red: " + err.message, "error"));
}

// 4. FUNCIÓN ELIMINAR (DELETE)
function eliminar() {
    const id = document.getElementById("txtId").value;
    if (!id) return showAlert("Seleccione un registro", "info");

    showConfirm("¿Eliminar registro?")
        .then(confirmed => {
            if (confirmed) {
                fetch(`${urlApi}/${id}`, { method: 'DELETE' })
                    .then(res => {
                        if (res.ok) { showAlert("Eliminado", "success"); listar(); limpiar(); }
                        else showAlert("Error al eliminar.", "error");
                    })
                    .catch(err => showAlert("Error de red: " + err.message, "error"));
            }
        });
}

function recolectarDatos() {
    const dni = document.getElementById("txtDNI").value.trim();
    const telefono = document.getElementById("txtTelefono").value.trim();

    // Validar que DNI y teléfono solo contengan números y guiones
    if (dni && !/^[\d\-]+$/.test(dni)) {
        showAlert("DNI solo debe contener números y guiones.", "info");
        return null;
    }
    if (telefono && !/^[\d\-]+$/.test(telefono)) {
        showAlert("Teléfono solo debe contener números y guiones.", "info");
        return null;
    }

    return {
        nombre: document.getElementById("txtNombre").value.trim(),
        apellido: document.getElementById("txtApellido").value.trim(),
        fechaNacimiento: document.getElementById("txtFechaNacimiento").value || new Date().toISOString().split('T')[0],
        dni: dni,
        telefono: telefono
    };
}

function seleccionar(p) {
    document.getElementById("txtId").value = p.id;
    document.getElementById("txtNombre").value = p.nombre;
    document.getElementById("txtApellido").value = p.apellido;
    document.getElementById("txtDNI").value = p.dni;
    document.getElementById("txtTelefono").value = p.telefono;
    pacienteActivoSeleccionado = p.activo;
    pacienteFechaCreacionSeleccionada = p.fechaCreacion || null;
    if (p.fechaNacimiento) document.getElementById("txtFechaNacimiento").value = p.fechaNacimiento.split('T')[0];
}

function limpiar() {
    const campos = ["txtId", "txtNombre", "txtApellido", "txtDNI", "txtFechaNacimiento", "txtTelefono"];
    campos.forEach(c => document.getElementById(c).value = "");
}

function formatearFecha(fechaISO) {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}