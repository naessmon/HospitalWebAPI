# Hospital UNAH - Sistema de Gestión Hospitalaria

## Descripción

Sistema web completo para la gestión de un hospital desarrollado como proyecto del Grupo 6 de Programación Orientada a Objetos. Permite administrar pacientes, médicos, especialidades y citas médicas con una interfaz moderna y responsive.

## Funcionalidades

### Gestión de Pacientes
- Registro completo con datos personales (nombre, apellido, fecha nacimiento, DNI, teléfono)
- Soft-delete para preservar datos históricos
- Validación de formato de DNI y teléfono

### Gestión de Médicos
- Asociación con especialidades médicas
- Información de contacto completa
- Sistema de especialidades dinámico

### Especialidades Médicas
- Catálogo de especialidades con nombre y descripción
- Gestión completa CRUD

### Sistema de Citas
- Programación de citas médicas
- Asociación paciente-médico
- Estados de cita: Confirmada, Pendiente, No Atendió
- Visualización de nombres en lugar de IDs

## Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con Flexbox/Grid
- **JavaScript (ES6+)** - Lógica de negocio y API calls
- **Fetch API** - Comunicación con backend

### Backend
- **ASP.NET Core** - API RESTful
- **Entity Framework** - ORM para base de datos
- **SQL Server** - Base de datos relacional

## Características de UI/UX

- **Interfaz responsiva** - Adaptable a móviles, tablets y desktop
- **Alertas personalizadas** - Popups elegantes en lugar de alert() nativos
- **Confirmaciones modernas** - Diálogos de confirmación con botones estilizados
- **Navegación intuitiva** - Navbar consistente en todas las páginas
- **Colores temáticos** - Verde para guardar, naranja para modificar, rojo para eliminar
- **Tablas con bordes elegantes** - Presentación clara de datos

## Instalación y Uso

1. **Backend**: Ejecutar la API ASP.NET Core en `http://localhost:5010`
2. **Frontend**: Abrir `index.html` en un navegador web
3. **Base de datos**: Configurar SQL Server con las entidades del proyecto (por favor notar que el nombre del servidor utilizado es SQLEXPRESS02, esto se puede modificar para que corra en su computadora en el appsettings.json

## Equipo

**Grupo 6 - Programación Orientada a Objetos**
- Proyecto académico - IPAC 2026
Jenifer Padilla 20241900042
Leonel Contreras 20191900210
Natalie Machado 20241930090 - Coordinadora
Nazareth Dubón 20221000123
Wilhelm Alcerro 20211900034


## Notas Técnicas

- **Soft-delete**: Campo `activo` para eliminación lógica
- **Campos preservados**: `fechaCreacion` no se modifica en updates pero son manejados internamente por la BDD
- **Formato fechas**: dd/mm/yyyy para mejor legibilidad
- **Validaciones**: Tanto frontend como backend validan datos
