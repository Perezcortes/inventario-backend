import { Schema, model, Document } from 'mongoose';

// Interface para tipar el documento User en TypeScript
export interface IUser extends Document {
  nombre: string;
  correo: string;
  contraseña: string;
  rol: 'Administrador' | 'Soporte Técnico' | 'Mantenimiento' | 'Contador' | 'Atención al Cliente';
  creadoEn: Date;
}

// Definición del esquema mongoose para usuarios
const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true }, // correo único para evitar duplicados
  contraseña: { type: String, required: true },
  rol: {
    type: String,
    enum: ['Administrador', 'Soporte Técnico', 'Mantenimiento', 'Contador', 'Atención al Cliente'], // Roles permitidos
    required: true,
  },
  creadoEn: { type: Date, default: Date.now },
}, {
  timestamps: true, // Para crear automáticamente createdAt y updatedAt
  collection: 'usuarios' // Nombre de la colección en MongoDB (minúscula y plural es estándar)
});

// Exportamos el modelo para usarlo en el resto de la app
export default model<IUser>('Usuario', userSchema);
