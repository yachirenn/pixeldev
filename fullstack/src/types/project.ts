// Type dari database (full, include _id)
export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Type untuk form input (tanpa _id, tanpa createdAt, dll)
export interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  status: string;
}