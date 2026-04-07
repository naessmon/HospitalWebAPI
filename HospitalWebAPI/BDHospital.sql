USE master;
GO

-- Eliminar la base de datos si ya existe
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'BDHospital')
BEGIN
    ALTER DATABASE BDHospital SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE BDHospital;
END
GO

-- Crear la base de datos
CREATE DATABASE BDHospital;
GO

USE BDHospital;
GO

/* =========================================
   TABLA: Especialidades
========================================= */
CREATE TABLE Especialidades (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

/* =========================================
   TABLA: Medicos
========================================= */
CREATE TABLE Medicos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    EspecialidadId INT NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Medicos_Especialidades
        FOREIGN KEY (EspecialidadId) REFERENCES Especialidades(Id)
);
GO

/* =========================================
   TABLA: Pacientes
========================================= */
CREATE TABLE Pacientes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    DNI VARCHAR(20) NOT NULL UNIQUE,
    Telefono VARCHAR(15) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

/* =========================================
   TABLA: Citas
========================================= */
CREATE TABLE Citas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PacienteId INT NOT NULL,
    MedicoId INT NOT NULL,
    FechaHora DATETIME NOT NULL,
    Motivo VARCHAR(255) NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    Activo BIT NOT NULL DEFAULT 1,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Citas_Pacientes
        FOREIGN KEY (PacienteId) REFERENCES Pacientes(Id),
    CONSTRAINT FK_Citas_Medicos
        FOREIGN KEY (MedicoId) REFERENCES Medicos(Id)
);
GO

/* =========================================
   DATOS DE PRUEBA
========================================= */

INSERT INTO Especialidades (Nombre, Descripcion)
VALUES
('Cardiologia', 'Especialidad encargada del corazon y sistema circulatorio'),
('Pediatria', 'Especialidad medica para la atencion de niños'),
('Dermatologia', 'Especialidad encargada de la piel');


GO

INSERT INTO Medicos (Nombre, Apellido, EspecialidadId, Telefono)
VALUES
('Carlos', 'Mejia', 1, '99998888'),
('Ana', 'Lopez', 2, '98887777'),
('Jorge', 'Ramirez', 3, '97776666');
GO

INSERT INTO Pacientes (Nombre, Apellido, FechaNacimiento, DNI, Telefono)
VALUES
('Luis', 'Martinez', '2000-05-10', '0801199900011', '94561234'),
('Maria', 'Gomez', '1998-08-20', '0801199800022', '93456789'),
('Jose', 'Hernandez', '2005-11-15', '0801200500033', '92345678');
GO

INSERT INTO Citas (PacienteId, MedicoId, FechaHora, Motivo, Estado)
VALUES
(1, 1, '2026-03-30 09:00:00', 'Chequeo cardiologico', 'Pendiente'),
(2, 2, '2026-03-30 10:30:00', 'Consulta pediatrica', 'Confirmada'),
(3, 3, '2026-03-31 02:00:00', 'Revision de piel', 'Pendiente');
GO

/* =========================================
   CONSULTAS DE VERIFICACION
========================================= */

SELECT * FROM Especialidades;
SELECT * FROM Medicos;
SELECT * FROM Pacientes;
SELECT * FROM Citas;
GO



