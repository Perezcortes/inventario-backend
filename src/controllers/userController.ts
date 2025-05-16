import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User'; // Ajusta el path según tu estructura

// Crear usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Validar campos obligatorios
    if (!nombre || !correo || !contraseña || !rol) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    // No enviar la contraseña en la respuesta
    const usuarioResponse = usuarioGuardado.toObject() as any;
    delete usuarioResponse.contraseña;

    res.status(201).json(usuarioResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Crear usuarios en lote
export const createUsersBatch = async (req: Request, res: Response) => {
  try {
    const usuarios = req.body; // Esperamos un array de usuarios

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      return res.status(400).json({ message: 'Se espera un arreglo con usuarios' });
    }

    // Validamos cada usuario y hasheamos la contraseña
    const usuariosParaGuardar = [];

    for (const usuario of usuarios) {
      const { nombre, correo, contraseña, rol } = usuario;

      if (!nombre || !correo || !contraseña || !rol) {
        return res.status(400).json({ message: 'Faltan datos en uno de los usuarios' });
      }

      // Verificamos si ya existe el correo (puedes omitir esta verificación para mejorar rendimiento)
      const existe = await User.findOne({ correo });
      if (existe) {
        return res.status(409).json({ message: `El correo ${correo} ya está registrado` });
      }

      const hashedPassword = await bcrypt.hash(contraseña, 10);

      usuariosParaGuardar.push({
        nombre,
        correo,
        contraseña: hashedPassword,
        rol,
      });
    }

    // Guardar todos los usuarios en lote
    const usuariosGuardados = await User.insertMany(usuariosParaGuardar);

    // No devolver contraseñas en la respuesta
    const usuariosSinContraseña = usuariosGuardados.map(user => {
      const obj = user.toObject();
      delete (obj as any).contraseña;
      return obj;
    });

    res.status(201).json(usuariosSinContraseña);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuarios en lote', error });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const usuarios = await User.find().select('-contraseña'); // Excluir contraseña
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actualizaciones = req.body;

    // Si se intenta actualizar la contraseña, hashearla
    if (actualizaciones.contraseña) {
      const saltRounds = 10;
      actualizaciones.contraseña = await bcrypt.hash(actualizaciones.contraseña, saltRounds);
    }

    const usuarioActualizado = await User.findByIdAndUpdate(id, actualizaciones, {
      new: true,
      runValidators: true,
    }).select('-contraseña'); // Excluir contraseña en respuesta

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await User.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado', usuario: usuarioEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};
