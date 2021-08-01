export interface UploadImageResponse {
  url: string
}

export interface TablePost {
  teamId?: string;
  before: string;
  after: string;
  url?: string;
  name?: string;
}

export interface Team {
  name: string;
  privacy: 'open' | string;
  description: string;
  icon: string;
  url: string;
}