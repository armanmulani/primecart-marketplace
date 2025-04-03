import mongoose from 'mongoose';

interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt: Date;
}

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model<IProduct>('Product', productSchema);