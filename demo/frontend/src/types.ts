export type Profile = {
  id: number;
  fullName: string;
  headline: string;
  about: string;
  email: string;
  linkedInUrl: string;
  gitHubUrl: string;
};

export type ProjectItem = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  projectUrl: string;
  repositoryUrl: string;
};

export type AuthResponse = {
  token: string;
  email: string;
};
