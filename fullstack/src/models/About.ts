import mongoose, { Schema } from 'mongoose';

const AboutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Tentang Kami',
    },
    description: {
      type: String,
      required: true,
    },
    features: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    statistics: [
      {
        value: { type: Number, required: true },
        label: { type: String, required: true }, 
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model('About', AboutSchema);