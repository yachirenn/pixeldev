import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    buttonText: {
      type: String,
      trim: true,
    },
    buttonLink: {
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

export default mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);