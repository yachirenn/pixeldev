import mongoose, { Schema, Document} from "mongoose";

export interface IProject extends Document {
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  createAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    techStack: {
      type: [String],
      default: []
    },
    githubUrl: String,
    liveUrl: String
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)