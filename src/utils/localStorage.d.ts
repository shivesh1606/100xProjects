export interface ProjectFile {
  name: string;
  url: string;
  type: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  mediumUrl: string;
  executiveSummary: string;
  liveDemoUrl: string;
  files: ProjectFile[];
  author?: string;
}

export function getProjects(): Project[];
export function saveProjects(projects: Project[]): void;
