# API REST - Orquestación de Servicios Logísticos

Esta API simula una plataforma para la orquestación de servicios REST en una empresa de logística. Incluye autenticación, control de acceso, y funciones para orquestar, registrar y consultar servicios.

## 🛠 Tecnologías
- Node.js
- Express.js
- Railway (Deploy)
- GitHub (CI/CD)

## 🚀 Endpoints principales

| Método | Ruta                              | Rol requerido       | Descripción |
|--------|-----------------------------------|---------------------|-------------|
| POST   | `/autenticar-usuario`            | -                   | Autenticar usuario |
| POST   | `/registrar-servicio`            | Administrador       | Registrar nuevo servicio |
| GET    | `/informacion-servicio/:id`      | Cualquier usuario   | Consultar información de un servicio |
| POST   | `/orquestar`                     | Orquestador/Admin   | Orquestar un servicio |
| PUT    | `/actualizar-reglas-orquestacion`| Orquestador         | Actualizar reglas de orquestación |
| POST   | `/autorizar-acceso`              | Basado en rol       | Verificar autorización para recursos |

## 🔐 Autenticación
Usa un token retornado por `/autenticar-usuario` en el header:


## 👤 Usuarios de prueba

Puedes autenticarte con uno de estos usuarios para probar la API:

| Usuario       | Contraseña | Rol           | Descripción de Permisos                        |
|---------------|------------|----------------|------------------------------------------------|
| `admin`       | `1234`     | Administrador  | Puede registrar servicios y orquestar          |
| `orquestador` | `abcd`     | Orquestador    | Puede orquestar servicios y actualizar reglas  |
| `user`        | `pass`     | Usuario        | Solo puede consultar información de servicios  |
