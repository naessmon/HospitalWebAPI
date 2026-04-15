// archivo
const API_URL = "https://localhost:5001/api/citas";

async function obtenerCitas() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tabla = document.getElementById("tablaCitas");
    tabla.innerHTML = "";

    data.forEach(cita => {
        tabla.innerHTML += `
            <tr>
                <td>${cita.paciente}</td>
                <td>${cita.doctor}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
            </tr>
        `;
    });
}

async function crearCita() {
    const paciente = document.getElementById("paciente").value;
    const doctor = document.getElementById("doctor").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    const nuevaCita = {
        paciente,
        doctor,
        fecha,
        hora
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCita)
    });

    obtenerCitas();
}

// cargar citas al iniciar
window.onload = obtenerCitas;