# Hospital UNAH - Sistema de Gestión Hospitalaria

## 📋 Descripción

Sistema web completo para la gestión de un hospital desarrollado como proyecto académico del Grupo 6 de Programación Orientada a Objetos. Permite administrar pacientes, médicos, especialidades y citas médicas con una interfaz moderna y responsiva.

## 🏥 Funcionalidades

### 👥 Gestión de Pacientes
- Registro completo con datos personales (nombre, apellido, fecha nacimiento, DNI, teléfono)
- Soft-delete para preservar datos históricos
- Validación de formato de DNI y teléfono

### 👨‍⚕️ Gestión de Médicos
- Asociación con especialidades médicas
- Información de contacto completa
- Sistema de especialidades dinámico

### 🏥 Especialidades Médicas
- Catálogo de especialidades con nombre y descripción
- Gestión completa CRUD

### 📅 Sistema de Citas
- Programación de citas médicas
- Asociación paciente-médico
- Estados de cita: Confirmada, Pendiente, No Atendió
- Visualización de nombres en lugar de IDs

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con Flexbox/Grid
- **JavaScript (ES6+)** - Lógica de negocio y API calls
- **Fetch API** - Comunicación con backend

### Backend
- **ASP.NET Core** - API RESTful
- **Entity Framework** - ORM para base de datos
- **SQL Server** - Base de datos relacional

## 🎨 Características de UI/UX

- **Interfaz responsiva** - Adaptable a móviles, tablets y desktop
- **Alertas personalizadas** - Popups elegantes en lugar de alert() nativos
- **Confirmaciones modernas** - Diálogos de confirmación con botones estilizados
- **Navegación intuitiva** - Navbar consistente en todas las páginas
- **Colores temáticos** - Verde para guardar, naranja para modificar, rojo para eliminar
- **Tablas con bordes elegantes** - Presentación clara de datos

## 📁 Estructura del Proyecto

```
HospitalWebAPI/
├── frontend/           # Aplicación web cliente
│   ├── index.html      # Página principal
│   ├── pacientes.html  # Gestión de pacientes
│   ├── medicos.html    # Gestión de médicos
│   ├── especialidades.html  # Gestión de especialidades
│   ├── citas.html      # Gestión de citas
│   ├── style.css       # Estilos globales
│   └── js/             # Scripts JavaScript
│       ├── alert.js    # Sistema de alertas personalizado
│       ├── pacientes.js
│       ├── medicos.js
│       ├── especialidades.js
│       └── citas.js
└── backend/            # API ASP.NET Core
    ├── Controllers/    # Controladores REST
    ├── Models/         # Modelos de datos
    └── Data/           # Contexto de base de datos
```

## 🚀 Instalación y Uso

1. **Backend**: Ejecutar la API ASP.NET Core en `http://localhost:5010`
2. **Frontend**: Abrir `index.html` en un navegador web
3. **Base de datos**: Configurar SQL Server con las entidades del proyecto

## 👥 Equipo

**Grupo 6 - Programación Orientada a Objetos**
- Proyecto académico - IPAC 2026

## 📝 Notas Técnicas

- **Soft-delete**: Campo `activo` para eliminación lógica
- **Campos preservados**: `fechaCreacion` no se modifica en updates
- **Formato fechas**: dd/mm/yyyy para mejor legibilidad
- **IDs ocultos**: Comboboxes muestran nombres, mantienen IDs internamente
- **Validaciones**: Tanto frontend como backend validan datos