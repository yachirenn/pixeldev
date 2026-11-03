import mongoose, { Schema, Document } from 'mongoose';

export interface IFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface IStat {
  label: string;
  value: number;
}

export interface IAbout extends Document {
  title: string;
  description: string;
  imageUrl?: string;
  mission?: string;
  vision?: string;
  features: IFeature[];
  stats: IStat[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    imageUrl: {
      type: String,
    },
    mission: {
      type: String,
    },
    vision: {
      type: String,
    },
    features: [{
      icon: { type: String, required: true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
    }],
    stats: [{
      label: { type: String, required: true },
      value: { type: Number, required: true },
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);