const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Base de datos simulada
let servicios = [];
let reglasDeOrquestacion = [];
let usuarios = [
  { usuario: 'admin', contrasena: '1234', rol: 'Administrador' },
  { usuario: 'orquestador', contrasena: 'abcd', rol: 'Orquestador' },
  { usuario: "user", contrasena: "pass", rol: "Usuario"}
];
let tokens = {}; 

// Middleware de autenticación
function autenticar(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !tokens[token]) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }
  req.usuario = tokens[token];
  next();
}

// Middleware de autorización por rol
function autorizar(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  };
}

// Autenticación de Usuario
app.post('/autenticar-usuario', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  const usuario = usuarios.find(u => u.usuario === nombre_usuario && u.contrasena === contrasena);
  if (usuario) {
    const token = Math.random().toString(36).substring(2);
    tokens[token] = usuario;
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
});

// Registrar Nuevo Servicio
app.post('/registrar-servicio', autenticar, autorizar('Administrador'), (req, res) => {
  const { nombre, descripcion, endpoints } = req.body;
  const nuevoServicio = {
    id: servicios.length + 1,
    nombre,
    descripcion,
    endpoints
  };
  servicios.push(nuevoServicio);
  res.status(201).json(nuevoServicio);
});

// Obtener Información del Servicio
app.get('/informacion-servicio/:id', autenticar, (req, res) => {
  const servicio = servicios.find(s => s.id === parseInt(req.params.id));
  if (servicio) {
    res.json(servicio);
  } else {
    res.status(404).json({ mensaje: 'Servicio no encontrado' });
  }
});

// Orquestar Servicios
app.post('/orquestar', autenticar, autorizar('Orquestador', 'Administrador'), (req, res) => {
  const { servicio_destino, parametros_adicionales } = req.body;
  const servicio = servicios.find(s => s.id === parseInt(servicio_destino));
  if (!servicio) {
    return res.status(404).json({ mensaje: 'Servicio destino no encontrado' });
  }

  // Simulación de orquestación
  const resultado = {
    mensaje: `Servicio ${servicio.nombre} orquestado con éxito`,
    parametros: parametros_adicionales
  };
  res.json(resultado);
});

// Actualizar Reglas de Orquestación
app.put('/actualizar-reglas-orquestacion', autenticar, autorizar('Orquestador'), (req, res) => {
  reglasDeOrquestacion = req.body.reglas;
  res.json({ mensaje: 'Reglas actualizadas', reglas: reglasDeOrquestacion });
});

// Autorización de Acceso
app.post('/autorizar-acceso', autenticar, (req, res) => {
  const { recursos, rol_usuario } = req.body;
  const autorizado = usuarios.some(u => u.rol === rol_usuario);
  res.json({ acceso: autorizado, recursos });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`API simulada ejecutándose en http://localhost:${port}`);
});
