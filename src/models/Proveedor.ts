import { Schema, model, Document, Types } from 'mongoose';

// Interface para tipado en TypeScript
export interface IProveedor extends Document {
  nombre: string;
  contacto?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  productosSuministrados?: Types.ObjectId[]; // Referencias a productos
}

// Esquema de Mongoose
const proveedorSchema = new Schema<IProveedor>({
  nombre: { type: String, required: true },
  contacto: { type: String },
  telefono: { type: String },
  correo: { type: String },
  direccion: { type: String },
  productosSuministrados: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
  timestamps: true,
  collection: 'proveedores' // importante: nombre de la colección en MongoDB
});

export default model<IProveedor>('Proveedor', proveedorSchema);
