import mongoose, { Schema } from 'mongoose';

const HeroSchema = new Schema(
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
    ctaText: {
      type: String,
      required: [true, 'CTA text is required'],
      trim: true,
    },
    ctaLink: {
      type: String,
      required: [true, 'CTA link is required'],
      trim: true,
    },
    heroImage: {
      type: String,
      required: [true, 'Hero image is required'],
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

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);