// Sistema de alertas personalizado

// Crear el elemento modal una sola vez
function initializeAlertSystem() {
    if (!document.getElementById("modalAlert")) {
        const modalHTML = `
        <div id="modalOverlay" class="modal-overlay">
            <div id="modalAlert" class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Notificación</h2>
                    <button class="modal-close" onclick="closeAlert()">×</button>
                </div>
                <div class="modal-body" id="modalMessage"></div>
                <div class="modal-footer">
                    <button onclick="closeAlert()">Aceptar</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        // Cerrar al hacer click fuera del modal
        document.getElementById("modalOverlay").addEventListener("click", function(e) {
            if (e.target === this) {
                closeAlert();
            }
        });
    }
}

// Mostrar alerta
function showAlert(message, type = "info", title = null) {
    initializeAlertSystem();

    const overlay = document.getElementById("modalOverlay");
    const modal = document.getElementById("modalAlert");
    const titleElement = document.getElementById("modalTitle");
    const messageElement = document.getElementById("modalMessage");
    const footer = document.querySelector(".modal-footer");

    // Tipo de alerta (success, error, info)
    modal.className = "modal-content " + type;

    // Establecer el título según el tipo
    if (!title) {
        if (type === "success") {
            title = "✓ Éxito";
        } else if (type === "error") {
            title = "✗ Error";
        } else {
            title = "ℹ Información";
        }
    }

    titleElement.textContent = title;
    messageElement.textContent = message;

    // Configurar footer para alerta (solo botón Aceptar)
    footer.innerHTML = '<button onclick="closeAlert()">Aceptar</button>';

    // Mostrar el modal
    overlay.classList.add("active");
}

// Mostrar confirmación personalizada
function showConfirm(message, title = "Confirmación") {
    return new Promise((resolve) => {
        initializeAlertSystem();

        const overlay = document.getElementById("modalOverlay");
        const modal = document.getElementById("modalAlert");
        const titleElement = document.getElementById("modalTitle");
        const messageElement = document.getElementById("modalMessage");
        const footer = document.querySelector(".modal-footer");

        // Establecer estilo de confirmación
        modal.className = "modal-content warning";

        titleElement.textContent = title;
        messageElement.textContent = message;

        // Configurar footer para confirmación (botones Aceptar y Cancelar)
        footer.innerHTML = `
            <button class="btn-cancel" onclick="resolveConfirm(false)">Cancelar</button>
            <button class="btn-confirm" onclick="resolveConfirm(true)">Aceptar</button>
        `;

        // Función para resolver la promesa
        window.resolveConfirm = function(result) {
            closeAlert();
            delete window.resolveConfirm;
            resolve(result);
        };

        // Mostrar el modal
        overlay.classList.add("active");
    });
}

// Cerrar alerta
function closeAlert() {
    const overlay = document.getElementById("modalOverlay");
    if (overlay) {
        overlay.classList.remove("active");
    }
}

window.addEventListener("DOMContentLoaded", initializeAlertSystem);
