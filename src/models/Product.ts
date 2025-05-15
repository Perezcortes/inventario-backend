import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  quantity: { type: Number, required: true, default: 0 },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
