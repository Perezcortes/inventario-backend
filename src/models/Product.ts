import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String, required: true },
  descripcion: { type: String },
  imagen: { type: String },
}, {
  timestamps: true,
  collection: 'productos' // IMPORTANTE: Que coincida con la colección en MongoDB
});

export default model('Product', productSchema);
