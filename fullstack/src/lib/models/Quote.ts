import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  content: string;
  author: string;
  role?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    content: {
      type: String,
      required: [true, 'Quote content is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);